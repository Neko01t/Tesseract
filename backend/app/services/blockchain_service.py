from web3 import Web3
import json
from app.config import Config

class Blockchain:

    def __init__(self):
        self.web3 = Web3(Web3.HTTPProvider(Config.RPC_URL))
        self.account = self.web3.eth.account.from_key(Config.PRIVATE_KEY)

        with open("artifacts/abi.json") as f:
            abi = json.load(f)

        self.contract = self.web3.eth.contract(
            address=Config.CONTRACT_ADDRESS,
            abi=abi
        )

    def register_land(self, cid: str):
        nonce = self.web3.eth.get_transaction_count(self.account.address)

        tx = self.contract.functions.registerLand(cid).build_transaction({
            "from": self.account.address,
            "nonce": nonce,
            "gas": 300000,
            "gasPrice": self.web3.eth.gas_price
        })

        signed = self.account.sign_transaction(tx)
        tx_hash = self.web3.eth.send_raw_transaction(signed.rawTransaction)
        return tx_hash.hex()

    def transfer_land(self, land_id: int, new_owner: str):
        nonce = self.web3.eth.get_transaction_count(self.account.address)

        tx = self.contract.functions.transferLand(land_id, new_owner).build_transaction({
            "from": self.account.address,
            "nonce": nonce,
            "gas": 300000,
            "gasPrice": self.web3.eth.gas_price
        })

        signed = self.account.sign_transaction(tx)
        tx_hash = self.web3.eth.send_raw_transaction(signed.rawTransaction)
        return tx_hash.hex()

    def get_land(self, land_id: int):
        return self.contract.functions.lands(land_id).call()
