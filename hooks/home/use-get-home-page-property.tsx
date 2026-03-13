import { baseUrl } from "@/constants";
import { HomePagePropertyResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

export function useGetHomePageProperty() {
  return useQuery({
    queryKey: ["home-page-property"],
    queryFn: async (): Promise<HomePagePropertyResponse> => {
      const res = await fetch(`${baseUrl}/property/home-page`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch home page properties");
      }

      return res.json();
    },
  });
}
