"use client";
import Modal from "./Modal";
import { motion } from "framer-motion";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  propertyId: string;
  size: string;
  location: string;
};

export default function PropertyListModal({
  open,
  onClose,
  onOpenMap,
  properties = [],
}: {
  open: boolean;
  onClose: () => void;
  onOpenMap: (prop: Property) => void;
  properties?: Property[];
}) {
  const demo: Property[] = properties.length
    ? properties
    : [
        {
          id: "1",
          title: "Residential Plot",
          propertyId: "PRID-KA-BLR-001",
          size: "1200 sq ft",
          location: "Bangalore",
        },
        {
          id: "2",
          title: "Apartment #304",
          propertyId: "PRID-KA-BLR-045",
          size: "2 BHK",
          location: "Bangalore",
        },
      ];

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Back"
            >
              ←
            </button>
            <h3 className="text-lg font-semibold text-gray-800">My Properties</h3>
          </div>
          <div className="text-sm text-gray-500">{demo.length} properties</div>
        </div>

        <div className="space-y-4">
          {demo.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-xl bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <div className="font-medium text-gray-800">{p.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="mr-3">PropertyID: <span className="font-mono">{p.propertyId}</span></span>
                  <span className="mr-3">Size: {p.size}</span>
                  <span>Location: {p.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/property/${p.id}`}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  View Details
                </Link>

                <button
                  onClick={() => onOpenMap(p)}
                  className="inline-flex items-center px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
                >
                  Open Map
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
