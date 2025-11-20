// components/ConfirmActionModal.tsx
"use client";
import Modal from "@/components/Modal";

export default function ConfirmActionModal({ open, action, payload, onClose, onConfirm }: any) {
  if (!open) return null;

  const titleMap: any = {
    "delete": "Delete Account",
    "deactivate": "Deactivate Account",
    "toggle-2fa": "Toggle 2-Factor Authentication",
    "reset-pin": "Reset IPDI PIN"
  };

  const descMap: any = {
    "delete": "This will permanently delete your IPDI account and all associated data. This action is irreversible.",
    "deactivate": "Your account will be deactivated. You can contact support to reactivate.",
    "toggle-2fa": "Enable or disable 2-factor authentication for extra security.",
    "reset-pin": "Reset your IPDI security PIN. You will need to re-configure it."
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{titleMap[action]}</h3>
        <p className="text-sm text-gray-600 mt-2">{descMap[action]}</p>

        <div className="mt-4">
          {(action === "delete" || action === "deactivate") && (
            <>
              <div className="text-xs text-gray-500">Confirm with Aadhaar OTP</div>
              <input className="input mt-2" placeholder="Enter Aadhaar OTP" />
            </>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onClose} className="px-3 py-2 rounded-md border">Cancel</button>
            <button onClick={() => onConfirm && onConfirm({action, payload})} className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
