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
        imgSrc="/staff.avif"
        imgAlt="S__25649166.jpg"
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

      <FeatureSection
        title="How to get here"
        em="From Bangkok and the world"
        imgSrc="/ferry.avif"
        imgAlt="AdobeStock_288288181.jpg"
        cta="Check Villas"
        ctaHref="/koh-phangan-accommodation"
        body={[
          "Koh Phangan does not have an airport but does have two nearby recommended ones.",
          "✈️  Surat Thani’s Airport is serviced daily by multiple airlines from Bangkok Suvarnabhumi, Don Muang Airports, Phuket International Airport or Chiang Mai International Airport. Getting from Surat Thani Airport to Koh Phangan usually takes about 3  to5 hours (bus + ferry).",
          "✈️  Samui Airport is serviced daily from Bangkok Suvarnabhumi by Bangkok Airways and Thai Airways, and from Phuket International Airport by Bangkok Airways. Getting to Koh Phangan from Koh Samui takes about 30 minutes to 1 hour (taxi + ferry).",
        ]}
        accent="bg-[#F9EDE280]"
      />

      <FeatureSection
        reverse
        title="Easiest way"
        em="to JOY Beach Villas"
        imgSrc="/sunset-boat.png"
        imgAlt="Ferry arriving at Koh Phangan"
        cta="Check Availability"
        ctaHref="/availability"
        body={[
          "✈️ The easiest and fastest way to reach Koh Phangan is to fly to Koh Samui airport (USM). From here, it is a quick 20 to40 minute ferry ride to Koh Phangan.  Ferries run from morning until early evening.  Please note that the last airport pickup is 16:00 (4pm) so be sure to arrive before then.",
          "✈️ Another option is to fly to Surat Thani airport (URT) and then take a 3 to5 hour bus + boat to Koh Phangan. The mainland is linked by several boats and ferries per day, all departing from Surat Thani’s Ban Don Port or Donsak port mostly operated by Lomprayah and Raja Ferry companies. Please note that the last airport pickup is about 15:30 (3.30pm) so be sure to arrive before this time.",
        ]}
        accent="bg-[#24A9E11A]"
      />

      <FeatureSection
        title="Our Service"
        em="you can relax while getting here"
        imgSrc="/boat-in-stand.avif"
        imgAlt="Image by Raissa Lara Lütolf (-Fasel)"
        cta="Check Villas"
        ctaHref="/koh-phangan-accommodation"
        body={[
          "You may also take a bus or train from Bangkok or other locations around Thailand. Should you need assistance in booking transportation, please contact our friendly team as we are here to help in any way we can.  We can provide airport pickups, buses and ferries from almost anywhere in Thailand. Contact reception@joybeachvillas.com for pricing and timetables.",
          "We can also arrange a pickup from Thong Sala Pier. Please contact us at least 24 hours in advance with your arrival details and we can organize this for you.",
        ]}
        accent="bg-[#F9EDE280]"
      />
    </div>
  );
};

export default Page;
