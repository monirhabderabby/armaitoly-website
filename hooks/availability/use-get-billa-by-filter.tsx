import { baseUrl } from "@/constants";
import { VillaByFilterResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

interface VillaFilterParams {
  checkIn: string;
  checkOut: string;
  numAdult: number;
  numChild: number;
  facilities?: string[]; // ← new
}

export function useGetVillaByFilter({
  checkIn,
  checkOut,
  numAdult,
  numChild,
  facilities = [],
}: VillaFilterParams) {
  return useQuery<VillaByFilterResponse>({
    queryKey: [
      "villas-by-filter",
      checkIn,
      checkOut,
      numAdult,
      numChild,
      facilities,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        numAdult: String(numAdult),
        numChild: String(numChild),
      });

      if (facilities.length > 0) {
        params.set("facilities", facilities.join(","));
      }

      const res = await fetch(`${baseUrl}/property/search?${params}`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch villas");
      }

      return res.json();
    },
    enabled: !!checkIn && !!checkOut,
  });
}
