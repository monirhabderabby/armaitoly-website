import Hero from "@/components/shared/hero/hero";
import { Metadata } from "next";
import BlogContainer from "./_components/blog-container";

export const metadata: Metadata = {
  title: "Blog Articles | Joy Beach Villas",
  description:
    "read our blog to discover news, events, and tips about travelling to koh phangan and thailand.",
};

const Page = () => {
  return (
    <div>
      <Hero
        title="Blogs of JOY Beach Villas"
        description="Wee look forward to welcoming you!"
        imageSrc="/blog.png"
        isAvailabilityEnabled={false}
      />

      <BlogContainer />
    </div>
  );
};

export default Page;
