import { baseUrl } from "@/constants";
import { FAQResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetAllFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async (): Promise<FAQResponse> => {
      const res = await fetch(`${baseUrl}/faq`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to fetch FAQs");
      }

      return res.json();
    },
  });
}
