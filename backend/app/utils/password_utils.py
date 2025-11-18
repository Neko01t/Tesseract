import bcrypt

def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

def verify_password(password, hashed_str):
    hashed_bytes = hashed_str if isinstance(hashed_str, bytes) else hashed_str.encode("utf-8")
    return bcrypt.checkpw(password.encode("utf-8"), hashed_bytes)

