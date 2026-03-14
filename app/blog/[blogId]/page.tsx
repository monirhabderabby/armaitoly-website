import SingleBlogContainer from "./_components/blog-container";

interface Props {
  params: Promise<{ blogId: string }>;
}

const Page = async ({ params }: Props) => {
  const { blogId } = await params;

  return <SingleBlogContainer blogId={blogId} />;
};

export default Page;
