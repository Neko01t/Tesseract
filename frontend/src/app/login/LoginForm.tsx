"use client";

import { useState } from "react";
//import Input from "@/components/Input";
//import Button from "@/components/Button";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react"
// aniket do the components
const Input = ({ label, name, type = "text", value, onChange, placeholder, pattern, maxLength, className = "" }) => (
  <div className={`space-y-1 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      pattern={pattern}
      maxLength={maxLength}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out text-black"
      required
    />
  </div>
);

const Button = ({ text, onClick, type, disabled, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white transition duration-200 ease-in-out ${className}
      ${disabled
        ? 'bg-indigo-300 cursor-not-allowed'
        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-800'
      }`}
  >
    {text}
  </button>
);
// --- this one --

export default function LoginForm() {
  const router = useRouter();
  const [useAadhaar, setUseAadhaar] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    const payload = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);

          localStorage.setItem("authToken", data.token);
          router.push("/");

      } else {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              setError(data.error || `Login failed (Status: ${response.status}).`);
          } else {
              setError(`Server Error (Status: ${response.status}). Ensure the Flask server is running and the route is correct.`);
              console.error(`Received non-JSON response with status ${response.status}`);
          }
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      setError("Critical Error: Cannot connect to the server or received invalid response. Check server status.");
    } finally {
      setIsLoading(false);
    }
  };

 return (
    <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-10 rounded-2xl w-full max-w-md border border-gray-200">

      <div className="flex flex-col items-center mb-3">
      <LogIn/>
        <p className="text-xl font-semibold text-black">Welcome!</p>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          India Property Digital Infrastructure
        </h2>
      </div>

      <div className="flex justify-center gap-8 mt-4 mb-6 text-sm font-medium text-gray-600">
        <button
          className={`pb-1 ${!useAadhaar
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
            }`}
          onClick={() => setUseAadhaar(false)}
        >
          Email Login
        </button>

        <button
          className={`pb-1 ${useAadhaar
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
            }`}
          onClick={() => setUseAadhaar(true)}
        >
          Aadhaar Login
        </button>
      </div>

      {!useAadhaar && (
        <form onSubmit={handleSubmit} className="space-y-4">
        <Input
            label="Email"
            name="email"
            placeholder="email.."
            value={form.email}
            onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          placeholder="pass.."
          type="password"
          value={form.password}
          onChange={handleChange}
        />
          <div className="flex justify-between items-center text-xs mt-2 mb-3">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" /> Remember Me
            </label>
            <a className="text-blue-600 cursor-pointer">Forgot Password?</a>
          </div>

          {error && (
                        <p className="text-red-600 text-sm p-3 bg-red-100 rounded-lg border border-red-300">
                            {error}
                        </p>
                    )}
        <Button text={isLoading ? "Logging In..." : "Log In"}
                type="submit"
                disabled={isLoading}
        />
        </form>
      )}

      {useAadhaar && (
        <>
          <Input label="Aadhaar Number" placeholder="XXXX-XXXX-XXXX" />
          <Button text="Send OTP" className="mt-3" />

          <Input label="Enter OTP" placeholder="123456" className="mt-4" />
          <Button text="Verify OTP" className="mt-3" />
        </>
      )}

      <div className="flex items-center my-6">
        <span className="flex-1 h-px bg-gray-300"></span>
        <span className="mx-3 text-gray-500 text-sm">Or continue with</span>
        <span className="flex-1 h-px bg-gray-300"></span>
      </div>

      <SocialLogin />

      <div className="text-center text-sm mt-6 text-gray-600">
        New member? <Link href="/register" className="text-blue-600 cursor-pointer">
          Register Now
        </Link>

      </div>
    </div>
  );
}
