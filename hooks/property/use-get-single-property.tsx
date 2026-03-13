import { baseUrl } from "@/constants";
import { SinglePropertyResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleProperty(villaId: string) {
  return useQuery({
    queryKey: ["single-property", villaId],
    queryFn: async (): Promise<SinglePropertyResponse> => {
      const res = await fetch(
        `${baseUrl}/property/single-villa-details/${villaId}`,
        {
          method: "GET",
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch single villa details");
      }

      return res.json();
    },
    enabled: !!villaId,
  });
}
