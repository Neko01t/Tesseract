"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ProfileEditModal from "@/components/ProfileEditModal";
import ConfirmActionModal from "@/components/ConfirmActionModal";

import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Edit2
} from "lucide-react";

function maskAadhaar(aadhaar = "") {
  const onlyDigits = aadhaar.replace(/\D/g, "");
  if (onlyDigits.length === 12) {
    return `${onlyDigits.slice(0,4).replace(/\d/g,'X')}-${onlyDigits.slice(4,8).replace(/\d/g,'X')}-${onlyDigits.slice(8)}`;
  }
  return aadhaar.length > 6 ? aadhaar.slice(0,2) + "****" + aadhaar.slice(-2) : aadhaar;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState<null | { section: string }>(null);
  const [confirmOpen, setConfirmOpen] = useState<null | { action: string, payload?: any }>(null);

  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token || token === "undefined" || token === "null") {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const dbData = await res.json();
        const formattedUser = {
          pid: `PID:IND-${dbData.aadhaar ? dbData.aadhaar.slice(-4) : '0000'}`,
          name: `${dbData.first_name} ${dbData.last_name}`,
          aadhaar: dbData.aadhaar || "",
          email: dbData.email,
          mobile: dbData.mobile || "Not Registered",
          address: dbData.address || "Address not updated",
          dob: dbData.dob || "Not set",
          state: "Maharashtra",
          occupation: "Citizen",
          verifications: {
            aadhaar: true,
            mobile: !!dbData.mobile,
            email: true
          },
          stats: {
            totalProperties: dbData.properties?.length || 0,
            pendingTransfers: dbData.pending_transfers || 0
          },
          documents: dbData.documents || [],
          activity: dbData.recentActivity || []
        };

        setUser(formattedUser);
        setUser(formattedUser);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eef2ff]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-500 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7ff]">
      <Header title="Profile" subtitle="IPDI — Your digital identity" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto">
          {/* Top identity card */}
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0) ?? "U"}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-lg font-semibold text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-600 mt-1">PID: <span className="font-mono text-sm">{user.pid}</span></div>
                <div className="text-sm text-gray-600 mt-2">Aadhaar: <span className="font-mono">{maskAadhaar(user.aadhaar)}</span> {user.verifications?.aadhaar ? <span className="ml-2 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">Verified</span> : null}</div>
                <div className="text-sm text-gray-600">Mobile: {user.mobile} {user.verifications?.mobile && <span className="ml-2 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">Verified</span>}</div>
                <div className="text-sm text-gray-600">Email: {user.email} {user.verifications?.email && <span className="ml-2 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">Verified</span>}</div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500">Account created</div>
                  <div className="text-sm text-gray-700">{user.createdAt}</div>
                </div>

                <div className="mt-2 md:mt-0 flex gap-2">
                  <button onClick={() => setEditOpen({section: "profile"})} className="px-4 py-2 bg-blue-600 text-white rounded-md">Edit Profile</button>
                  <button onClick={() => setConfirmOpen({action: "reset-pin"})} className="px-4 py-2 border rounded-md text-black">Reset IPDI PIN</button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            <div className="lg:col-span-2 space-y-4">
              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  <button onClick={() => setEditOpen({section: "personal"})} className="text-sm text-blue-600">Edit</button>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <div className="text-xs text-gray-500">Full name</div>
                    <div className="mt-1">{user.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Date of birth</div>
                    <div className="mt-1">{user.dob}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="mt-1">{user.address}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">Occupation</div>
                    <div className="mt-1">{user.occupation}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">State / District / Taluka</div>
                    <div className="mt-1">{user.state} / {user.district} / {user.taluka}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Digital Verifications</h3>
                  <button onClick={() => setEditOpen({section: "verifications"})} className="text-sm text-blue-600">Manage</button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-gray-500">Aadhaar eKYC</div>
                    <div className="mt-1 font-medium text-gray-400">{user.verifications.aadhaar ? "Verified" : "Not verified"}</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-gray-500">Mobile</div>
                    <div className="mt-1 font-medium text-gray-400">{user.verifications.mobile ? "Verified" : "Not verified"}</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="mt-1 font-medium text-gray-400">{user.verifications.email ? "Verified" : "Not verified"}</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-xs text-gray-500">Digital Signature</div>
                    <div className="mt-1 font-medium text-gray-400">{user.verifications.digitalSignature ? "Configured" : "Not configured"}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Linked Documents</h3>
                  <button onClick={() => setEditOpen({section: "documents"})} className="text-sm text-blue-600">Upload</button>
                </div>

                <div className="mt-4 space-y-3">
                  {user.documents.map((d: any) => (
                    <div key={d.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <div className="font-medium text-sm">{d.name}</div>
                        <div className="text-xs text-gray-500">{d.type}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a href={d.link} className="text-sm text-blue-600">View</a>
                        <button className="text-sm border rounded px-2 py-1 text-amber-200">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Security</h3>
                </div>

                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Change Password</div>
                      <div className="text-sm">Keep your account secure</div>
                    </div>
                    <button onClick={() => setEditOpen({section: "password"})} className="px-3 py-2 border rounded-md">Change</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">2-Factor Authentication</div>
                      <div className="text-sm">{user.twoFA ? "Enabled" : "Disabled"}</div>
                    </div>
                    <button onClick={() => setConfirmOpen({action: "toggle-2fa"})} className="px-3 py-2 border rounded-md">{user.twoFA ? "Disable" : "Enable"}</button>
                  </div>

                  <div className="text-xs text-gray-500">Recent logins</div>
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    {user.activity.slice(0,5).map((a: any) => (
                      <div key={a.id} className="text-xs">{a.text} — <span className="text-gray-500">{a.time}</span></div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-semibold text-gray-800">Ownership Summary</h3>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-blue-500">Total Properties</div>
                    <div className="font-medium text-blue-700">{user.stats.totalProperties}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-yellow-600">Active Transfers</div>
                    <div className="font-medium text-yellow-700">{user.stats.activeTransfers}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">Stored Documents</div>
                    <div className="font-medium text-gray-700">{user.stats.documentsCount}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">Account Actions</div>
                    <div className="text-xs text-gray-500">Danger zone</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => setConfirmOpen({action: "deactivate"})} className="px-3 py-2 text-cyan-500 border rounded-md">Deactivate</button>
                    <button onClick={() => setConfirmOpen({action: "delete"})} className="px-3 py-2 bg-red-600 text-white rounded-md">Delete Account</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </main>
      </div>

      <Footer />

      <ProfileEditModal
        open={!!editOpen}
        section={editOpen?.section}
        user={user}
        onClose={() => setEditOpen(null)}
        onSave={(updates: any) => {
          setUser((u: any) => ({...u, ...updates}));
          setEditOpen(null);
        }}
      />

      <ConfirmActionModal
        open={!!confirmOpen}
        action={confirmOpen?.action}
        payload={confirmOpen?.payload}
        onClose={() => setConfirmOpen(null)}
        onConfirm={async (opts: any) => {
          const action = confirmOpen?.action;
          if (action === "delete") {
            alert("Account deleted (demo). Redirecting...");
          } else if (action === "deactivate") {
            alert("Account deactivated (demo).");
          } else if (action === "toggle-2fa") {
            setUser((u: any) => ({...u, twoFA: !u.twoFA}));
          } else if (action === "reset-pin") {
            alert("IPDI PIN reset (demo).");
          }
          setConfirmOpen(null);
        }}
      />

    </div>
  );
}
