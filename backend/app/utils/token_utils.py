import datetime
from functools import wraps
from flask import request, jsonify, app
import jwt
from bson.objectid import ObjectId
from app.database import users_collection  # Importing the collection directly from your database.py
from app.config import JWT_SECRET

def generate_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Token format is invalid!'}), 401

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            if users_collection is None:
                return jsonify({'message': 'Backend Database is currently offline'}), 503
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = users_collection.find_one({'_id': ObjectId(data['user_id'])})

            if not current_user:
                return jsonify({'message': 'User not found!'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        except Exception as e:
            return jsonify({'message': f'Authentication error: {str(e)}'}), 500

        return f(current_user, *args, **kwargs)

    return decorated
