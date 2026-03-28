"use client";

import VillaCard from "@/components/shared/cards/villa-card";
import AvailabilityChecker, {
  AvailabilityCheckData,
} from "@/components/shared/hero/availabilityCheckerHero";
import VillaCardSkeleton from "@/components/shared/skeleton/villa-card-skleton";

import { useGetVillaByFilter } from "@/hooks/availability/use-get-billa-by-filter";
import { useRouter, useSearchParams } from "next/navigation";

function ErrorState({ message }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h3 className="text-xl font-semibold text-red-500">
        Something went wrong
      </h3>
      <p className="text-muted-foreground mt-2">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-24 flex flex-col justify-center items-center">
      <p className="text-muted-foreground mt-2">NO Room Found</p>
    </div>
  );
}

const formatDateForApi = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AvailabilityContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const defaultFacilities = searchParams.get("facilities")
    ? searchParams.get("facilities")!.split(",")
    : [];

  // Pass facilities to useGetVillaByFilter
  const facilitiesParam = searchParams.get("facilities")
    ? searchParams.get("facilities")!.split(",")
    : [];

  const onAvailabilityCheck = (data: AvailabilityCheckData) => {
    const params = new URLSearchParams({
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      adults: data.adults.toString(),
      children: data.children.toString(),
      nights: data.nights.toString(),
      totalGuests: data.totalGuests.toString(),
    });
    if (data.facilities.length > 0) {
      params.set("facilities", data.facilities.join(","));
    }
    router.replace(`/availability?${params.toString()}`);
  };

  // ── format dates for the API (YYYY-MM-DD) ──────────────────────────────
  const checkIn = formatDateForApi(searchParams.get("checkIn"));
  const checkOut = formatDateForApi(searchParams.get("checkOut"));

  const { isLoading, data, isError, error, refetch } = useGetVillaByFilter({
    checkIn,
    checkOut,
    numAdult: defaultAdults,
    numChild: defaultChildren,
    facilities: facilitiesParam,
  });

  let content;
  const hasParams = checkIn && checkOut;

  if (!hasParams) {
    content = (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-700">
          Find your perfect stay
        </h3>
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Select your check-in, check-out dates and number of guests above to
          browse available villas.
        </p>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="grid gap-5">
        <VillaCardSkeleton />
        <VillaCardSkeleton />
        <VillaCardSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorState
        message={error?.message ?? "Something went wrong. Please try again."}
        onRetry={refetch}
      />
    );
  } else if (data && data.data.length === 0) {
    content = <EmptyState />;
  } else if (data && data.data.length > 0) {
    content = (
      <div className="grid gap-10">
        {data.data.map((villa, idx) => (
          <VillaCard key={villa.roomId} data={villa} reversed={idx % 2 !== 0} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-250 min-h-[50vh] mx-auto py-10 md:py-16 px-4">
      <div className="mb-10">
        <AvailabilityChecker
          onCheck={onAvailabilityCheck}
          defaultCheckIn={defaultCheckIn}
          defaultCheckOut={defaultCheckOut}
          defaultAdults={defaultAdults}
          defaultChildren={defaultChildren}
          variant="solid"
          available={data && data?.data?.length > 0 ? true : false}
          loading={isLoading}
          defaultFacilities={defaultFacilities}
        />
      </div>

      {content}
    </div>
  );
};

export default AvailabilityContainer;
