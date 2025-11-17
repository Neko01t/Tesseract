"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [useAadhaar, setUseAadhaar] = useState(false);

  return (
    <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-10 rounded-2xl w-full max-w-md border border-gray-200">

      <div className="flex flex-col items-center mb-3">
        <img src="/logo.png" className="h-12 mb-2" alt="IPDI" />
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
        <>
          <Input label="Email" placeholder="you@example.com" />

          <Input label="Password" type="password" />

          <div className="flex justify-between items-center text-xs mt-2 mb-3">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" /> Remember Me
            </label>
            <a className="text-blue-600 cursor-pointer">Forgot Password?</a>
          </div>

          <Button
            text="Log In"
            onClick={() => router.push("/")}
          />
        </>
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
