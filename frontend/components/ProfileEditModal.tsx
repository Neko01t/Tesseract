// components/ProfileEditModal.tsx
"use client";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";

export default function ProfileEditModal({ open, section, user, onClose, onSave }: any) {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (open) {
      setForm({
        name: user.name,
        dob: user.dob,
        address: user.address,
        state: user.state,
        district: user.district,
        taluka: user.taluka,
        occupation: user.occupation,
        email: user.email,
        mobile: user.mobile,
      });
    }
  }, [open, user]);

  if (!open) return null;

  const titleMap: any = {
    profile: "Edit Profile",
    personal: "Edit Personal Information",
    verifications: "Manage Verifications",
    password: "Change Password",
    documents: "Upload Documents"
  };

  async function handleSave() {
    if (onSave) onSave(form);
  }

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{titleMap[section || "profile"]}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">✕</button>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          {section === "password" ? (
            <>
              <label className="block">
                <div className="text-xs text-gray-500">Current Password</div>
                <input type="password" className="input mt-1" value={form.currentPassword || ""} onChange={(e)=>setForm({...form,currentPassword:e.target.value})} />
              </label>
              <label className="block">
                <div className="text-xs text-gray-500">New Password</div>
                <input type="password" className="input mt-1" value={form.newPassword || ""} onChange={(e)=>setForm({...form,newPassword:e.target.value})} />
              </label>
              <label className="block">
                <div className="text-xs text-gray-500">Confirm New Password</div>
                <input type="password" className="input mt-1" value={form.confirmPassword || ""} onChange={(e)=>setForm({...form,confirmPassword:e.target.value})} />
              </label>
            </>
          ) : section === "documents" ? (
            <>
              <div className="text-sm text-gray-600">Upload verified documents (Sale Deed, RTC, etc.)</div>
              <input type="file" className="mt-2" multiple />
              <div className="text-xs text-gray-500 mt-2">Files will be stored on IPFS (or configured storage).</div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs text-gray-500">Full name</div>
                  <input className="input mt-1" value={form.name || ""} onChange={(e)=>setForm({...form,name:e.target.value})} />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-500">Date of birth</div>
                  <input type="date" className="input mt-1" value={form.dob || ""} onChange={(e)=>setForm({...form,dob:e.target.value})} />
                </label>

                <label className="block md:col-span-2">
                  <div className="text-xs text-gray-500">Address</div>
                  <input className="input mt-1" value={form.address || ""} onChange={(e)=>setForm({...form,address:e.target.value})} />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-500">State</div>
                  <input className="input mt-1" value={form.state || ""} onChange={(e)=>setForm({...form,state:e.target.value})} />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-500">District / Taluka</div>
                  <div className="flex gap-2 mt-1">
                    <input className="input flex-1" value={form.district || ""} onChange={(e)=>setForm({...form,district:e.target.value})} placeholder="District" />
                    <input className="input w-36" value={form.taluka || ""} onChange={(e)=>setForm({...form,taluka:e.target.value})} placeholder="Taluka" />
                  </div>
                </label>

                <label className="block">
                  <div className="text-xs text-gray-500">Occupation</div>
                  <input className="input mt-1" value={form.occupation || ""} onChange={(e)=>setForm({...form,occupation:e.target.value})} />
                </label>
              </div>
            </>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onClose} className="px-3 py-2 rounded-md border">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
