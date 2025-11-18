import customtkinter as ctk
import tkinter as tk
from tkinter import messagebox
import re
from datetime import datetime
from pymongo import MongoClient
import hashlib

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class SimpleBlockchainApp:
    def __init__(self):
        self.root = ctk.CTk()
        self.root.title("BlockChain Property")
        self.root.geometry("600x700")

        # Setup MongoDB (local)
        self.setup_database()
        self.create_ui()

    def setup_database(self):
        """Setup MongoDB connection"""
        try:
            self.client = MongoClient('mongodb://localhost:27017/')
            self.db = self.client['property_app']
            self.users = self.db['users']
            print("Connected to MongoDB")
        except:
            print("MongoDB not found - running in demo mode")
            self.users = None

    def create_ui(self):
        """Create simple UI"""
        # Main frame
        main_frame = ctk.CTkFrame(self.root, corner_radius=15)
        main_frame.pack(pady=20, padx=20, fill="both", expand=True)

        # Title
        title = ctk.CTkLabel(
            main_frame,
            text="Blockchain Property Sign Up",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        title.pack(pady=20)

        # Form fields
        self.create_input_field(main_frame, "Full Name", "name")
        self.create_input_field(main_frame, "Email", "email")
        self.create_input_field(main_frame, "Phone", "phone")
        self.create_input_field(main_frame, "Username", "username")
        self.create_input_field(main_frame, "Password", "password", show="*")
        self.create_input_field(main_frame, "Confirm Password", "confirm_password", show="*")

        # User type
        self.user_type = tk.StringVar(value="buyer")
        type_frame = ctk.CTkFrame(main_frame, fg_color="transparent")
        type_frame.pack(fill="x", pady=10, padx=20)

        ctk.CTkLabel(type_frame, text="I am a:").pack(anchor="w")
        ctk.CTkRadioButton(type_frame, text="Property Buyer", variable=self.user_type, value="buyer").pack(anchor="w", pady=2)
        ctk.CTkRadioButton(type_frame, text="Property Seller", variable=self.user_type, value="seller").pack(anchor="w", pady=2)

        self.terms = tk.BooleanVar()
        ctk.CTkCheckBox(
            main_frame,
            text="I agree to terms and conditions",
            variable=self.terms
        ).pack(pady=10)

        ctk.CTkButton(
            main_frame,
            text="Create Account",
            command=self.register,
            height=40,
            font=ctk.CTkFont(size=14, weight="bold")
        ).pack(pady=20)

        # Status
        self.status = ctk.CTkLabel(main_frame, text="Ready to register...", text_color="gray")
        self.status.pack()

    def create_input_field(self, parent, label, name, show=None):
        """Create input field with label"""
        frame = ctk.CTkFrame(parent, fg_color="transparent")
        frame.pack(fill="x", pady=5, padx=20)

        ctk.CTkLabel(frame, text=label).pack(anchor="w")
        entry = ctk.CTkEntry(frame, placeholder_text=f"Enter your {label}", show=show)
        entry.pack(fill="x", pady=2)

        setattr(self, f"{name}_entry", entry)

    def validate_email(self, email):
        """Check if email is valid"""
        return re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)

    def hash_password(self, password):
        """Simple password hashing"""
        return hashlib.sha256(password.encode()).hexdigest()

    def generate_wallet(self):
        """Generate simple wallet address"""
        import secrets
        return "0x" + secrets.token_hex(20)

    def register(self):
        """Handle registration"""
        try:
            # Get data from form
            data = {
                'name': self.name_entry.get().strip(),
                'email': self.email_entry.get().strip(),
                'phone': self.phone_entry.get().strip(),
                'username': self.username_entry.get().strip(),
                'password': self.password_entry.get(),
                'confirm': self.confirm_password_entry.get(),
                'type': self.user_type.get(),
                'terms': self.terms.get()
            }

            if not all([data['name'], data['email'], data['username'], data['password']]):
                messagebox.showerror("Error", "Please fill all required fields")
                return

            if not self.validate_email(data['email']):
                messagebox.showerror("Error", "Please enter a valid email")
                return

            if data['password'] != data['confirm']:
                messagebox.showerror("Error", "Passwords don't match")
                return

            if len(data['password']) < 6:
                messagebox.showerror("Error", "Password must be 6+ characters")
                return

            if not data['terms']:
                messagebox.showerror("Error", "Please agree to terms")
                return

            if self.users:
                if self.users.find_one({"$or": [{"email": data['email']}, {"username": data['username']}]}):
                    messagebox.showerror("Error", "User already exists")
                    return

            # Generate wallet
            wallet = self.generate_wallet()

            # Save to MongoDB
            user_data = {
                'name': data['name'],
                'email': data['email'],
                'phone': data['phone'],
                'username': data['username'],
                'password_hash': self.hash_password(data['password']),
                'user_type': data['type'],
                'wallet_address': wallet,
                'created_at': datetime.now(),
                'status': 'active'
            }

            if self.users:
                self.users.insert_one(user_data)

            # Success message
            success_msg = f"""
Registration Successful!

Welcome {data['name']}!
Email: {data['email']}
Account Type: {data['type'].title()}
Wallet: {wallet}

You can now login to start trading properties!
            """

            messagebox.showinfo("Success", success_msg)
            self.clear_form()
            self.status.configure(text="Registration successful!", text_color="green")

        except Exception as e:
            messagebox.showerror("Error", f"Registration failed: {str(e)}")
            self.status.configure(text="Registration failed", text_color="red")

    def clear_form(self):
        """Clear all form fields"""
        entries = ['name', 'email', 'phone', 'username', 'password', 'confirm_password']
        for entry in entries:
            getattr(self, f"{entry}_entry").delete(0, tk.END)
        self.terms.set(False)

    def run(self):
        """Start the app"""
        self.root.mainloop()

# Run the app
if __name__ == "__main__":
    app = SimpleBlockchainApp()
    app.run()

"""IF needed we can add the file input system to it and create a id based on the given input"""
