"use client"
import React, { useState, useEffect, useCallback } from 'react';

// --- Shared Utility: Button Component ---
const Button = ({ text, onClick, primary=true }) => (
  <button
    onClick={onClick}
    className={`w-full max-w-xs py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white transition duration-200 ease-in-out
      ${primary
          ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          : 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
      }`}
  >
    {text}
  </button>
);

// --- 1. Logout Component ---
// This component manages the state clearing function.
const LogoutButton = ({ onLogout }) => {
    return (
            <Button
                text="Log Out"
                onClick={onLogout}
                primary={false}
            />
    );
};

// --- 2. Auth Checker Component (Check and Save Logic) ---
// This component reads the login status from localStorage and maintains the state.
const AuthChecker = () => {
    // State to hold the authentication token (null means logged out)
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle the logout process (Clears the saved state)
    const handleLogout = useCallback(() => {
        // 1. Clear the token from browser storage
        localStorage.removeItem("authToken");
        // 2. Clear the token from the component state
        setAuthToken(null);
        console.log("Logout successful. Token removed from storage.");
    }, []);

    // Authentication Check on Mount (The core check and save logic)
    useEffect(() => {
        // 1. Check browser storage for the token
        const token = localStorage.getItem("authToken");

        if (token) {
            // 2. Token found: "Save" the token to the component's state
            setAuthToken(token);
        }
        setIsLoading(false);
    }, []);

    // --- Render Logic ---

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <p className="text-indigo-600 font-semibold">Checking authentication state...</p>
            </div>
        );
    }

    if (authToken) {
        // User is logged in
        return (
            <div className="">
                           <LogoutButton onLogout={handleLogout} />
            </div>
        );
    }

    // User is logged out
    return (
        <div>

            <h3 className="text-2xl font-bold text-red-700">Login State: LOGGED OUT</h3>
        </div>
    );
};

// Export the main component for demonstration
export default AuthChecker;
