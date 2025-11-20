"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import PropertyListModal from "@/components/PropertyListModal";
import PropertyMapModal from "@/components/PropertyMapModal";

import {
  Building,
  FileText,
  RefreshCcw,
  Map,
  FileSignature,
  ArrowRight
} from "lucide-react";

export default function DashboardPage() {
  const [listOpen, setListOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapProperty, setMapProperty] = useState<any>(null);

  const user = {
    name: "Piyush Sontakke",
    personId: "PID:MH-20-I-06-125",
    totalProperties: 2,
    pendingTransfers: 1,
    recentActivity: [
      { id: 1, text: "Property PRID-123: Transfer Completed" },
      { id: 2, text: "Document Signed: Sale Agreement" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2ff]">

      <Header title="IPDI User Dashboard" subtitle="Government of India" user={user.name} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex items-center gap-4 border"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold"
            >
              {user.name.charAt(0)}
            </motion.div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.personId}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <StatBox title="Total Properties Owned" value={user.totalProperties} delay={0.1} />
            <StatBox title="Transfer Requests Pending" value={user.pendingTransfers} delay={0.15} />
          </div>

          <SectionTitle title="Main Sections" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><MainButton icon={Building} label="My Properties" onClick={() => setListOpen(true)} /></div>
            <MainButton icon={RefreshCcw} label="Transfer Requests" href="/transfers" />
            <MainButton icon={FileText} label="Documents" href="/documents" />
          </div>

          <SectionTitle title="Quick Actions" className="mt-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickAction icon={Map} label="View Map of My Properties" href="/property/map" />
            <QuickAction icon={FileSignature} label="Start New Transfer" href="/transfers/new" />
          </div>

          <SectionTitle title="Recent Activity" className="mt-10" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="bg-white/70 backdrop-blur border rounded-2xl shadow p-6 space-y-3"
          >
            {user.recentActivity.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-700"
              >
                <ArrowRight size={16} className="text-blue-600" />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      <Footer />

      <PropertyListModal
        open={listOpen}
        onClose={() => setListOpen(false)}
        onOpenMap={(prop) => {
          setMapProperty(prop);
          setMapOpen(true);
        }}
      />

      <PropertyMapModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        property={mapProperty}
      />
    </div>
  );
}



function StatBox({ title, value, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/80 backdrop-blur-md border rounded-2xl shadow p-6 cursor-pointer"
    >
      <div className="text-gray-600 text-sm">{title}</div>
      <div className="text-4xl font-bold text-blue-700 mt-2">{value}</div>
    </motion.div>
  );
}

function MainButton({ icon: Icon, label, href, onClick }: any) {
  const Comp = onClick ? "button" : "a";

  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
      <Comp
        href={!onClick ? href : undefined}
        onClick={onClick}
        className="bg-white/80 backdrop-blur border rounded-2xl shadow p-5 flex flex-col items-center 
                 text-center hover:shadow-lg transition cursor-pointer"
      >
        <motion.div whileHover={{ rotate: 5 }}>
          <Icon size={30} className="text-blue-700" />
        </motion.div>
        <span className="mt-3 font-medium text-gray-800">{label}</span>
      </Comp>
    </motion.div>
  );
}

function QuickAction({ icon: Icon, label, href }: any) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="bg-blue-50 border border-blue-200 rounded-2xl shadow p-5 flex 
                items-center justify-center gap-3 text-blue-900 cursor-pointer 
                hover:bg-blue-100 transition"
    >
      <Icon size={22} />
      <span className="font-medium">{label}</span>
    </motion.a>
  );
}

function SectionTitle({ title, className = "" }: any) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`text-lg font-semibold text-gray-700 mb-3 ${className}`}
    >
      {title}
    </motion.h3>
  );
}
