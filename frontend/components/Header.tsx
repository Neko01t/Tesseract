"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Menu
} from "lucide-react";
import Link from "next/link";

export default function Header({
  title = "IPDI User Dashboard",
  subtitle = "Government of India",
  user = "User",
  onToggleSidebar
}: {
  title?: string;
  subtitle?: string;
  user?: string;
  onToggleSidebar?: () => void;
}) {
  const router  = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="IPDI Logo"
              className="h-10 w-10"
            />

            <div className="leading-tight hidden sm:block">
              <h1 className="text-blue-900 font-semibold text-lg">{title}</h1>
              <p className="text-xs text-blue-700 opacity-80">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">

          <div className="relative">
            <select
              className="text-sm border border-blue-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer"
            >
              <option>English</option>
              <option>हिन्दी</option>
              <option>ಕನ್ನಡ</option>
              <option>தமிழ்</option>
            </select>
          </div>

          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 hover:bg-blue-50 border border-blue-100 rounded-md transition"
            >
              <Bell size={20} className="text-blue-900" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-64 bg-white shadow-xl border border-gray-200 rounded-md z-50"
                >
                  <div className="p-3 text-sm text-blue-900 font-medium border-b">
                    Notifications
                  </div>
                  <ul className="text-sm text-gray-700 max-h-40 overflow-y-auto">
                    <li className="px-4 py-2 hover:bg-blue-50 transition cursor-pointer">
                      ➤ Transfer request approved
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-50 transition cursor-pointer">
                      ➤ New document verification update
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 border border-blue-100
                         rounded-md transition"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={18} className="text-blue-900" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-200 z-50"
                >
                  <ul className="flex flex-col py-1 text-sm text-blue-900">

                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition"
                      >
                        <User size={18} /> Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition"
                      >
                        <Settings size={18} /> Settings
                      </Link>
                    </li>

                    <li className="border-t border-gray-200 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </li>

                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </header>
  );
}
