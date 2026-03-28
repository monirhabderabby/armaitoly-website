"use client";

import { PaymentIntentData } from "@/hooks/booking/use-create-payment-intent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import moment from "moment";
import { useState } from "react";
import { BookingSummary, VillaInfo } from "./Bookingsummary";
import { GuestData, GuestInfoForm } from "./Guestinfoform";
import { StripePaymentForm } from "./StripePaymentForm";

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

interface PaymentFormContainerProps {
  villa?: VillaInfo;
  onSubmit?: (data: {
    guest: GuestData;
    card: null;
    voucher: string;
  }) => Promise<PaymentIntentData | false>;
  loading: boolean;
}

const defaultVilla: VillaInfo = {
  name: "Deluxe Garden Villa",
  location: "Bali, Indonesia",
  checkIn: "2026-02-12",
  checkOut: "2026-02-19",
  guests: 4,
  cleaningFee: 850,
  total: 1300,
  currency: "USD",
};

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
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${current >= s.n ? "bg-[#24a9e1] text-white shadow-sm shadow-[#24a9e1]/30" : "border border-gray-200 bg-white text-gray-400"}`}
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

export default function PaymentFormContainer({
  villa = defaultVilla,
  onSubmit,
  loading,
}: PaymentFormContainerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [voucher, setVoucher] = useState("");

  // Store full PaymentIntentData from API (includes publishableKey)
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentData | null>(
    null,
  );

  // Stripe instance loaded dynamically with key from API response
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  // ── Step 1 → 2 ────────────────────────────────────────────────────────────
  const handleGuestNext = async (data: GuestData) => {
    setGuestData(data);

    const result = await onSubmit?.({ guest: data, card: null, voucher });
    if (!result) return;

    // Load Stripe with publishableKey returned from the API
    const stripe = loadStripe(result.publishableKey, {
      stripeAccount: result.stripeAccount || undefined,
    });

    setStripePromise(stripe);
    setPaymentIntent(result);
    setStep(2);
  };

  // ── Step 2 → 3 ────────────────────────────────────────────────────────────
  const handlePaymentSuccess = () => setStep(3);

  return (
    <section className="mx-auto">
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
        <div className="order-2 lg:order-1 lg:col-span-2">
          {/* STEP 1 — Guest info */}
          {step === 1 && (
            <GuestInfoForm
              defaultValues={guestData ?? undefined}
              onNext={handleGuestNext}
              loading={loading}
            />
          )}

          {/* STEP 2 — Stripe payment form */}
          {step === 2 && paymentIntent && stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntent.clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: { colorPrimary: "#24a9e1" },
                },
              }}
            >
              <StripePaymentForm
                bookId={paymentIntent.bookId}
                amount={paymentIntent.amount}
                currency={paymentIntent.currency}
                loading={loading}
                onBack={() => setStep(1)}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          )}

          {/* STEP 3 — Success */}
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
                    {
                      label: "Check-in",
                      value: moment(villa.checkIn).format("MMMM D, YYYY"),
                    },
                    {
                      label: "Check-out",
                      value: moment(villa.checkOut).format("MMMM D, YYYY"),
                    },
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
                      {paymentIntent?.amount.toLocaleString() ??
                        villa.total.toLocaleString()}
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

        <div className="order-1 lg:order-2 lg:col-span-1">
          <BookingSummary
            villa={villa}
            voucher={voucher}
            setVoucher={setVoucher}
          />
        </div>
      </div>
    </section>
  );
}
