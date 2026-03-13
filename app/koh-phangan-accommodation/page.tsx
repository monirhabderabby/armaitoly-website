import Hero from "@/components/shared/hero/hero";
import AccommodationContainer from "./_components/accommodation-container";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Make Lasting Memories at Joy Beach Villas"
        description="Experience a Most Joyful Holiday"
        imageSrc="/acomendation/acomendation.png"
      />

      <AccommodationContainer />
    </main>
  );
}
