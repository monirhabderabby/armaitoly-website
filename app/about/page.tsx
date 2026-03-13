import FeatureSection from "@/components/shared/features-section";
import Hero from "@/components/shared/hero/hero";
import WhereToGo from "./_components/where-to-go";

const Page = () => {
  return (
    <div>
      <Hero
        title="About JOY VILLAS"
        description="the perfect home away from home"
        imageSrc="/acomendation/acomendation.png"
        isAvailabilityEnabled={false}
      />

      <FeatureSection
        eyebrow=""
        title="Who are we?"
        em="Get to know the Team!"
        imgSrc="/tropical.png"
        imgAlt="JOY Beach Villas tropical escape"
        cta="Check Availability"
        ctaHref="/availability"
        body={[
          "Markus, the owner of Joy Beach Villas, passionately turned existing beach bungalows into today’s incredibly tasteful and comfortable Beach Villas.",
          "Inspired by Hin Kong’s Bay scenery and surroundings, Joy Beach Villas is the perfect destination for those who want to live a unique luxury cast-away experience.",
          "The coral reef allows an incredible mirror effect for the best sunset pictures (or memories) ever. The shallow water level will give you the opportunity of unforgettable walks on the beach.",
        ]}
      />

      <FeatureSection
        reverse
        eyebrow=""
        title="Discover Koh Phangan"
        em="Making your stay unforgettable"
        imgSrc="/boat.avif"
        imgAlt="Koh Phangan Boat.jpg"
        body={[
          "Here at Joy Beach Villas, we thrive to make your stay with us a life-time experience.Our multilingual representatives are here to assist you with:",
          "➜ Renting motorbikes, cars, and bikes",
          "➜ Scheduling yoga or cooking classes",
          "➜ Ang Thong National Marine Park excursions",
          "➜ diving sessions",
          "➜ Private massage moment in the comfort of your own villa",
          "➜ Flight, ferries, taxi, or transportation tickets",
          "➜ Romantic or family evening at restaurants and bars!",
        ]}
      />

      <WhereToGo />
    </div>
  );
};

export default Page;
