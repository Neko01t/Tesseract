from flask import Blueprint, request, jsonify
from app.database import users_collection
from app.utils.password_utils import hash_password, verify_password
from app.utils.token_utils import generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    user = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "email": data["email"],
        "aadhaar": data["aadhaar"],
        "password": hash_password(data["password"]),
        "account_type": None
    }

    result = users_collection.insert_one(user)
    token = generate_token(result.inserted_id)

    return jsonify({"message": "User registered", "token": token}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_collection.find_one({"email": data["email"]})

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not verify_password(data["password"], user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_token(user["_id"])
    return jsonify({"message": "Login successful", "token": token}), 200
