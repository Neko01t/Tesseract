from flask import Blueprint, request, jsonify
from bson import ObjectId
from app.database import users_collection

onboarding_bp = Blueprint("onboarding", __name__)

@onboarding_bp.route("/set", methods=["POST"])
def set_account_type():
    data = request.json

    users_collection.update_one(
        {"_id": ObjectId(data["user_id"])},
        {"$set": {"account_type": data["account_type"]}}
    )

    return jsonify({"message": "Account type updated"}), 200
