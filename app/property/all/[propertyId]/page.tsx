import AllVillasContainer from "./_components/all-villas-container";

interface PageProps {
  params: Promise<{ propertyId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { propertyId } = await params;
  return (
    <div className="py-0 md:py-20 bg-[#f9fbfc] px-4">
      <AllVillasContainer propId={propertyId} />
    </div>
  );
};

export default page;
