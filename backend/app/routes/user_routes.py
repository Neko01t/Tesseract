from flask import Blueprint, jsonify
from app.utils.token_utils import token_required
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/profile', methods=['GET'])
@token_required
def get_user_profile(current_user):
    user_profile = {
        "id": str(current_user['_id']),
        "first_name": current_user.get('first_name', ''),
        "last_name": current_user.get('last_name', ''),
        "email": current_user.get('email', ''),
        "aadhaar": current_user.get('aadhaar', ''),
        "account_type": current_user.get('account_type', 'user'),
        "properties": current_user.get('properties', [])
    }

    return jsonify(user_profile), 200
