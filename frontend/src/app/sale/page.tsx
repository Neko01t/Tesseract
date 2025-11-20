"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import PublicSaleDetailModal from "@/components/PublicSaleDetailModal";

export default function PublicSalePage() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const properties = [
    {
      id: "1",
      saleId: "SLID-89A1-D3R2",
      title: "Residential Plot",
      propertyId: "PRID-KA-BLR-001",
      location: "Bangalore",
      price: "₹ 25,00,000",
      img: "/placeholder-property-1.jpg",
    },
    {
      id: "2",
      saleId: "SLID-8F65-KL12",
      title: "Apartment #304",
      propertyId: "PRID-KA-BLR-045",
      location: "BTM Layout, Bangalore",
      price: "₹ 48,00,000",
      img: "/placeholder-property-2.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7ff]">
      <Header title="Public Sale Listings" subtitle="IPDI Marketplace" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 md:px-8 py-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Properties on Public Sale
            </h1>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Sale ID (e.g., SLID-XXXX)"
                className="px-4 py-2 w-60 rounded-md 
             bg-white border border-gray-300 
             text-gray-800 placeholder-gray-500 
             focus:border-blue-600 focus:ring-2 focus:ring-blue-200
             shadow-sm"
              />

              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white border rounded-xl shadow-sm overflow-hidden cursor-pointer"
                onClick={() => setSelectedProperty(p)}
              >
                <img src={p.img} className="h-48 w-full object-cover" />
                <div className="p-4 space-y-2">
                  <div className="font-semibold text-gray-800">{p.title}</div>
                  <div className="text-sm text-gray-600">
                    PropertyID: {p.propertyId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Sale ID: {p.saleId}
                  </div>
                  <div className="text-sm text-gray-500">
                    Location: {p.location}
                  </div>

                  <div className="text-blue-700 font-bold text-lg">
                    {p.price}
                  </div>

                  <button className="mt-2 px-4 py-2 w-full text-center rounded-md  bg-blue-600 text-white font-medium hover:bg-blue-700 transition-shadow shadow-sm">
                    View Listing
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      <Footer />

      <PublicSaleDetailModal
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        property={selectedProperty}
      />
    </div>
  );
}
