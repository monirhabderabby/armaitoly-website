import { baseUrl } from "@/constants";
import { VillaByFilterResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

interface VillaFilterParams {
  checkIn: string;
  checkOut: string;
  numAdult: number;
  numChild: number;
}

export function useGetVillaByFilter({
  checkIn,
  checkOut,
  numAdult,
  numChild,
}: VillaFilterParams) {
  return useQuery<VillaByFilterResponse>({
    queryKey: ["villas-by-filter", checkIn, checkOut, numAdult, numChild],
    queryFn: async () => {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        numAdult: String(numAdult),
        numChild: String(numChild),
      });

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
