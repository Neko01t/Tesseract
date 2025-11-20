"use client";
import { motion } from "framer-motion";

export default function TransferCard({ property, onCreateRequest, request }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between"
    >
      <div>
        <div className="text-lg font-medium text-gray-800">{property.title}</div>
        <div className="text-xs text-gray-500 mt-1">
          <div>PropertyID: <span className="font-mono text-xs">{property.propertyId}</span></div>
          <div>Size: {property.size}</div>
          <div>Location: {property.location}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          {request ? (
            <div className="text-sm px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">Request: {request.status}</div>
          ) : (
            <div className="text-sm px-3 py-1 rounded-full bg-green-50 text-green-700">No Active Request</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCreateRequest}
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Create Request
          </button>
        </div>
      </div>
    </motion.div>
  );
}
