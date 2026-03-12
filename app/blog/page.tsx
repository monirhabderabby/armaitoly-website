import Hero from "@/components/shared/hero/hero";
import BlogContainer from "./_components/blog-container";

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
