"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import TransferCard from "@/components/TransferCard";
import TransferRequestModal from "@/components/TransferRequestModal";


export default function TransfersPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [openModalFor, setOpenModalFor] = useState<any | null>(null);

  useEffect(() => {
    setProperties([
      {
        id: "1",
        title: "Residential Plot",
        propertyId: "PRID-KA-BLR-SR123-abc123",
        size: "1200 sq ft",
        location: "Bangalore",
      },
      {
        id: "2",
        title: "Apartment #304",
        propertyId: "PRID-KA-BLR-SR123-abc456",
        size: "2 BHK",
        location: "Bangalore",
      },
    ]);

    setRequests([
      { id: "r1", propertyId: "PRID-KA-BLR-001", status: "pending", createdAt: "2025-11-12" },
    ]);
  }, []);

  const refreshData = async () => {
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7ff]">
      <Header title="Transfers" subtitle="Initiate or manage transfer requests" />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Transfers</h1>
            <div className="text-sm text-gray-500">Manage transfer requests for your properties</div>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-sm text-gray-600">Transfer requests pending</div>
                <div className="text-2xl font-bold text-blue-700">{requests.length}</div>
              </div>
              <div className="text-xs text-gray-500">
                Requests placed remain in "pending" until buyer accepts or admin approves.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.map((p) => (
              <TransferCard
                key={p.id}
                property={p}
                onCreateRequest={() => setOpenModalFor(p)}
                request={requests.find((r) => r.propertyId === p.propertyId)}
              />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Requests</h2>
            <div className="space-y-3">
              {requests.length === 0 && <div className="text-sm text-gray-500">No requests yet.</div>}
              {requests.map((r) => (
                <div key={r.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <div><b>{r.propertyId}</b></div>
                    <div className="text-xs text-gray-500">Status: {r.status}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {r.status === "pending" && (
                      <button
                        className="px-3 py-2 text-sm bg-red-50 text-red-600 border rounded-md"
                        onClick={async () => {
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <TransferRequestModal
        open={!!openModalFor}
        property={openModalFor}
        onClose={() => setOpenModalFor(null)}
        onSuccess={() => {
          setOpenModalFor(null);
          refreshData();
        }}
      />
    </div>
  );
}
