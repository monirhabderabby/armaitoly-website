import FeatureSection from "@/components/shared/features-section";
import Hero from "@/components/shared/hero/hero";
import GivingBackEnvironment from "./_components/giving-back-environment";
import GuestReviews from "./_components/guest-reviews";
import HomePageVillaContainer from "./_components/home-page-villa-container";
import HowToGetHere from "./_components/how-to-get-here";
import SunsetVistaHero from "./_components/sunset-vista-hero";
import FaqContainer from "./faq/_components/faq-container";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Celebrate The Good Life on Koh Phangan"
        description="Your perfect home away from home"
        imageSrc="/hero/hero.png"
      />

      <HomePageVillaContainer />

      {/* Image on the RIGHT */}
      <FeatureSection
        eyebrow=""
        title="Your Ultimate Tropical Escape"
        em="in the JOY Beach Villas"
        imgSrc="/tropical.png"
        imgAlt="JOY Beach Villas tropical escape"
        cta="Our Eco-Friendly Initiatives"
        ctaHref="#eco"
        body={[
          "Depart from the hustle and bustle of the city. Make your escape to the breathtaking paradise of Koh Phangan and let the scenic Joy Beach Villas be your home away from home.",
          "Nestled right on the pristine beach, this sweet retreat presents spectacular views and serves as your gateway to the myriad of possibilities you can explore on the island. ",
          "Craving something tasty? Take a leisure walk to the scrumptious restaurants and cozy coffee shops. In need of some essentials? Nearby supermarkets and fruit shops are ready to serve you. Want to find your center? Join the yoga and meditation classes at our Yoga Shala.",
          "In our earnest desire to protect the environment, we are proud to share our eco-friendly initiatives. Our place is a plastic-free zone and organic shower gel and shampoo are provided. We have a recycling station and use solar panels to",
          "produce our own ‘green energy.’ ",
        ]}
      />

      {/* Image on the LEFT — just add reverse */}
      <FeatureSection
        reverse
        eyebrow=""
        title="A Welcoming Comfort on the Island"
        em="directly located at Hin Kong Beach"
        imgSrc="/iceland.jpg"
        imgAlt="Villa terrace at JOY Beach Villas"
        cta="Check The Villas"
        ctaHref="/koh-phangan-accommodation"
        body={[
          "Right on the beach, our 13 exclusive villas (including six brand new ones) are your home away from home, bringing you welcoming comfort. Built to be in harmony with nature, they offer a serene hideaway for you to be immersed in Koh Phangan’s relaxing vibes.",
          "One look at these impressive villas and you’ll see the perfect fusion of traditional Thai architecture and contemporary furnishing with stylish décors. Each unit includes a living room, a bedroom, a bathroom, and a kitchen – all fully equipped to ensure that you have all that you need for a long-term stay of seven days or more. ",
          "Our place is also surrounded by lush tropical gardens that provide a refreshing change of pace. You can have a peaceful retreat at our Yoga Shala. The pool is where you can have the rejuvenation you deserve. And should you wish to enjoy a nap, read a book, attend a virtual meeting, or call your friends and relatives to share your happiness, our spacious terraces can accommodate you.",
        ]}
      />

      <SunsetVistaHero
        title="Satisfaction, serenity, solace"
        description="All these wondrous things and more await you at the Joy Beach Villas."
        imgSrc="/sea.png"
        key={1}
        scrollView={false}
      />

      <GivingBackEnvironment />

      <FeatureSection
        eyebrow="Garden Pool Area"
        title="Indulge in the Garden Pool Area"
        em="in the JOY Beach Villas"
        imgSrc="/garden-pool.png"
        imgAlt="Garden Pool Area at JOY Beach Villas"
        cta="Check Availability"
        ctaHref="/availability"
        body={[
          "We’re delighted to share that you can now enjoy our newest Garden Pool Area, which is situated in the same location as our seven original Villas at Hin Kong Beach, Koh Phangan. This expansive space is the ideal place for you to take a breather and meditate as it features an amazing 90-square-meter pool, a sprawling 95-square-meter Yoga Shala, and the six brand new Villas at 56 square meters each.",
          "The six Garden Pool Villas could be utilized separately for groups of four to eight adults or collectively for up to 24 guests. Only a few steps away from the refreshing pool, each villa features one bedroom with a queen-sized bed and an en-suite bathroom, a living room with a sofa bed, and a fully equipped kitchen. All rooms have a private balcony.",
        ]}
      />

      <SunsetVistaHero
        title="Your place to relax your soul"
        description="Our vast yoga area can accommodate up to 35 guests and comes with all meditation or yoga class essentials. Moreover, it is surrounded by a magnificent garden and overlooks our scenic pool."
        imgSrc="/relax.png"
        key={2}
      />

      <GuestReviews />

      <SunsetVistaHero
        title="Your remarkable moments"
        description="If you are looking to stay for a week or more and share remarkable moments with those you hold dearest, any one of our 13 villas is the perfect place for you. Just to let you in on a little spoiler – you can never spend too much time celebrating the good life at Koh Phangan and the joyful experiences that we have to offer. Every moment spent here is pure bliss. "
        imgSrc="/remarkable.avif "
        key={3}
      />

      <HowToGetHere />

      <SunsetVistaHero
        title="Your perfect view"
        em="of the sunset."
        description="Behold the magnificent sunset best witnessed at Hin Kong Bay. Breathe
          the fresh air breezing through the beautiful tropical gardens. Dip
          your toes in the infinity pools."
        imgSrc="/sunset.avif"
        key={4}
        className="min-h-175"
      />

      <FaqContainer />
    </main>
  );
}
