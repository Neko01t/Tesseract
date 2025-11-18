# app/main.py

from flask import Flask
from flask_cors import CORS

from app.routes.auth_routes import auth_bp
from app.routes.onboarding_routes import onboarding_bp
from app.routes.test import ping_bp
#from app.routes.blockchain_routes import land_bp

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return {"message": "Backend is running!"}

#app.register_blueprint(land_bp, url_prefix="/land")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(onboarding_bp, url_prefix="/onboarding")
app.register_blueprint(ping_bp)
if __name__ == "__main__":
    app.run(port=5000, debug=True)
