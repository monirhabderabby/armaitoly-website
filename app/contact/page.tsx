import Hero from "@/components/shared/hero/hero";
import { siteInfo } from "@/constants";
import { Metadata } from "next";
import { ContactFormContainer } from "./_components/contact-form-container";

export const metadata: Metadata = {
  title: "Contact Us | Joy Beach Villas",
  description:
    "get in touch with us for inquiries and bookings. get details about our luxury beachfront villas, availability, and personalized experiences in koh phangan.",
};

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
