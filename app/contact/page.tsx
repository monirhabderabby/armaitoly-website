import Hero from "@/components/shared/hero/hero";
import { siteInfo } from "@/constants";
import { ContactFormContainer } from "./_components/contact-form-container";

const Page = () => {
  return (
    <main className="min-h-screen">
      <Hero
        title="Contact JOY Villas"
        description="Wee look forward to welcoming you!"
        imageSrc="/contactCover.png"
        isAvailabilityEnabled={false}
      />

      <ContactFormContainer
        imageSrc="/villa.png"
        phone={siteInfo.phone}
        facebookUrl={siteInfo.facebook}
        instagramUrl={siteInfo.instagram}
        imageAlt={siteInfo.name}
      />
    </main>
  );
};

export default Page;
