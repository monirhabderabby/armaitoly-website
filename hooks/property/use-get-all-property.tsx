import { baseUrl } from "@/constants";
import { PropertiesResponse, Property } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

const PROPERTY_IMAGES: Record<string, string> = {
  "Joy Beach Villas": "/boat-in-stand.avif",
  "The View Villa": "/view-villa.png",
};

export function useGetAllProperties() {
  return useQuery({
    queryKey: ["all-properties"],
    queryFn: async (): Promise<PropertiesResponse> => {
      const res = await fetch(`${baseUrl}/property/summary`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch properties");
      }

      const data: PropertiesResponse = await res.json();

      const mapped = data.data.map((property: Property) => ({
        ...property,
        ...(PROPERTY_IMAGES[property.name] && {
          image: PROPERTY_IMAGES[property.name],
        }),
      }));

      return { ...data, data: mapped };
    },
  });
}
