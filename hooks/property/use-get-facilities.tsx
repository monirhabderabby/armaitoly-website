import { baseUrl } from "@/constants";
import { useQuery } from "@tanstack/react-query";

interface Facility {
  code: string;
  label: string;
}

interface FacilitiesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Facility[];
}

export function useGetFacilities() {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: async (): Promise<FacilitiesResponse> => {
      const res = await fetch(`${baseUrl}/property/facilities`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch facilities");
      }

      return res.json();
    },
  });
}
