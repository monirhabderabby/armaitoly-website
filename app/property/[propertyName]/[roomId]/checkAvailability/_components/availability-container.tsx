// app/[propertyName]/[roomId]/_components/availability-container.tsx
"use client";

import { useGetAvailability } from "@/hooks/availability/use-get-availablity";
import { Villa } from "@/types/property";
import AvailabilityCalendar, {
  OnBookingSubmitProps,
} from "./availability-calendar";

// const MOCK_DATES: AvailabilityDate[] = [
//   {
//     date: "2026-03-14",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-15",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-16",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-17",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-18",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-19",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-20",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-21",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-22",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-23",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-24",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-25",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-26",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-27",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-28",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-29",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-30",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-03-31",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-01",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-02",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-03",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-04",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-05",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-06",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-07",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-08",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-09",
//     status: "booked",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-10",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-11",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-12",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
//   {
//     date: "2026-04-13",
//     status: "available",
//     price: 6400,
//     currency: "THB",
//     minimumStay: 4,
//   },
// ];

// const MOCK_MINIMUM_STAY = [
//   { months: "March", nights: 4 },
//   { months: "April", nights: 3 },
// ];

export interface AvailabilityContainerProps {
  propId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  onNext: (data: OnBookingSubmitProps) => void;
  room: Villa;
}

function CalendarSkeleton() {
  return (
    <div className="w-full space-y-3 animate-pulse">
      <div className="grid grid-cols-2 gap-3">
        <div className="h-10 rounded-lg bg-slate-100" />
        <div className="h-10 rounded-lg bg-slate-100" />
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="h-12 bg-slate-100 border-b border-slate-200" />
        <div className="grid grid-cols-7 gap-0.5 p-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AvailabilityContainer({
  roomId,
  startDate,
  endDate,
  onNext,
  room,
}: AvailabilityContainerProps) {
  const {
    data: availabilityData,
    isLoading: availabilityLoading,
    isError: availabilityError,
    error: availabilityErr,
    refetch,
  } = useGetAvailability({ roomId, startDate, endDate });

  // const { data: propertyData } = useGetSingleProperty(roomId);

  // const room = propertyData?.data;

  if (!room) return;
  const minimumStay = room?.minimumStay ?? [];

  if (availabilityLoading) return <CalendarSkeleton />;

  if (availabilityError) {
    return (
      <div className="text-center py-8">
        <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-slate-700 mb-1">
          Could not load availability
        </p>
        <p className="text-[11px] text-slate-400 mb-4">
          {availabilityErr?.message}
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-4 py-2 rounded-lg bg-[#0f1f2e] text-white hover:bg-[#1a3550] transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!availabilityData?.data?.dates?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-[13px] font-semibold text-slate-700">
          No availability data
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          No dates found for this period.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-primary bg-primary/10 rounded-full mb-4">
          Reserve Your Stay
        </span>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Book <span className="text-primary">{room.name}</span>
        </h1>

        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto">
          Select your dates and secure your Italian escape. Best rates
          guaranteed when booking directly.
        </p>
      </div>
      <AvailabilityCalendar
        dates={availabilityData.data.dates} // availabilityData.data.dates
        minimumStay={minimumStay} // minimumStay
        onSelect={onNext}
        villa={room!}
      />
    </>
  );
}
