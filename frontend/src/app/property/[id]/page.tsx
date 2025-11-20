// app/property/[id]/page.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PropertyDetail({ params }: any) {
  const router = useRouter();
  const id = params?.id ?? "1";

  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    
    setProperty({
      id,
      propertyId: "PRID-KA-BLR-SR123-abc123",
      title: "Residential Plot",
      owner: "Piyush Sontakke",
      size: "1200 sq ft",
      survey: "45/2B",
      address: "MG Road, Sector 69, Bangalore",
      history: [
        "2019 - Ownership registered",
        "2021 - Encumbrance clear",
        "2024 - Transfer request completed",
      ],
      documents: [
        { name: "Sale Deed", link: "#" },
        { name: "RTC", link: "#" },
      ],
    });
  }, [id]);

  if (!property) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f5f7ff] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-md hover:bg-gray-100">← Back</button>
          <h1 className="text-2xl font-semibold text-gray-800">Property Details</h1>
        </div>

        <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">{property.title}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p><b>PropertyID:</b> {property.propertyId}</p>
              <p><b>Owner:</b> {property.owner}</p>
              <p><b>Size:</b> {property.size}</p>
              <p><b>Survey No:</b> {property.survey}</p>
              <p><b>Address:</b> {property.address}</p>
            </div>

            <div>
              <div className="mb-3">
                <div className="text-sm text-gray-500">Location</div>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  {/* Map thumbnail placeholder, clicking opens map modal if you want */}
                  <div className="h-40 bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
                    <div className="text-sm text-gray-400">Map Thumbnail (replace with map)</div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md">Open Full Map</button>
                  <Link href="#" className="px-3 py-2 border rounded-md">Download KML</Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700">Ownership Status</h3>
          <ul className="mt-3 text-sm text-gray-700 space-y-1">
            <li>Current Owner(s): {property.owner}</li>
            <li>Mortgages: None</li>
            <li>Disputes: None</li>
          </ul>
        </motion.div>

        <motion.div className="bg-white border rounded-xl p-6 shadow-sm" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">History & Documents</h3>
            <div className="text-xs text-gray-500">View timeline & download</div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Ownership Timeline</div>
              <ul className="mt-2 text-sm text-gray-700 space-y-2">
                {property.history.map((h: string, i: number) => <li key={i}>• {h}</li>)}
              </ul>
            </div>

            <div>
              <div className="text-sm text-gray-600">Documents</div>
              <ul className="mt-2 text-sm text-gray-700 space-y-2">
                {property.documents.map((d: any, i: number) => (
                  <li key={i}>
                    <a href={d.link} className="text-blue-600 underline">{d.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Initiate Transfer</button>
          <button className="px-4 py-2 rounded-md border">Generate Ownership Certificate</button>
        </div>
      </div>
    </div>
  );
}
