"use client";

import PropertyCard from "@/components/shared/cards/property-card";
import { useGetAllProperties } from "@/hooks/property/use-get-all-property";

// ── skeleton ───────────────────────────────────────────────────────────────
function PropertyCardSkeleton({ reversed = false }: { reversed?: boolean }) {
  return (
    <div
      className={`
        grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden
        border border-slate-100 bg-white w-full max-w-4xl mx-auto
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        ${reversed ? "lg:[direction:rtl]" : ""}
      `}
    >
      {/* image skeleton */}
      <div className="min-h-52 lg:min-h-0 bg-slate-100 animate-pulse [direction:ltr]" />

      {/* content skeleton */}
      <div className="flex flex-col [direction:ltr] bg-white">
        {/* header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 space-y-2.5">
          <div className="h-3 w-28 bg-slate-100 rounded-full animate-pulse" />
          <div className="h-4 w-40 bg-slate-100 rounded-full animate-pulse" />
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-slate-100 rounded-md animate-pulse" />
            <div className="h-5 w-14 bg-slate-100 rounded-md animate-pulse" />
          </div>
        </div>

        {/* cta skeleton */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-2.5 w-16 bg-slate-100 rounded-full animate-pulse" />
            <div className="h-3.5 w-12 bg-slate-100 rounded-full animate-pulse" />
          </div>
          <div className="h-8 w-28 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ── error state ────────────────────────────────────────────────────────────
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="max-w-sm mx-auto text-center py-12">
      <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
        <svg
          width="18"
          height="18"
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
      <h3 className="text-[0.9rem] font-semibold text-slate-700 mb-1">
        Failed to load properties
      </h3>
      <p className="text-[0.8rem] text-slate-400 mb-5 leading-relaxed">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.05em] uppercase px-4 py-2 rounded-lg bg-[#0f1f2e] text-white hover:bg-[#1a3550] transition-all duration-200 cursor-pointer"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
        Try again
      </button>
    </div>
  );
}

// ── empty state ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="max-w-sm mx-auto text-center py-12">
      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
      <h3 className="text-[0.9rem] font-semibold text-slate-700 mb-1">
        No properties found
      </h3>
      <p className="text-[0.8rem] text-slate-400 leading-relaxed">
        There are no available properties at the moment. Please check back
        later.
      </p>
    </div>
  );
}

const AvailabilityContainer = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // // Parse existing params to pre-fill the form
  // const defaultCheckIn = searchParams.get("checkIn")
  //   ? new Date(searchParams.get("checkIn")!)
  //   : null;
  // const defaultCheckOut = searchParams.get("checkOut")
  //   ? new Date(searchParams.get("checkOut")!)
  //   : null;
  // const defaultAdults = searchParams.get("adults")
  //   ? Number(searchParams.get("adults"))
  //   : 2;
  // const defaultChildren = searchParams.get("children")
  //   ? Number(searchParams.get("children"))
  //   : 0;

  // const onAvailabilityCheck = (data: AvailabilityCheckData) => {
  //   const params = new URLSearchParams({
  //     checkIn: data.checkIn.toISOString(),
  //     checkOut: data.checkOut.toISOString(),
  //     adults: data.adults.toString(),
  //     children: data.children.toString(),
  //     nights: data.nights.toString(),
  //     totalGuests: data.totalGuests.toString(),
  //   });

  //   // Update URL with new selection without full navigation
  //   router.replace(`/availability?${params.toString()}`);
  // };

  const { isLoading, data, isError, error, refetch } = useGetAllProperties();

  let content;

  if (isLoading) {
    content = (
      <div className="grid gap-5">
        <PropertyCardSkeleton />
        <PropertyCardSkeleton reversed />
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
    const properties = data.data;
    content = (
      <div className="grid gap-5">
        {properties.map((item, i) => (
          <PropertyCard data={item} key={item.propId} reversed={i === 1} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-250 mx-auto my-20 px-4">
      {/* <AvailabilityChecker
        onCheck={onAvailabilityCheck}
        defaultCheckIn={defaultCheckIn}
        defaultCheckOut={defaultCheckOut}
        defaultAdults={defaultAdults}
        defaultChildren={defaultChildren}
        variant="solid"
      /> */}

      {content}
    </div>
  );
};

export default AvailabilityContainer;
