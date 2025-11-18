"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react"

export default function RegisterForm() {
  const router = useRouter();
  //const router = {
  //    push: (path) => {
  //        // In a real browser environment, this would change the URL.
  //        console.log(`Simulating navigation to: ${path}`);
  //    }
  //};
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);

    // 1. Client-side Validation
    const { firstName, lastName, email, aadhaar, password, confirmPassword } = form;

    if (!firstName || !lastName || !email || !aadhaar || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Aadhaar number validation (simple check for 12 digits/dashes)
    const normalizedAadhaar = aadhaar.replace(/[-\s]/g, '');
    if (!/^\d{12}$/.test(normalizedAadhaar)) {
        setError("Please enter a valid 12-digit Aadhaar number.");
        return;
    }

    setIsLoading(true);

    // Prepare data for the Flask backend (note the key naming convention match)
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      aadhaar: normalizedAadhaar,
      password: password,
    };

    // 2. API Call to Flask Backend (Actual Implementation)
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
          // Registration successful (201 status)
          console.log("Registration successful:", data);

          // 3. Handle Success: Store token and simulate redirect
          localStorage.setItem("authToken", data.token);

          setIsSuccess(true);
          router.push("/onboarding");
      } else {
          // Handle API errors (e.g., 409 Conflict, 400 Bad Request)
          setError(data.error || "Registration failed. Please check the provided information.");
      }

    } catch (error) {
      console.error("Network or fetch error:", error);
      setError("A network error occurred. Check your connection or server status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-2xl p-8 sm:p-10 rounded-xl w-full max-w-lg border border-gray-200">
          <div className="flex flex-col items-center mb-8">
            {/* Using a Lucide-like icon for better aesthetics */}
            <svg
              className="w-10 h-10 text-indigo-600 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-500 text-sm">Join the platform in a few simple steps</p>
          </div>

          {isSuccess ? (
              <div className="text-center p-6 bg-green-50 border-2 border-green-300 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-700">Registration Successful!</h3>
                  <p className="text-green-600 mt-2">You are now registered. Redirecting to onboarding...</p>
                  <p className="mt-4 text-sm text-gray-500">
                      (A simulated redirect to the `/onboarding` page was triggered.)
                  </p>
                  <a href="#" onClick={(e) => { e.preventDefault(); router.push("/login"); }} className="text-indigo-600 font-medium mt-4 block hover:underline">
                      Go to Login
                  </a>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar Number"
                name="aadhaar"
                placeholder="1234-5678-9012"
                value={form.aadhaar}
                onChange={handleChange}
                // Relaxed pattern to allow for user typing/dashes
                pattern="[\d-\s]{12,16}"
                maxLength={16}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              {/* Error message display */}
              {error && (
                <p className="text-red-600 text-sm p-3 bg-red-100 rounded-lg border border-red-300">
                  {error}
                </p>
              )}

              <Button
                text={isLoading ? "Creating Account..." : "Create Account"}
                type="submit"
                disabled={isLoading}
              />
            </form>
          )}

          <div className="text-center text-sm mt-8 text-gray-600">
            Already have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); router.push("/login"); }} className="text-indigo-600 font-medium hover:text-indigo-700 transition">
              Login
            </a>
          </div>
        </div>
    </div>
  );
}
