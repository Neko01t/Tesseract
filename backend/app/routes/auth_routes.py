from flask import Blueprint, request, jsonify
from app.database import users_collection
from app.utils.password_utils import hash_password, verify_password
from app.utils.token_utils import generate_token
from app.utils.file_utils import save_user_temporarily, load_data_from_json

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    hashed_password_bytes = hash_password(data["password"])
    hashed_password_str = hashed_password_bytes.decode('utf-8')
    user = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "email": data["email"],
        "aadhaar": data["aadhaar"],
        "password": hashed_password_str,
        "account_type": None
    }

    success = save_user_temporarily(user)

    if not success:
        # save_user_temporarily returns False if email already exists
        return jsonify({"error": "Email already registered"}), 409

    # 3. If successful, generate a mock ID for the token (since we don't have a Mongo ID)
    # In a JSON file, generating a token requires a unique ID. Using the email as a placeholder ID.
    token = generate_token(user["email"])

    return jsonify({"message": "User registered (saved to JSON file)", "token": token}), 201

@auth_bp.route("/login", methods=["post"])
def login():
    data = request.json
    all_users = load_data_from_json()

    user = next((u for u in all_users if u["email"] == data["email"]), None)

    if not user:
        return jsonify({"error": "invalid email or password"}), 401

    if not verify_password(data["password"], user["password"]):
        return jsonify({"error": "invalid email or password"}), 401

    token = generate_token(user["email"])
    return jsonify({"message": "login successful", "token": token}), 200
