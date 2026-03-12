import FeatureSection from "@/components/shared/features-section";
import Hero from "@/components/shared/hero/hero";
import HowToGetHere from "./_components/how-to-get-here";
import SunsetVistaHero from "./_components/sunset-vista-hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Welcome To JOY Beach Villas"
        description="Celebrate The Good Life on Koh Phangan"
        imageSrc="/hero/hero.png"
      />

      <FeatureSection
        eyebrow="Garden Pool Area"
        title="Indulge in the Garden Pool Area"
        em="in the JOY Beach Villas"
        imgSrc="/garden-pool.png"
        imgAlt="Garden Pool Area at JOY Beach Villas"
        cta="Check Availability"
        ctaHref="/availability"
        body={[
          "We're delighted to share that you can now enjoy our newest Garden Pool Area, which is situated in the same location as our seven original Villas at Hin Kong Beach, Koh Phangan. This expansive space is the ideal place for you to take a breather and meditate as it features an amazing 90-square-meter pool, a sprawling 95-square-meter Yoga Shala, and the six brand new Villas at 56 square meters each.",
          "The six Garden Pool Villas could be utilized separately for groups of four to eight adults or collectively for up to 24 guests. Only a few steps away from the refreshing pool, each villa features one bedroom with a queen-sized bed and an en-suite bathroom, a living room with a sofa bed, and a fully equipped kitchen. All rooms have a private balcony.",
        ]}
      />

      <SunsetVistaHero
        title="Your place to relax your soul"
        description="Our vast yoga area can accommodate up to 35 guests and comes with all meditation or yoga class essentials. Moreover, it is surrounded by a magnificent garden and overlooks our scenic pool. "
        imgSrc="/relax.png"
        key={1}
      />

      <SunsetVistaHero
        title="Your remarkable moments"
        description="If you are looking to stay for a week or more and share remarkable moments with those you hold dearest, any one of our 13 villas is the perfect place for you. Just to let you in on a little spoiler – you can never spend too much time celebrating the good life at Koh Phangan and the joyful experiences that we have to offer. Every moment spent here is pure bliss. "
        imgSrc="/sunset.png"
        key={2}
      />

      <HowToGetHere />

      <SunsetVistaHero
        title="Your perfect view"
        em="of the sunset."
        description="Behold the magnificent sunset best witnessed at Hin Kong Bay. Breathe
          the fresh air breezing through the beautiful tropical gardens. Dip
          your toes in the infinity pools."
        imgSrc="/sunset.png"
        key={3}
      />
    </main>
  );
}
