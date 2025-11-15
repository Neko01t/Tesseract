from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from Next.js

@app.route("/")
def home():
    return {"message": "Backend is running!"}

@app.route("/test")
def test():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(debug=True)

