"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [selected, setSelected] = useState("tenant");
  const router = useRouter();

  const cardClasses = (type: string) =>
    `border rounded-xl p-5 cursor-pointer transition w-52
     ${selected === type ? "border-blue-600 shadow-md" : "border-gray-300"}
    `;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 max-w-3xl w-full">

        {/* Top Image */}
        <div className="flex justify-center mb-6">
          <img src="/onboard-img.png" className="h-40" />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Account Type
        </h2>
        <p className="text-center text-gray-600 max-w-md mx-auto mt-1">
          Choose the account type that suits your needs.
          Each has a different set of tools and features.
        </p>

        {/* Account Types */}
        <div className="flex justify-center gap-6 mt-8">

          {/* Tenant */}
          <div className={cardClasses("tenant")} onClick={() => setSelected("tenant")}>
            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
              Tenant
              {selected === "tenant" && (
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              )}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Apply as Tenant
            </p>
          </div>

          {/* Landlord */}
          <div className={cardClasses("landlord")} onClick={() => setSelected("landlord")}>
            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
              Landlord
              {selected === "landlord" && (
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              )}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Manage and Sold Property
            </p>
          </div>

          {/* Service Pro */}
          <div className={cardClasses("service")} onClick={() => setSelected("service")}>
            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
              Admin(Government)
              {selected === "service" && (
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              )}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Manage requests of property transfer
            </p>
          </div>

        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-10 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
