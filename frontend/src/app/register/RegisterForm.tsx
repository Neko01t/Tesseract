"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-10 rounded-2xl w-full max-w-md border border-gray-200">

      <div className="flex flex-col items-center mb-3">
        <img src="/logo.png" alt="IPDI" className="h-12 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-sm">Register to continue</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Aadhaar Number"
        name="aadhaar"
        placeholder="XXXX-XXXX-XXXX"
        value={form.aadhaar}
        onChange={handleChange}
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

      <Button
        text="Create Account"
        onClick={() => router.push("/onboarding")}
      />

      <div className="text-center text-sm mt-6 text-gray-600">
        Already have an account?{" "}
        <Link className="text-blue-600" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
