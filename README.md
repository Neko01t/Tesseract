# IPDI - Integrated Property Digital Interface 🇮🇳

**A secure, digital platform for property ownership management and transfers.**

![Status](https://img.shields.io/badge/Status-Hackathon_Prototype-orange)
![Stack](https://img.shields.io/badge/Stack-Next.js_&_Flask-blue)

## > About The Project

IPDI is a centralized digital solution designed to modernize land and property record management in India. It addresses issues like property fraud and slow paperwork by linking ownership to digital identities (Aadhaar) and enabling transparent, secure transfer requests.

**Key Features:**

- **User Dashboard:** Real-time view of owned properties and pending requests.
- **Digital Verification:** Aadhaar-linked identity masking and verification.
- **Secure Transfers:** precise tracking of property transfer ownership.

---

## > Project Structure

The repository is organized into three main directories:

```text
├── backend/       # Python Flask API (Authentication & Database logic)
├── frontend/      # Next.js 13+ (App Router) User Interface
└── notes/         # Project documentation, flowcharts, and hackathon resources
```

## > Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Python, Flask, PyMongo (MongoDB).
- **Database**: MongoDB.
- **Auth**: JWT (JSON Web Tokens).

## > Getting Started

Follow these instructions to set up the project locally.

**\*Prerequisites**

- Node.js & npm installed.
- Python 3.8+ installed.
- MongoDB running locally or a MongoDB Atlas URI.

1. **Backend Setup (Python/Flask)**
   Navigate to the backend folder and set up the virtual environment.

```sh
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure Environment**: Create a `.env` file inside the `backend/` folder

```env
MONGO_URI=mongodb://localhost:27017/ipdi_db
JWT_SECRET=LetThePeopleWin
```

**Run the Server**:

```sh
python -m app.main
```

_The **backend** should now be running on `http://127.0.0.1:5000`_

2. **Frontend Setup (Next.js)**
   Open a new terminal and navigate to the frontend folder.

```sh
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

_The **frontend** should now be accessible at `http://localhost:3000`_

3. **Notes**
   It contains the notes realted to the project

```sh
notes
├── legal.md
└── note.md
```

## Disclaimer

This project was created for a Hackathon. It is a prototype and not intended for production use without further security audits.
