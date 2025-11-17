import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager

app = Flask(__name__)

CORS(app)

bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "MuniketAnde"
jwt = JWTManager(app)

users = {} # sasta database
@app.route("/test")
def test():
    return jsonify(status="ok")

@app.route("/")
def home():
    return jsonify(message="backend is running!")

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify(message="Username and password are required"), 400

    if username in users:
        return jsonify(message="Username already exists"), 409 # 409 Conflict

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users[username] = hashed_password

    print("Registered users:", users) # For debugging

    return jsonify(message="User registered successfully"), 201 # 201 Created

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify(message="Username and password are required"), 400

    if username not in users:
        return jsonify(message="User not found"), 401 # 401 Unauthorized

    hashed_password = users[username]
    if bcrypt.check_password_hash(hashed_password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message="Invalid credentials"), 401

@app.route("/profile")
@jwt_required()
def profile():
    return jsonify(message="Welcome! This is a protected route.")

if __name__ == "__main__":
    app.run(debug=True)
