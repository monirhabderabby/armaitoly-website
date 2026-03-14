// components/availability/availability-calendar.tsx
"use client";

import { AvailabilityDate } from "@/types/availablity";
import { Villa, VillaMinimumStay } from "@/types/property";
import { useMemo, useState } from "react";

export interface OnBookingSubmitProps {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
}

interface Props {
  dates: AvailabilityDate[];
  minimumStay: VillaMinimumStay[];
  villa: Villa;
  onSelect: (data: OnBookingSubmitProps) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getMinStayForDate(
  dateStr: string,
  minimumStay: VillaMinimumStay[],
): number {
  if (!minimumStay?.length) return 1;
  const date = new Date(dateStr + "T00:00:00");
  const monthName = MONTHS[date.getMonth()];
  const match = minimumStay.find(
    (m) => m.months.toLowerCase() === monthName.toLowerCase(),
  );
  return match?.nights ?? minimumStay[0]?.nights ?? 1;
}

function fmt(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AvailabilityCalendar({
  dates,
  minimumStay,
  villa,
  onSelect,
}: Props) {
  const dateMap = useMemo(() => {
    const map: Record<string, AvailabilityDate> = {};
    dates.forEach((d) => {
      map[d.date] = d;
    });
    return map;
  }, [dates]);

  const firstDate = dates[0]?.date
    ? new Date(dates[0].date + "T00:00:00")
    : new Date();

  const [viewYear, setViewYear] = useState(firstDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstDate.getMonth());
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (string | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const month = String(viewMonth + 1).padStart(2, "0");
      const day = String(d).padStart(2, "0");
      cells.push(`${viewYear}-${month}-${day}`);
    }
    return cells;
  }, [viewYear, viewMonth]);

  const rangeEnd = checkIn && !checkOut ? (hovered ?? null) : checkOut;

  // Earliest valid check-out based on min stay
  const minStayEnd = useMemo(() => {
    if (!checkIn || checkOut) return null;
    const minNights = getMinStayForDate(checkIn, minimumStay);
    const d = new Date(checkIn + "T00:00:00");
    d.setDate(d.getDate() + minNights);
    return toYMD(d);
  }, [checkIn, checkOut, minimumStay]);

  function isInRange(dateStr: string): boolean {
    if (!checkIn || !rangeEnd) return false;
    const [a, b] =
      checkIn < rangeEnd ? [checkIn, rangeEnd] : [rangeEnd, checkIn];
    return dateStr > a && dateStr < b;
  }

  function hasBookedInRange(start: string, end: string): boolean {
    const [a, b] = start < end ? [start, end] : [end, start];
    return dates.some((d) => d.date > a && d.date < b && d.status === "booked");
  }

