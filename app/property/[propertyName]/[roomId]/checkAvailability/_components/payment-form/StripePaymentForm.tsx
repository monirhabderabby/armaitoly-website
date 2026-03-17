"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const IconChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
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

interface StripePaymentFormProps {
  bookId: string;
  amount: number;
  currency: string;
  loading: boolean;
  onBack: () => void;
  onSuccess: () => void; // 👈 triggers setStep(3)
}

export function StripePaymentForm({
  bookId,
  amount,
  currency,
  loading,
  onBack,
  onSuccess,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setIsPaying(true);
    setError(null);

    // ── Step 1: Confirm payment with Stripe ──────────────────────────────
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // stay on page, no redirect
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed");
      setIsPaying(false);
      return;
    }

    // ── Step 2: Record payment in Beds24 via your API ────────────────────
    try {
      const res = await fetch("/api/bookings/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          amount,
          currency,
          paymentIntentId: paymentIntent!.id, // pi_xxx
          description: "Deposit payment",
        }),
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message ?? "Failed to record payment");
        setIsPaying(false);
        return;
      }

      // ── Step 3: Tell parent to show success screen ───────────────────
      onSuccess(); // 👈 this calls setStep(3) in PaymentFormContainer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setIsPaying(false);
    }
  };

  const isLoading = loading || isPaying;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition hover:border-gray-300 hover:shadow disabled:opacity-40"
        >
          <IconChevronLeft />
        </button>
        <div>
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Secure Payment
          </h3>
          <p className="text-sm text-gray-500">
            Your payment is encrypted and secure.
          </p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stripe renders card number, expiry, CVC automatically */}
        <PaymentElement />

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* Pay button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handlePay}
            disabled={isLoading || !stripe || !elements}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#24a9e1" }}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Processing Payment…
              </>
            ) : (
              `Pay ${currency} ${amount.toLocaleString()}`
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <IconShield /> 256-bit SSL · PCI DSS Compliant
          </div>
        </div>
      </div>
    </div>
  );
}
