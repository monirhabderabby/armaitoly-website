"use client";

import { useState } from "react";
import { BookingSummary, VillaInfo } from "./Bookingsummary";
import { CardInfoForm } from "./Cardinfoform";
import { GuestData, GuestInfoForm } from "./Guestinfoform";

const IconCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface PaymentFormContainerProps {
  villa?: VillaInfo;
  onSubmit?: (data: {
    guest: GuestData;
    card: CardData;
    voucher: string;
  }) => void;
  loading: boolean;
}

const defaultVilla: VillaInfo = {
  name: "Deluxe Garden Villa",
  location: "Bali, Indonesia",
  checkIn: "Sunday 12 February",
  checkOut: "Sunday 19 February",
  guests: 4,
  cleaningFee: 850,
  total: 1300,
  currency: "USD",
};

// ─── Steps indicator ─────────────────────────────────────────────────────────
const Steps = ({ current }: { current: number }) => (
  <div className="flex items-center gap-2 mb-8">
    {(
      [
        { n: 1, label: "Guest Info" },
        { n: 2, label: "Payment" },
      ] as const
    ).map((s, i) => (
      <div key={s.n} className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
              current >= s.n
                ? "bg-[#24a9e1] text-white shadow-sm shadow-[#24a9e1]/30"
                : "border border-gray-200 bg-white text-gray-400"
            }`}
          >
            {current > s.n ? <IconCheck /> : s.n}
          </div>
          <span
            className={`text-sm font-medium hidden sm:block ${current >= s.n ? "text-gray-700" : "text-gray-400"}`}
          >
            {s.label}
          </span>
        </div>
        {i < 1 && (
          <div
            className={`h-px w-8 sm:w-16 transition-colors ${current > s.n ? "bg-[#24a9e1]" : "bg-gray-200"}`}
          />
        )}
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaymentFormContainer({
  villa = defaultVilla,
  onSubmit,
  loading,
}: PaymentFormContainerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [voucher] = useState("");

  // Called by GuestInfoForm when its shadcn form passes validation
  const handleGuestNext = (data: GuestData) => {
    setGuestData(data);
    setStep(2);
  };

  // AFTER — accept cardData directly from CardInfoForm's own validated form state
  const handleSubmit = async (cardData: CardData) => {
    if (!guestData) return;
    onSubmit?.({ guest: guestData, card: cardData, voucher });
    setStep(3);
  };

  return (
    <section className="mx-auto ">
      {/* Page header */}
      <div className="mb-2">
        <div className="mb-2">
          <span
            className="rounded-full px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white"
            style={{ backgroundColor: "#24a9e1" }}
          >
            Payment Required
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {step === 3
            ? "You're all set!"
            : `${villa.name} requires a payment of ${villa.total.toLocaleString()} ${villa.currency}`}
        </h1>
        {step < 3 && (
          <p className="mt-1 text-sm text-gray-500">
            Complete the steps below to confirm your booking.
          </p>
        )}
      </div>

      {step < 3 && <Steps current={step} />}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ── LEFT: Form ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {/* STEP 1 — delegated entirely to GuestInfoForm */}
          {step === 1 && (
            <GuestInfoForm
              defaultValues={guestData ?? undefined}
              onNext={handleGuestNext}
            />
          )}

          {/* STEP 2: Card Information */}
          {step === 2 && (
            <CardInfoForm
              currency={villa.currency!}
              total={villa.total}
              loading={loading}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}

          {/* STEP 3: Success */}
          {step === 3 && guestData && (
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden text-center">
              <div className="px-6 py-10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#24a9e1]/10">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#24a9e1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Booking Confirmed!
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  A confirmation was sent to{" "}
                  <span className="font-semibold text-gray-700">
                    {guestData.email}
                  </span>
                </p>
              </div>

              <div className="mx-6 mb-6 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-left space-y-3">
                {(
                  [
                    { label: "Property", value: villa.name },
                    { label: "Check-in", value: villa.checkIn },
                    { label: "Check-out", value: villa.checkOut },
                    { label: "Guests", value: `${villa.guests}` },
                  ] as const
                ).map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-500">{r.label}</span>
                    <span className="font-medium text-gray-800">{r.value}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 flex items-end justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Total Paid
                  </span>
                  <div>
                    <span className="text-2xl font-extrabold text-gray-900">
                      {villa.total.toLocaleString()}
                    </span>
                    <span className="ml-1 text-sm text-gray-400">
                      {villa.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Booking summary (extracted component) ──────────────────── */}
        <div className="lg:col-span-1">
          <BookingSummary villa={villa} />
        </div>
      </div>
    </section>
  );
}
