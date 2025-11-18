# app/utils/file_utils.py

import json
import os
from typing import List, Dict, Any

TEMP_REGISTRATION_FILE = os.path.join(os.path.dirname(__file__), '..', '..', 'temp_registrations.json')

def load_data_from_json(filepath: str = TEMP_REGISTRATION_FILE) -> List[Dict[str, Any]]:
    """Reads JSON data from a file. If the file doesn't exist, returns an empty list."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print(f"Warning: JSON file at {filepath} is empty or corrupted. Returning empty list.")
        return []

def save_data_to_json(data: List[Dict[str, Any]], filepath: str = TEMP_REGISTRATION_FILE):
    """Writes a Python list/dict to a JSON file."""
    try:
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=4)
    except IOError as e:
        print(f"Error saving data to {filepath}: {e}")

def save_user_temporarily(user_data: Dict[str, Any]):
    """Loads existing registrations, appends the new user, and saves it back."""
    all_users = load_data_from_json()

    if any(user.get("email") == user_data["email"] for user in all_users):
        return False # Indicate registration failure due to duplicate email

    all_users.append(user_data)

    save_data_to_json(all_users)
    return True # Indicate successful save
