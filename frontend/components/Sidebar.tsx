"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  RefreshCcw,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Find Properties", icon: Home, href: "/sale" },
  { label: "Transfers", icon: RefreshCcw, href: "/transfers" },
  { label: "Verification", icon: ShieldCheck, href: "/verification" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);      
  const [collapsed, setCollapsed] = useState(false); 
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-3 fixed top-4 left-4 z-50 rounded-md bg-white shadow"
      >
        <Menu size={26} className="text-blue-800" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm md:hidden z-30"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: open ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-40 md:hidden"
      >
        
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" className="h-8 opacity-90" />
            <h1 className="text-xl font-semibold text-blue-800">IPDI</h1>
          </div>

          <button onClick={() => setOpen(false)} className="text-blue-800">
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col mt-2 gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath.startsWith(item.href);

            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all
                    ${active ? "bg-blue-100 text-blue-900 shadow-sm" : "text-blue-900 hover:bg-blue-50"}`}
                >
                  <Icon size={20} className="text-blue-700" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm mt-4 text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </nav>
      </motion.aside>

      <motion.aside
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="hidden md:flex flex-col h-screen bg-white border-r shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2 overflow-hidden">
            <img src="/logo.png" className="h-8 opacity-90" />
            {!collapsed && (
              <h1 className="text-xl font-semibold text-blue-800">IPDI</h1>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-blue-800"
          >
            {collapsed ? <ChevronsRight size={22} /> : <ChevronsLeft size={22} />}
          </button>
        </div>

        <nav className="flex flex-col mt-2 gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath.startsWith(item.href);

            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center px-3 py-2 rounded-md text-sm cursor-pointer gap-3 transition-all
                    ${active ? "bg-blue-100 text-blue-900 shadow-sm" : "text-blue-900 hover:bg-blue-50"}
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <Icon size={20} className="text-blue-700" />

                  {!collapsed && <span>{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}

          <button
            className={`flex items-center px-3 py-2 rounded-md text-sm mt-4 text-red-600 hover:bg-red-50 gap-3
            ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={20} />
            {!collapsed && "Logout"}
          </button>
        </nav>
      </motion.aside>
    </>
  );
}
