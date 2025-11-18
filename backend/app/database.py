import os
from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv(MONGO_URI))
db = client[DB_NAME]

users_collection = db["users"]
try:
    # Initialize the client. The URI includes authentication and connection details.
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

    # The database object (accesses the specific database in the cluster)
    db = client[DB_NAME]

    # Ping the server to check connection immediately (can raise ServerSelectionTimeoutError)
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")

    # Expose the specific collection used in the auth_routes
    users_collection = db["users"]

except ConnectionError as e:
    # This catches errors where the URI is wrong or the server is truly unavailable
    print(f"FATAL ERROR: Could not connect to MongoDB at {MONGO_URI}. Details: {e}")
    # In a real app, you might stop the application here or use a fallback.
    users_collection = None
except Exception as e:
    print(f"An unexpected error occurred during MongoDB setup: {e}")
    users_collection = None
