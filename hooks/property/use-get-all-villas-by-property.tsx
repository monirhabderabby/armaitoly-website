import { baseUrl } from "@/constants";
import { VillasByProperIdResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

interface Props {
  propId: string;
  page: number;
  limit: number;
}

export function useGetVillasByPropId({ propId, page }: Props) {
  return useQuery({
    queryKey: ["villas-by-propId", propId, page],
    queryFn: async (): Promise<VillasByProperIdResponse> => {
      const res = await fetch(
        `${baseUrl}/property/property-based-villa/${propId}?page=${page}`,
        { method: "GET" },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch villas");
      }

      return res.json();
    },
    enabled: !!propId,
  });
}
