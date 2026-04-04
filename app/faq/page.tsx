import DynamicTitle from "@/components/shared/dynamic-title";
import Hero from "@/components/shared/hero/hero";
import { Metadata } from "next";
import FaqContainer from "./_components/faq-container";

export const metadata: Metadata = {
  title: "FAQ | Joy Beach Villas",
  description:
    "learn more about the great experiences you can have with us by learning more here.",
};

const Page = () => {
  return (
    <main className="min-h-screen">
      <DynamicTitle pageKey="faq" />
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
