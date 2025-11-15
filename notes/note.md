# Theory

## Frontend (Next.js 14+)

Use Next.js for:

- UI/UX
- Wallet connection
- Smart contract interaction (read-only + write transactions)
- Property listing pages
- User dashboards
- SEO-friendly pages

### Key frontend tools

- Next.js App Router
- Typescript
- Wagmi + Viem → best for interacting with blockchain
- RainbowKit / Web3Modal → wallet connect UI
- TailwindCSS or ShadCN for UI
- React Query or Zustand (optional state mgmt)

---

## Backend (Python)

You’ll use Python for:

- Business logic
- Database operations
- KYC / identity verification
- Property validation workflows
- Backend APIs
- Oracles / off-chain services
- Managing off-chain data (images, documents)

### Recommended Python frameworks

- FastAPI (BEST choice: very fast, async, easy to integrate with Next.js)
- Or Django REST Framework (if you want more structure)

### Storage

- PostgreSQL (best for relational data)
- Redis (optional for caching)
- S3 / Cloudflare R2 (for images)
- IPFS (for proof-of-documents related to land)

---

## Blockchain Layer

Smart contracts will handle:

- Property ownership
- Buying/selling
- Escrow flow
- Tokenized land (ERC-721 or custom)

### Smart contract stack

- Solidity
- Foundry or Hardhat
- ERC-721 for ownership token
- Chainlink Oracles (if required)

# Flow

1. **User Clicks "Buy" (in Next.js)**

- The user is on your website, looking at a property (NFT) they want to buy for 1 ETH. They click the "Buy" button.

2. **Next.js Prepares the Transaction (Using Ethers.js)**

- Your website's JavaScript (Ethers.js) code runs.
- It first needs to connect to the user's wallet to get their "signer." A **signer** is an object from Ethers.js that can approve (sign) transactions.
- It creates a "contract" object, which is just a JavaScript version of your Solidity contract (using its **address** and **ABI**).
- It prepares to call your `purchaseProperty(tokenId)` function.
- Crucially, it adds the **price** of the property (1 ETH) to the transaction as the `value.`

3. **MetaMask Pops Up**

- Ethers.js automatically triggers the user's MetaMask wallet to open.
- MetaMask shows the user a summary: "Are you sure you want to run the `purchaseProperty` function and send **1 ETH** + a gas fee?"

4. **User Confirms (in MetaMask)**

- The user clicks "Confirm".
- By clicking "Confirm," the user is using their **private key** (stored securely in MetaMask) to sign the transaction. This is their digital signature.
- The signed transaction is sent to the blockchain network (e.g., Ethereum).

5. **Blockchain Runs the Smart Contract**

- A "miner" or "validator" on the network picks up the transaction.
- It runs your `purchaseProperty(tokenId)` function inside the **Solidity smart contract**.
- The `msg.sender` (the person who signed) is the **buyer's wallet address**.
- The `msg.value` (the money sent) is **1 ETH**.

6. **Smart Contract Executes Logic**

- Your contract code now runs its checks:

1.  `require(isVerifiedUser[msg.sender] == true, "User not verified")`

- **Check**: Is this buyer on the verified list? (The list your Flask server added them to earlier).
- **Result**: Yes. It continues.

2.  `require(msg.value == price, "Incorrect price")`

- **Check**: Did the buyer send the correct amount of money?
- **Result**: Yes. It continues.
- Now that all checks have passed, the contract performs the transfer:

1. It sends the **1 ETH** (msg.value) to the **seller's** wallet address.
2. It transfers the **property NFT** to the **buyer's** wallet address (msg.sender).
3. **Transaction is Complete**

- The transaction is finished and permanently recorded on the blockchain.
- Your Next.js app gets a "success" message back, and you can show the user "Congratulations, you now own this property!"
