"use client";

import { useGetSingleBooking } from "@/hooks/booking/use-get-single-booking";
import moment from "moment";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconX = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
const IconRefresh = () => (
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
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-5" />
  </svg>
);
const IconArrowLeft = () => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#fff5f5] via-white to-[#fef2f2] flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-pulse space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-red-100" />
        <div className="mx-auto h-5 w-40 rounded-lg bg-slate-100" />
        <div className="mx-auto h-3 w-56 rounded-lg bg-slate-100" />
        <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-3 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
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
export default function BookingCancelledClient({ bookId }: { bookId: string }) {
  const { data, isLoading, isError, error } = useGetSingleBooking(bookId);

  if (isLoading) return <Skeleton />;

  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#fff5f5] via-white to-[#fef2f2] flex items-center justify-center p-4">
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
  const { price, currency } = payment;
  const guestName =
    [guest.firstName, guest.lastName].filter(Boolean).join(" ") || "—";

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
    { icon: <IconMail />, label: "Guest", value: guestName },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fff5f5] via-white to-[#fef2f2] flex items-center justify-center p-4 py-16 md:py-28">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-rose-100/60 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* ── Cancelled Icon ────────────────────────────────────────────── */}
        <div className="mb-7 text-center">
          <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-red-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-red-400 to-rose-500 shadow-lg shadow-red-200">
              <IconX />
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Payment Cancelled
          </h1>
          <p className="mt-1.5 text-xs text-gray-500 max-w-xs mx-auto">
            Your payment was not completed. No charges have been made to your
            account.
          </p>

          {/* Booking ID badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-white px-3 py-1 text-[11px] font-semibold text-red-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Booking #{bId}
          </div>
        </div>

        {/* ── Main Card ─────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-100/80 overflow-hidden">
          {/* Card header */}
          <div
            className="px-6 py-4 border-b border-gray-100"
            style={{
              background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)",
            }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-500 mb-0.5">
              Cancelled Reservation
            </p>
            <p className="text-[11px] text-gray-400">
              Status:{" "}
              <span className="font-semibold text-red-500">
                {booking.statusLabel || "Cancelled"}
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
                  <span className="text-red-400">{row.icon}</span>
                  {row.label}
                </span>
                <span className="text-right text-[12px] font-medium text-gray-700 truncate max-w-[60%]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Amount + no charge notice */}
          <div className="px-6 py-4 bg-gray-50/60 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">Total Amount</span>
              <span className="text-[13px] font-semibold text-gray-400 line-through decoration-red-300">
                {price.toLocaleString()} {currency}
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-green-600 font-medium">
              ✓ No payment was charged
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 space-y-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
              What would you like to do?
            </p>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-gray-600 shadow-sm transition hover:border-gray-300 hover:shadow active:scale-95"
            >
              <IconArrowLeft />
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* ── Help note ─────────────────────────────────────────────────── */}
        <div className="mt-5 rounded-2xl border border-red-50 bg-white/80 px-5 py-3.5 text-center shadow-sm">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="font-semibold text-[#24a9e1] hover:underline"
            >
              Contact our support team
            </a>{" "}
            and we&apos;ll get you sorted right away.
          </p>
        </div>
      </div>
    </div>
  );
}
