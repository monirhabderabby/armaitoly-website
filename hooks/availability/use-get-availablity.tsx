// hooks/property/use-get-availability.ts
import { baseUrl } from "@/constants";
import { AvailabilityResponse } from "@/types/availablity";

import { useQuery } from "@tanstack/react-query";

interface UseGetAvailabilityParams {
  roomId: string;
  startDate: string; // YYYYMMDD
  endDate: string; // YYYYMMDD
}

export function useGetAvailability({
  roomId,
  startDate,
  endDate,
}: UseGetAvailabilityParams) {
  return useQuery({
    queryKey: ["availability", roomId, startDate, endDate],
    queryFn: async (): Promise<AvailabilityResponse> => {
      const res = await fetch(
        `${baseUrl}/property/availability/${roomId}?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch availability");
      }

      return res.json();
    },
    enabled: !!roomId && !!startDate && !!endDate,
  });
}
