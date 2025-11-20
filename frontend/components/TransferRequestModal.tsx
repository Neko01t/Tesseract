"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";

export default function TransferRequestModal({
  open,
  onClose,
  property,
  onSuccess,
}: any) {
  const [form, setForm] = useState({
    buyerAadhaar: "",
    buyerMobile: "",
    buyerUserId: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm({
        buyerAadhaar: "",
        buyerMobile: "",
        buyerUserId: "",
        password: "",
        otp: "",
      });
      setOtpSent(false);
      setError(null);
    }
  }, [open]);

  const sendOtp = async () => {
    setError(null);
    if (!form.buyerMobile || !form.buyerAadhaar) {
      setError("Enter buyer Aadhaar and mobile to send OTP.");
      return;
    }
    setSendingOtp(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setOtpSent(true);
    } catch (e) {
      setError("Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const submitRequest = async () => {
    setError(null);

    if (
      !form.buyerAadhaar ||
      !form.buyerMobile ||
      !form.buyerUserId ||
      !form.password
    ) {
      setError("Please fill all required fields.");
      return;
    }
    if (!otpSent) {
      setError("Please send and verify Aadhaar OTP first.");
      return;
    }
    if (!form.otp) {
      setError("Enter the Aadhaar OTP.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));
      if (onSuccess) onSuccess();
    } catch (e: any) {
      setError(e?.message || "Failed to create request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Create Transfer Request
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          Property:{" "}
          <span className="font-medium">
            {property?.title} ({property?.propertyId})
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-xs text-gray-600">Buyer Aadhaar</label>
          <input
            className="input text-gray-400"
            value={form.buyerAadhaar}
            onChange={(e) => setForm({ ...form, buyerAadhaar: e.target.value })}
            placeholder="XXXX-XXXX-XXXX"
          />

          <label className="text-xs text-gray-600">Buyer Mobile</label>
          <input
            className="input text-gray-400"
            value={form.buyerMobile}
            onChange={(e) => setForm({ ...form, buyerMobile: e.target.value })}
            placeholder="+91XXXXXXXXXX"
          />

          <label className="text-xs text-gray-600">
            Buyer User ID (if known)
          </label>
          <input
            className="input text-gray-400"
            value={form.buyerUserId}
            onChange={(e) => setForm({ ...form, buyerUserId: e.target.value })}
            placeholder="username or user id"
          />

          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <label className="text-xs text-gray-600">
                Confirm Your Password
              </label>
              <input
                type="password"
                className="input text-gray-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Account password"
              />
            </div>

            <div className="w-48">
              <label className="text-xs text-gray-600">Aadhaar OTP</label>
              <input
                className="input text-gray-400"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                placeholder="Enter OTP"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={sendOtp}
              disabled={sendingOtp}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-60"
            >
              {otpSent
                ? "Resend OTP"
                : sendingOtp
                ? "Sending..."
                : "Send Aadhaar OTP"}
            </button>

            <div className="text-xs text-gray-500">
              {otpSent
                ? "OTP sent to buyer's registered mobile."
                : "OTP will be sent to buyer for verification."}
            </div>
          </div>

          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-blue-600 
             text-blue-700 font-medium bg-blue-50
             hover:bg-blue-100 hover:text-blue-800
             shadow-sm transition"
            >
              Close
            </button>{" "}
            <button
              onClick={submitRequest}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
