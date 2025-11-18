# III. Operational & Legal Requirements (The Critical Indian Fixes)
These are the non-code requirements necessary to make your platform legally viable in India.
- KYC/AML System: A secure method/service integrated into your Python backend to verify the identity (Aadhaar/PAN) of all buyers and sellers before they can engage in transactions.
- Stamp Duty & Fee Logic: Comprehensive logic (likely a lookup table or service) within your Python backend to accurately calculate State-specific Stamp Duty and registration fees based on the property price and location.
- Escrow Service: A secure financial mechanism (e.g., a partnership with a bank or a compliant payment gateway) to hold the sale proceeds (INR) until the legal registration process is complete.
- Deed Verification Proof: A clear mechanism for users to submit the official document hash or registration receipt from the government's Sub-Registrar's office. This proof is the Green Light that authorizes your Python backend to execute the final NFT transfer.
- Legal Counsel: Ongoing access to a lawyer specializing in Indian property and technology law to ensure your digital contracts and compliance steps align with the Registration Act, 1908, and state land codes.
- Property Metadata Storage: A secure, off-chain database (e.g., PostgreSQL) to store large property files (images, survey maps) and sensitive user data, with only the hash of these documents stored on-chain for verification.
