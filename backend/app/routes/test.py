from flask import Blueprint, jsonify

ping_bp = Blueprint('ping', __name__)

@ping_bp.route('/ping', methods=['GET'])
def health_check():
    """
    Returns a simple JSON response to confirm the backend is operational.
    """
    return jsonify({
        "status": "success",
        "message": "Backend is running and responding to JSON requests.",
        "api_version": "v1"
    }), 200 # HTTP 200 OK
