"use client";

import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconShield = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconPhone = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 .84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface VillaInfo {
  name: string;
  location: string;
  image?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  cleaningFee: number;
  total: number;
  currency?: string;
}

interface BookingSummaryProps {
  villa: VillaInfo;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function BookingSummary({ villa }: BookingSummaryProps) {
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);

  const detailRows = [
    { label: "Check-in", value: villa.checkIn },
    { label: "Check-out", value: villa.checkOut },
    { label: "Guests", value: `${villa.guests} guests` },
    {
      label: "Cleaning fee",
      value:
        villa.cleaningFee === 0
          ? "Free"
          : `${villa.cleaningFee} ${villa.currency}`,
    },
  ];

  const trustBadges = [
    {
      icon: <IconShield />,
      text: "256-bit SSL encryption",
    },
    {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 14 4 9 9 4" />
          <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
        </svg>
      ),
      text: "Free cancellation within 48h",
    },
    { icon: <IconPhone />, text: "24/7 guest support" },
  ];

  return (
    <div className="sticky top-24 space-y-4">
      {/* Villa card */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
        {/* Villa header */}
        <div
          className="px-6 pt-6 pb-5 border-b border-gray-100"
          style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#fff 100%)" }}
        >
          <span
            className="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: "#24a9e1" }}
          >
            Villa
          </span>
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            {villa.name}
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <IconMapPin /> {villa.location}
          </p>
        </div>

        {/* Detail rows */}
        <div className="px-6 py-4 space-y-3 border-b border-gray-100">
          {detailRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-500">{row.label}</span>
              <span className="font-medium text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Voucher */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Voucher Code
          </p>
          <div className="flex gap-2">
            <input
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              disabled={voucherApplied}
              placeholder="Enter code"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#24a9e1] focus:ring-2 focus:ring-[#24a9e1]/10 disabled:opacity-50 placeholder:text-gray-300"
            />
            <button
              onClick={() => voucher && setVoucherApplied(true)}
              disabled={!voucher || voucherApplied}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-[#24a9e1] hover:text-[#24a9e1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {voucherApplied ? "✓ Applied" : "Apply"}
            </button>
          </div>
        </div>

        {/* Grand total */}
        <div className="px-6 py-5">
          <div className="flex items-end justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Grand Total
            </span>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-gray-900">
                {villa.total.toLocaleString()}
              </span>
              <span className="ml-1 text-sm font-medium text-gray-400">
                {villa.currency}
              </span>
            </div>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            No charges until booking confirmed
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm space-y-2.5">
        {trustBadges.map((b) => (
          <div
            key={b.text}
            className="flex items-center gap-2.5 text-xs text-gray-500"
          >
            <span className="text-[#24a9e1]">{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}
