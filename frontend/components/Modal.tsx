"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string; 
};

export default function Modal({ open, onClose, children, maxWidth = "max-w-3xl" }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6`}
          >
            <div
              className={`w-full ${maxWidth} bg-white rounded-2xl shadow-xl border border-gray-100 overflow-auto max-h-[85vh]`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
