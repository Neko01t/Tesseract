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
