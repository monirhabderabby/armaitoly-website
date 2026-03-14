interface PageProps {
  params: Promise<{ propertyId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { propertyId } = await params;
  return <div className="my-20">page: {propertyId}</div>;
};

export default page;
