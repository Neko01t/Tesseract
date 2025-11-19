import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from app.config import MONGO_URI, DB_NAME
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "test_db")

# Global variable to hold the collection
users_collection = None
mongo_connected = False

def init_db():
    """
    Attempts to connect to MongoDB.
    Returns user_collection if successful, None if failed.
    """
    global users_collection
    global mongo_connected

    try:
        print(f"Attempting to connect to MongoDB at: {MONGO_URI}...")
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)

        client.admin.command('ping')

        db = client[DB_NAME]
        users_collection = db["users"]
        mongo_connected = True
        print(f" SUCCESS: Connected to MongoDB Database: {DB_NAME}")
        return users_collection

    except (ConnectionFailure, ServerSelectionTimeoutError) as e:
        print(f" WARNING: MongoDB Connection Failed. Switching to JSON fallback mode.")
        print(f"Error details: {e}")
        users_collection = None
        mongo_connected = False
        return None

# Initialize immediately when this file is imported
init_db()
