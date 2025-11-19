# app/utils/file_utils.py
import json
import os

# Define the path for the backup JSON file
BACKUP_FILE = "users_backup.json"

def load_data_from_json():
    """Loads all users from the JSON file."""
    if not os.path.exists(BACKUP_FILE):
        return []

    try:
        with open(BACKUP_FILE, "r") as file:
            data = json.load(file)
            if isinstance(data, list):
                return data
            return []
    except (json.JSONDecodeError, IOError):
        return []

def save_user_temporarily(new_user):
    """
    Saves a user to the JSON file.
    Returns True if successful, False if email exists.
    """
    users = load_data_from_json()

    # Check if email already exists in the JSON file
    for user in users:
        if user["email"] == new_user["email"]:
            return False

    users.append(new_user)

    try:
        with open(BACKUP_FILE, "w") as file:
            json.dump(users, file, indent=4)
        return True
    except IOError:
        return False
