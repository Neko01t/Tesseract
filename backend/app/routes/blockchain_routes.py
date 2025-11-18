from flask import Blueprint, request, jsonify
from app.services.blockchain_service import Blockchain

land_bp = Blueprint("land_bp", __name__)
bc = Blockchain()

@land_bp.route("/register-land", methods=["POST"])
def register_land():
    cid = request.json.get("cid")
    try:
        tx_hash = bc.register_land(cid)
        return jsonify({"status": "success", "tx_hash": tx_hash})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@land_bp.route("/transfer-land", methods=["POST"])
def transfer_land():
    land_id = request.json.get("landId")
    new_owner = request.json.get("newOwner")
    try:
        tx_hash = bc.transfer_land(int(land_id), new_owner)
        return jsonify({"status": "success", "tx_hash": tx_hash})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@land_bp.route("/land/<int:land_id>", methods=["GET"])
def get_land(land_id):
    try:
        data = bc.get_land(land_id)
        return jsonify({
            "cid": data[0],
            "owner": data[1],
            "landId": land_id
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400
