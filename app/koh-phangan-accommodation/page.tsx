// app/accommodation/page.tsx
import Hero from "@/components/shared/hero/hero";
import { baseUrl } from "@/constants";
import { HomePagePropertyResponse } from "@/types/property";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AccommodationContainer from "./_components/accommodation-container";

async function prefetchAccommodationVillas(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: ["accommodation-property"],
    queryFn: async (): Promise<HomePagePropertyResponse> => {
      const res = await fetch(`${baseUrl}/property/accommodation`, {
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

export default async function Home() {
  const queryClient = new QueryClient();
  await prefetchAccommodationVillas(queryClient);

  return (
    <main className="min-h-screen">
      <Hero
        title="Make Lasting Memories at Joy Beach Villas"
        description="Experience a Most Joyful Holiday"
        imageSrc="/acomendation/acomendation.png"
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AccommodationContainer />
      </HydrationBoundary>
    </main>
  );
}
