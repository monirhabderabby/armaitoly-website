import Hero from "@/components/shared/hero/hero";
import FaqContainer from "./_components/faq-container";

const Page = () => {
  return (
    <main className="min-h-screen">
      <Hero
        title="JOY Beach Villas"
        description="Frequently asked questions"
        imageSrc="/faq.jpg"
        isAvailabilityEnabled={false}
      />

      <FaqContainer />
    </main>
  );
};

export default Page;