  function handleDayClick(dateStr: string) {
    const info = dateMap[dateStr];
    if (info?.status === "booked") return;

    setError(null);

    if (dateStr === checkIn) {
      setCheckIn(null);
      setCheckOut(null);
      setHovered(null);
      return;
    }
    if (dateStr === checkOut) {
      setCheckOut(null);
      setHovered(null);
      return;
    }
    if (!checkIn || checkOut) {
      setCheckIn(dateStr);
      setCheckOut(null);
      return;
    }
    if (dateStr < checkIn) {
      setCheckIn(dateStr);
      setCheckOut(null);
      return;
    }
    if (hasBookedInRange(checkIn, dateStr)) {
      setError(
        "Your selection includes booked dates. Please choose different dates.",
      );
      return;
    }

    const minNights = getMinStayForDate(checkIn, minimumStay);
    const nights = Math.round(
      (new Date(dateStr + "T00:00:00").getTime() -
        new Date(checkIn + "T00:00:00").getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (nights < minNights) {
      const minDate = new Date(checkIn + "T00:00:00");
      minDate.setDate(minDate.getDate() + minNights);
      const minDateStr = toYMD(minDate);
      if (
        dateMap[minDateStr]?.status === "available" &&
        !hasBookedInRange(checkIn, minDateStr)
      ) {
        setCheckOut(minDateStr);
        setError(
          `Minimum stay is ${minNights} night${minNights > 1 ? "s" : ""}. Check-out snapped to earliest valid date.`,
        );
      } else {
        setError(
          `Minimum stay is ${minNights} night${minNights > 1 ? "s" : ""} for this period.`,
        );
      }
      return;
    }

    setCheckOut(dateStr);
  }

  // ── Nights count ─────────────────────────────────────────────────────────
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return Math.round(
      (new Date(checkOut + "T00:00:00").getTime() -
        new Date(checkIn + "T00:00:00").getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }, [checkIn, checkOut]);

  // ── Pricing calculations ──────────────────────────────────────────────────
  const pricing = useMemo(() => {
    if (!checkIn || !checkOut || !nights) return null;

    const currency = villa.price.currency;
    const perNight = villa.price.amount;
    const baseGuests = villa.capacity.baseGuests;
    const extraFee = villa.capacity.extraGuestFee;

    const accommodation = perNight * nights;
    const extraGuestCharge =
      guests > baseGuests ? (guests - baseGuests) * extraFee * nights : 0;
    const cleaning = villa.cleaningFee ?? 0;
    const subtotal = accommodation + extraGuestCharge + cleaning;
    const tax =
      Math.round(((subtotal * (villa.taxPercent ?? 0)) / 100) * 100) / 100;
    const total = subtotal + tax;

    return {
      currency,
      perNight,
      accommodation,
      extraGuestCharge,
      cleaning,
      subtotal,
      tax,
      total,
    };
  }, [checkIn, checkOut, nights, guests, villa]);

  function handleNext() {
    if (checkIn && checkOut && nights && pricing) {
      onSelect({
        checkIn,
        checkOut,
        nights,
        guests,
        totalAmount: pricing.total,
      });
    }
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  const today = toYMD(new Date());

  const maxGuestCount = Math.max((villa.capacity.baseGuests ?? 2) * 2, 10);

  return (
    <div className="w-full">
      {/* ── Check-in / Check-out ── */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {(["Check-in", "Check-out"] as const).map((label, i) => {
          const val = i === 0 ? checkIn : checkOut;
          return (
            <div key={label}>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                {label}
              </p>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 min-h-10">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span
                  className={`text-[12px] font-medium truncate ${val ? "text-slate-700" : "text-slate-400"}`}
                >
                  {val ? formatDisplay(val) : `Select ${label.toLowerCase()}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Guests selector ── */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
          Guests
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full appearance-none pl-8 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-[12px] font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#24a9e1]/30 focus:border-[#24a9e1]"
          >
            {Array.from({ length: maxGuestCount }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
                {n === villa.capacity.baseGuests ? " (base)" : ""}
                {n > villa.capacity.baseGuests
                  ? ` (+${villa.price.currency} ${villa.capacity.extraGuestFee}/night extra)`
                  : ""}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {guests > villa.capacity.baseGuests && (
          <p className="text-[10px] text-amber-600 mt-1.5 ml-0.5">
            Extra guest fee applies for {guests - villa.capacity.baseGuests}{" "}
            guest
            {guests - villa.capacity.baseGuests > 1 ? "s" : ""} above the base
            capacity of {villa.capacity.baseGuests}.
          </p>
        )}
      </div>

      {/* ── Calendar card ── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* Month nav */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <button
            onClick={prevMonth}
            className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="text-[13px] font-semibold text-slate-700">
            {MONTHS[viewMonth]} {viewYear}
          </p>
          <button
            onClick={nextMonth}
            className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Unified 7-col grid */}
        <div className="grid grid-cols-7 px-2 pt-1 pb-2 gap-0.5">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wide"
            >
              {d}
            </div>
          ))}
          {calendarDays.map((dateStr, i) => {
            if (!dateStr) return <div key={`empty-${i}`} className="h-10" />;

            const info = dateMap[dateStr];
            const isBooked = info?.status === "booked";
            const isAvailable = info?.status === "available";
            const isPast = dateStr < today;
            const isTooClose =
              !!checkIn &&
              !checkOut &&
              !!minStayEnd &&
              dateStr > checkIn &&
              dateStr < minStayEnd;
            const isDisabled = isBooked || isPast;
            const isCheckIn = dateStr === checkIn;
            const isCheckOut = dateStr === checkOut;
            const inRange = isInRange(dateStr);
            const isSelected = isCheckIn || isCheckOut;

            return (
              <button
                key={dateStr}
                disabled={isDisabled}
                onClick={() => handleDayClick(dateStr)}
                onMouseEnter={() => checkIn && !checkOut && setHovered(dateStr)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative flex flex-col items-center justify-center
                  rounded-lg h-10 w-full text-[12px] font-medium
                  transition-all duration-150
                  ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                  ${
                    isBooked
                      ? "bg-red-50 text-red-300 line-through"
                      : isPast
                        ? "text-slate-300"
                        : isSelected
                          ? "bg-[#0f1f2e] text-white shadow-sm"
                          : inRange
                            ? "bg-[#e8f3fa] text-[#24a9e1]"
                            : isTooClose
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                {new Date(dateStr + "T00:00:00").getDate()}
                {isAvailable && !isDisabled && !isSelected && !inRange && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex-wrap">
          {[
            { color: "bg-red-100 border border-red-200", label: "Booked" },
            { color: "bg-[#0f1f2e]", label: "Selected" },
            { color: "bg-[#e8f3fa]", label: "Range" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded ${color}`} />
              <span className="text-[10px] text-slate-500">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-white border border-slate-200 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-emerald-400 block" />
            </div>
            <span className="text-[10px] text-slate-500">Available</span>
          </div>
        </div>
      </div>

      {/* ── Validation error / info ── */}
      {error && (
        <div
          className={`flex items-start gap-2 mt-3 px-3 py-2.5 rounded-lg border ${
            error.includes("snapped")
              ? "bg-amber-50 border-amber-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={error.includes("snapped") ? "#d97706" : "#ef4444"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p
            className={`text-[11px] m-0 ${error.includes("snapped") ? "text-amber-700" : "text-red-600"}`}
          >
            {error}
          </p>
        </div>
      )}

      {/* ── Price breakdown + CTA ── */}
      {checkIn && checkOut && nights && pricing && (
        <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden">
          {/* Summary header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest m-0">
              Price breakdown
            </p>
            <p className="text-[13px] font-semibold text-slate-700 m-0 mt-0.5">
              {nights} night{nights > 1 ? "s" : ""} · {guests} guest
              {guests > 1 ? "s" : ""}
            </p>
          </div>

          {/* Line items */}
          <div className="px-4 py-3 bg-white space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-slate-500">
                {fmt(pricing.perNight, pricing.currency)} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="text-[12px] font-medium text-slate-700">
                {fmt(pricing.accommodation, pricing.currency)}
              </span>
            </div>

            {pricing.extraGuestCharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-500">
                  Extra guest fee ({guests - villa.capacity.baseGuests} ×{" "}
                  {nights} night{nights > 1 ? "s" : ""})
                </span>
                <span className="text-[12px] font-medium text-slate-700">
                  {fmt(pricing.extraGuestCharge, pricing.currency)}
                </span>
              </div>
            )}

            {pricing.cleaning > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-500">Cleaning fee</span>
                <span className="text-[12px] font-medium text-slate-700">
                  {fmt(pricing.cleaning, pricing.currency)}
                </span>
              </div>
            )}

            {pricing.tax > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-500">
                  Taxes ({villa.taxPercent}%)
                </span>
                <span className="text-[12px] font-medium text-slate-700">
                  {fmt(pricing.tax, pricing.currency)}
                </span>
              </div>
            )}

            <div className="pt-2.5 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-800">
                Total
              </span>
              <span className="text-[15px] font-bold text-[#0f1f2e]">
                {fmt(pricing.total, pricing.currency)}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4 bg-white">
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#24a9e1] hover:bg-[#1a95cc] text-white text-[12px] font-semibold tracking-[0.05em] uppercase transition-all duration-200 hover:-translate-y-px shadow-sm cursor-pointer"
            >
              Continue to booking
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
