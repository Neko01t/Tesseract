// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import standard contracts from OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PropertyToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    // Counter for unique Token IDs. Starts at 1.
    Counters.Counter private _tokenIdCounter;

    // Mapping to store the legal document hash and property details hash
    // (This is critical for linking the token to the real-world deed)
    mapping(uint256 => string) public legalDeedHash;

    // The address of the platform's primary wallet (your Python backend's wallet)
    // The Python backend is the only entity allowed to mint or transfer ownership
    address public platformAdmin;

    constructor(address _platformAdmin) ERC721("IndiaLandToken", "ILT") {
        // Set the deployer as the initial owner of the contract
        // Set the Python backend's wallet as the Admin for transfers
        platformAdmin = _platformAdmin;
    }

    // Only the designated platform admin can mint new property tokens
    modifier onlyPlatformAdmin() {
        require(msg.sender == platformAdmin, "Only platform admin can perform this action");
        _;
    }

    // Function to create a new property token (Minting)
    function mintNewProperty(address receiver, string memory _tokenURI, string memory _legalDeedHash)
        public onlyPlatformAdmin returns (uint256)
    {
        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();

        // 1. Mint the token and assign it to the receiver
        _safeMint(receiver, newItemId);

        // 2. Set the URI pointing to the off-chain metadata (IPFS/Server)
        _setTokenURI(newItemId, _tokenURI);

        // 3. Store the critical, immutable legal hash on the blockchain
        legalDeedHash[newItemId] = _legalDeedHash;

        return newItemId;
    }

    // Function to allow the platform admin to transfer ownership
    // This is called by the Python backend AFTER legal/fee checks are complete.
    function transferTitle(address from, address to, uint256 tokenId)
        public onlyPlatformAdmin
    {
        // This leverages the standard ERC721 transfer logic.
        // The check that 'from' is the current owner is done internally by ERC721.
        safeTransferFrom(from, to, tokenId);
    }
}
