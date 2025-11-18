def serialize_user(user):
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "aadhaar": user["aadhaar"],
        "account_type": user.get("account_type")
    }
