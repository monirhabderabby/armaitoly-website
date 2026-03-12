import Hero from "@/components/shared/hero/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Welcome To JOY Beach Villas"
        description="Celebrate The Good Life on Koh Phangan"
        imageSrc="/hero/hero.png"
      />
    </main>
  );
}
