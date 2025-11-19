from flask import Blueprint, request, jsonify
# Import the collection and the flag to check if we are online
from app.database import users_collection, mongo_connected
from app.utils.password_utils import hash_password, verify_password
from app.utils.token_utils import generate_token
# Import the fallback functions
from app.utils.file_utils import save_user_temporarily, load_data_from_json

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    hashed_password_bytes = hash_password(data["password"])
    hashed_password_str = hashed_password_bytes.decode('utf-8')

    new_user = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "email": data["email"],
        "aadhaar": data.get("aadhaar"),
        "password": hashed_password_str,
        "account_type": None,
        "storage_source": "mongodb" # helpful to track where data lives
    }

    if mongo_connected and users_collection is not None:
        try:
            if users_collection.find_one({"email": data["email"]}):
                return jsonify({"error": "Email already registered (found in DB)"}), 409

            result = users_collection.insert_one(new_user)
            user_id = str(result.inserted_id)
            token = generate_token(user_id)

            return jsonify({
                "message": "User registered successfully in MongoDB",
                "token": token,
                "source": "database"
            }), 201
        except Exception as e:
            print(f"Mongo Error during write: {e}. Falling back to JSON.")
    new_user["storage_source"] = "json_backup"
    success = save_user_temporarily(new_user)
    if not success:
        return jsonify({"error": "Email already registered (found in Backup)"}), 409
    token = generate_token(new_user["email"])
    return jsonify({
        "message": "Database offline. User saved to local backup file.",
        "token": token,
        "source": "json_file"
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user_found = None
    source = ""

    if mongo_connected and users_collection is not None:
        try:
            user_found = users_collection.find_one({"email": email})
            if user_found:
                source = "database"
        except Exception as e:
            print(f"Mongo read error: {e}")

    if not user_found:
        all_json_users = load_data_from_json()
        user_found = next((u for u in all_json_users if u["email"] == email), None)
        if user_found:
            source = "json_file"
    if not user_found:
        return jsonify({"error": "Invalid email or password"}), 401

    if not verify_password(password, user_found["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    if source == "database":
        user_id = str(user_found["_id"])
    else:
        user_id = user_found["email"]

    token = generate_token(user_id)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "source": source
    }), 200
