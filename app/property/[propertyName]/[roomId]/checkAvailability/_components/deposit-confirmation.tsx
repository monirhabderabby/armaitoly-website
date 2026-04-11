"use client";

import { useEffect, useRef } from "react";

interface Props {
  depositAmount: string;
  totalAmount: string;
  remainingAmount: string;
  villaName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  currency: string;
  message?: string;
  onConfirm: () => void;
  onClose: () => void;
  depositLabel?: string;
}

const DepositConfirmation = ({
  depositAmount,
  totalAmount,
  remainingAmount,
  villaName,
  checkIn,
  checkOut,
  guests,
  currency,
  message,
  onConfirm,
  onClose,
  depositLabel,
}: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-9999 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fadeIn"
    >
      <div className="w-full max-w-md rounded-2xl bg-white  shadow-2xl border border-black/10  animate-slideUp overflow-hidden">
        {/* Header */}
        <div className="bg-[#24a9e1]/10 px-6 pt-7 pb-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white flex items-center justify-center"
          >
            ✕
          </button>

          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1 mt-3">
            Booking confirmation
          </p>
          <h2 className="text-2xl font-semibold text-black">
            Confirm your deposit
          </h2>
        </div>

        {/* Villa Info */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-black/10 dark:border-white/10">
          <div className="w-11 h-11 rounded-lg bg-linear-to-br from-[#24a9e1] to-[#1b7fa8] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M3 9.5L12 4l9 5.5V20H3V9.5z" />
              <rect x="9" y="14" width="6" height="6" rx="0.5" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium text-black dark:text-white">
              {villaName}
            </p>
            <p className="text-xs text-gray-500">
              {checkIn} – {checkOut} · {guests} guest{guests !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-2">
          <div className="flex justify-between py-3 border-b border-black/10 dark:border-white/10 text-sm">
            <span className="text-gray-500">Total stay amount</span>
            <span className="font-medium text-black dark:text-white">
              {currency} {totalAmount}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-black/10 dark:border-white/10 text-sm">
            <span className="text-gray-500">
              Deposit due now
              <span className="block text-[11px] text-gray-400">
                {depositLabel ?? "30% of total"}
              </span>
            </span>
            <span className="font-medium text-black dark:text-white">
              {currency} {depositAmount}
            </span>
          </div>

          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">
              Remaining balance
              <span className="block text-[11px] text-gray-400">
                Due at check-in
              </span>
            </span>
            <span className="font-medium text-black dark:text-white">
              {currency} {remainingAmount}
            </span>
          </div>

          {/* Highlight */}
          <div className="mt-3 mb-4 flex justify-between items-center rounded-xl border border-[#24a9e1]/30 bg-[#24a9e1]/10 px-4 py-4">
            <span className="text-xs uppercase tracking-wider text-[#24a9e1] font-medium">
              Charge today
            </span>
            <span className="text-2xl font-semibold text-black dark:text-white">
              {currency} {depositAmount}
            </span>
          </div>

          {/* Notice */}
          <div className="flex gap-2 items-start bg-gray-100 dark:bg-neutral-800 p-3 rounded-md mb-5 text-xs text-gray-600 dark:text-gray-400">
            <span className="mt-0.5 text-[#24a9e1]">ℹ</span>
            <p>
              {message ??
                `By confirming, your card will be charged ${currency} ${depositAmount}. The remaining ${currency} ${remainingAmount} must be paid within 30 days of the check-in date.`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="py-3 rounded-lg border border-black/20 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:opacity-70 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="py-3 rounded-lg bg-[#24a9e1] text-white text-sm font-medium hover:opacity-90"
          >
            Confirm & Pay
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 border-t border-black/10 dark:border-white/10 py-3">
          <span>🔒</span>
          <span>Secured by Stripe · 256-bit SSL</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DepositConfirmation;
