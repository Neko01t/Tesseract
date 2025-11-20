"use client";

import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PublicSaleDetailModal({
  open,
  onClose,
  property,
}: any) {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-3xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Public Sale Listing – {property.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            ✕
          </button>
        </div>

        <img
          src={property.img}
          className="w-full h-56 object-cover rounded-lg"
        />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              <b>Property ID:</b> {property.propertyId}
            </p>
            <p>
              <b>Sale ID:</b> {property.saleId}
            </p>
            <p>
              <b>Location:</b> {property.location}
            </p>
            <p>
              <b>Price:</b> {property.price}
            </p>
          </div>

          <div>
            <p>
              <b>Owner:</b> Verified Owner (Identity Secured)
            </p>
            <p>
              <b>Record Status:</b> Blockchain Verified ✔
            </p>
            <p>
              <b>Ownership Type:</b> Individual
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4 border mt-6"
        >
          <h3 className="font-semibold text-gray-700 mb-2">Contract Summary</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            • Smart contract auto-executes upon payment confirmation. <br />
            • All transactions are logged immutably on IPDI blockchain. <br />•
            Buyer must complete eKYC before purchase is allowed.
          </p>
          <button className="mt-3 text-blue-600 underline">
            View Full Contract →
          </button>
        </motion.div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-blue-600 
             text-blue-700 font-medium bg-blue-50
             hover:bg-blue-100 hover:text-blue-800
             shadow-sm transition"
          >
            Close
          </button>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Apply to Purchase
          </button>
        </div>
      </div>
    </Modal>
  );
}
