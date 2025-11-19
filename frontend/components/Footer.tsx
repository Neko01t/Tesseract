"use client";

import { Mail, Phone, ChevronRight, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-blue-100 mt-12 pt-10">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
        
        <div>
          <h3 className="font-semibold text-xl mb-3 text-white">
            About IPDI Portal
          </h3>
          <p className="text-sm leading-relaxed opacity-90">
            The India Property Digital Infrastructure (IPDI) provides a secure and 
            transparent system for managing land records, ownership verification, 
            and property transfer services. Built with modern technology to 
            ensure trust, accountability, and ease of access for every citizen.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-white">
            Quick Links
          </h3>
          <ul className="text-sm flex flex-col gap-2">
            {[
              "Dashboard",
              "My Properties",
              "Property Registration",
              "Transfer Applications",
              "Verification Services",
              "Support"
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <ChevronRight size={16} className="opacity-80" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-white">
            Contact & Support
          </h3>

          <div className="text-sm space-y-3 opacity-90">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-blue-200" />
              <a href="mailto:support@propertygov.in" className="underline">
                support@propertygov.in
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} className="text-blue-200" />
              1800-123-456  
            </p>

            <p className="text-sm opacity-80">
              (Mon–Fri | 10:00 AM – 6:00 PM)
            </p>

            <p className="flex items-center gap-2 mt-2">
              <MapPin size={16} className="text-blue-200" />
              Ministry of Digital Land Services, New Delhi
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-blue-700"></div>

      <div className="bg-blue-950">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-blue-300">
          © {year} India Property Digital Infrastructure (IPDI). All Rights Reserved. 
          <br className="md:hidden" />
          <span className="hidden md:inline mx-1"> | </span>
          Designed & Developed for Digital Public Services.
        </div>
      </div>
    </footer>
  );
}
