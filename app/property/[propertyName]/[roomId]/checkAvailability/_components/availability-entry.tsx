// components/availability/availability-entry.tsx
"use client";

import { OnBookingSubmitProps } from "./availability-calendar";
import AvailabilityContainer from "./availability-container";

interface Props {
  propId: string;
  roomId: string;
  startDate: string;
  endDate: string;
}

export default function AvailabilityEntry({
  propId,
  roomId,
  startDate,
  endDate,
}: Props) {
  const handleNext = (data: OnBookingSubmitProps) => {
    // const params = new URLSearchParams({
    //   checkIn: data,
    //   checkOut,
    //   nights: String(nights),
    //   propId,
    // });
    // router.push(`/booking/${roomId}?${params.toString()}`);

    console.log(data);
  };

  return (
    <AvailabilityContainer
      propId={propId}
      roomId={roomId}
      startDate={startDate}
      endDate={endDate}
      onNext={handleNext}
    />
  );
}
