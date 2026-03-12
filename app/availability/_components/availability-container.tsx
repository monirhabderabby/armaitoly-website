"use client";

import AvailabilityChecker, {
  AvailabilityCheckData,
} from "@/components/shared/hero/availabilityCheckerHero";
import { useRouter, useSearchParams } from "next/navigation";

const AvailabilityContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse existing params to pre-fill the form
  const defaultCheckIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn")!)
    : null;
  const defaultCheckOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut")!)
    : null;
  const defaultAdults = searchParams.get("adults")
    ? Number(searchParams.get("adults"))
    : 2;
  const defaultChildren = searchParams.get("children")
    ? Number(searchParams.get("children"))
    : 0;

  const onAvailabilityCheck = (data: AvailabilityCheckData) => {
    const params = new URLSearchParams({
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      adults: data.adults.toString(),
      children: data.children.toString(),
      nights: data.nights.toString(),
      totalGuests: data.totalGuests.toString(),
    });

    // Update URL with new selection without full navigation
    router.replace(`/availability?${params.toString()}`);
  };

  return (
    <div>
      <AvailabilityChecker
        onCheck={onAvailabilityCheck}
        defaultCheckIn={defaultCheckIn}
        defaultCheckOut={defaultCheckOut}
        defaultAdults={defaultAdults}
        defaultChildren={defaultChildren}
        variant="solid"
      />
    </div>
  );
};

export default AvailabilityContainer;
