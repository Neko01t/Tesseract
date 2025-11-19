"use client";
import Modal from "./Modal";
import { motion } from "framer-motion";

export default function PropertyMapModal({
  open,
  onClose,
  property,
}: {
  open: boolean;
  onClose: () => void;
  property?: { title?: string; propertyId?: string; size?: string; coords?: any };
}) {
  const p = property || { title: "Residential Plot", propertyId: "PRID-KA-BLR-001", size: "1200 sqft" };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{p.title} — Map</h3>
            <div className="text-xs text-gray-500">ID: <span className="font-mono">{p.propertyId}</span></div>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">✕</button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="w-full h-[420px] bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 400 300" className="max-h-[360px]">
              <rect x="0" y="0" width="100%" height="100%" fill="#eef2ff" rx="8" />
              <polygon points="60,240 120,80 200,120 300,60 340,200 220,260 120,200"
                fill="#e6f0ff" stroke="#60a5fa" strokeWidth="3" opacity="0.95" />
              <circle cx="200" cy="150" r="6" fill="#1d4ed8" />
            </svg>
          </div>
          <div className="p-3 bg-white">
            <div className="text-sm text-gray-700">Centroid marker shown. Zoom & pan controls available in full map view.</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Open Full Map</button>
              <button className="px-3 py-2 rounded-md border text-sm">Download KML</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
