🟩 1. Blockchain Use in IDPI — HIGH LEVEL

In the IDPI system, blockchain is used to maintain a tamper-proof, transparent, append-only history of:
1:Property block creation
2:Ownership registration
3:Document verification
4:Transfers between users
5:Any updates to property metadata
6:Only the hashes and essential transaction data are stored on blockchain, not the entire documents.

🧱 2. What Blockchain Stores

✔ Hash of property block (SHA-256)
✔ Owner User-ID (hashed / anonymized)
✔ Timestamp
✔ Previous block reference (to maintain chain)
✔ Event type (create / transfer / update)
✔ Registrar/authority digital signature

These remain off-chain for speed and cost reasons.

🟦 3. When Blockchain Is Used (Flow)

✔ Step 1: User submits details + documents
The system collects:
Location
Survey info
Document set
Owner details
Other metadata
➡ No blockchain yet.

✔ Step 2: System verifies documents
Original deed
Tax receipts
Identity/KYC
Land boundaries
Mutation status
Once verified → system constructs a Property Block.
➡ No blockchain yet.

✔ Step 3: Property Block Creation
A digital block is created with:
{
  Property-ID,
  User-ID,
  GeoHash,
  Document Hashes,
  Metadata,
  Timestamp
}
🔐 Hash of this object is generated → recorded on blockchain
➡ Blockchain involvement starts here

✔ Step 4: Property Block is Linked to User
The system records the ownership on-chain:
Transaction:
  event: "CREATE_PROPERTY"
  propertyID: xxxxxx
  ownerID_hash: yyyyyy
  blockHash: sha256( property block )
  prevHash: hash of previous blockchain entry
  timestamp: t
This becomes an immutable ledger entry.

✔ Step 5: Future Ownership Change (Transfer)
When user A → user B:
Buyer requests transfer
Seller approves
Digital agreement generated
Both sign
System creates a NEW block:
{
  Property-ID,
  previousOwner: hashedUserA,
  newOwner: hashedUserB,
  transactionType: "TRANSFER",
  documentHash: sha256(agreement),
  timestamp
}
Hash is placed on blockchain
Block links to previous by using prevHash
➡ This forms the ownership chain

✔ Step 6: Entire Property History = On-chain Ledger
Every event generates a new blockchain entry:
Creation
Verification
Transfer
Mortgage
Release
Mutation
Correction (admin approved)
This chain becomes:
Block 1 → Block 2 → Block 3 → Block 4 → ...
Representing the entire property history.

🟨 4. Benefits for the IDPI System
✔ Tamper-Proof Ownership
Ownership history cannot be changed once written.
✔ Fraud Prevention
Fake deeds fail hash verification.
✔ Fully Transparent History
Anyone can trace full ownership timeline.
✔ Distributed Trust
Multiple government bodies run validating nodes:
State registrars
Local municipalities
Revenue departments
Central authority
✔ Automated Processes
Smart contracts handle:
Property transfer
Mortgage lock
Encumbrance update
Release events

📘 5. Final Summary 

Blockchain is used to record immutable ownership events in IDPI.
Every property block, document hash, transfer event, and ownership change generates a new blockchain entry.
This creates a secure, tamper-proof, transparent ledger of property history linked to verified user identities.

Frameworks like Hyperledger Fabric or Proof-of-Authority Ethereum are suitable for permissioned government networks.
In the MVP, hash anchoring provides a lightweight alternative while still ensuring tamper detection.
