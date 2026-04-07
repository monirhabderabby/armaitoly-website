"use client";

import { useVerifyBookingPayment } from "@/hooks/booking/use-verify-booking-payment";
import moment from "moment";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconCalendar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconMoon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconUsers = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconMail = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconCreditCard = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="13"
    height="13"
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
const IconPhone = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconClock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-pulse space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100" />
        <div className="mx-auto h-5 w-40 rounded-lg bg-slate-100" />
        <div className="mx-auto h-3 w-56 rounded-lg bg-slate-100" />
        <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-3 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="h-3 w-32 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingConfirmedClient({ bookId }: { bookId: string }) {
  const { data, isLoading, isError, error } = useVerifyBookingPayment({
    bookId,
  });

  if (isLoading) return <Skeleton />;

  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-500">
            {error?.message ?? "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const booking = data?.data;
  if (!booking) return null;

  const {
    nights,
    numAdult,
    numChild,
    firstNight,
    lastNight,
    payment,
    guest,
    bookId: bId,
  } = booking;
  const { price, deposit, currency } = payment;
  const remaining = price - deposit;
  const location =
    [guest.city, guest.country].filter(Boolean).join(", ") || null;

  const detailRows = [
    {
      icon: <IconCalendar />,
      label: "Check-in",
      value: moment(firstNight).format("ddd, MMM D, YYYY"),
    },
    {
      icon: <IconCalendar />,
      label: "Check-out",
      value: moment(lastNight).format("ddd, MMM D, YYYY"),
    },
    {
      icon: <IconMoon />,
      label: "Duration",
      value: `${nights} night${nights !== 1 ? "s" : ""}`,
    },
    {
      icon: <IconUsers />,
      label: "Guests",
      value:
        `${numAdult} adult${numAdult !== 1 ? "s" : ""}` +
        (numChild > 0
          ? `, ${numChild} child${numChild !== 1 ? "ren" : ""}`
          : ""),
    },
    { icon: <IconMail />, label: "Email", value: guest.email },
    ...(guest.mobile
      ? [{ icon: <IconPhone />, label: "Phone", value: guest.mobile }]
      : []),
    ...(location
      ? [{ icon: <IconMapPin />, label: "Location", value: location }]
      : []),
    ...(guest.arrivalTime
      ? [{ icon: <IconClock />, label: "Arrival", value: guest.arrivalTime }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] flex items-center justify-center p-4 py-16 md:py-28">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* ── Success Icon ──────────────────────────────────────────────── */}
        <div className="mb-7 text-center">
          <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
            <div
              className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-30"
              style={{ animationDuration: "2s" }}
            />
            <div className="absolute inset-0 rounded-full bg-green-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200">
              <IconCheck />
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Booking Confirmed!
          </h1>
          <p className="mt-1.5 text-xs text-gray-500">
            A confirmation has been sent to{" "}
            <span className="font-semibold text-gray-700">{guest.email}</span>
          </p>

          {/* Booking ID badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-white px-3 py-1 text-[11px] font-semibold text-green-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Booking #{bId}
          </div>
        </div>

        {/* ── Main Card ─────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-100/80 overflow-hidden">
          {/* Card header */}
          <div
            className="px-6 py-4 border-b border-gray-100"
            style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
            }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-green-600 mb-0.5">
              Reservation Details
            </p>
            <p className="text-[11px] text-gray-400">
              Status:{" "}
              <span className="font-semibold text-green-600">
                {booking.statusLabel || "Confirmed"}
              </span>
            </p>
          </div>

          {/* Detail rows */}
          <div className="px-6 py-4 space-y-3 border-b border-gray-100">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="flex items-center gap-1.5 text-[11px] text-gray-400 shrink-0">
                  <span className="text-green-500">{row.icon}</span>
                  {row.label}
                </span>
                <span className="text-right text-[12px] font-medium text-gray-700 truncate max-w-[60%]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Payment summary */}
          <div className="px-6 py-4 space-y-2.5 border-b border-gray-100 bg-gray-50/60">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
              Payment Summary
            </p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="text-green-500">
                  <IconCreditCard />
                </span>
                Total Amount
              </span>
              <span className="text-[12px] font-semibold text-gray-700">
                {price.toLocaleString()} {currency}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500 pl-4.75">
                Deposit Paid (30%)
              </span>
              <span className="text-[12px] font-semibold text-green-600">
                {deposit.toLocaleString()} {currency}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 mt-1">
              <span className="text-[11px] text-gray-500 pl-4.75">
                Remaining Balance
              </span>
              <span className="text-[12px] font-semibold text-gray-700">
                {remaining.toLocaleString()} {currency}
              </span>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3.5">
            <p className="text-[10px] text-gray-400 leading-relaxed text-center">
              The remaining balance is due at check-in. Questions?{" "}
              <a
                href="mailto:support@example.com"
                className="text-[#24a9e1] hover:underline font-medium"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

        {/* ── Trust badges ──────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center justify-center gap-5 text-[10px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure Booking
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Payment Verified
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
            </svg>
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
}
