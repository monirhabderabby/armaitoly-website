import AllVillasContainer from "./_components/all-villas-container";

interface PageProps {
  params: Promise<{ propertyId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { propertyId } = await params;
  return (
    <div className="py-20 bg-[#f9fbfc]">
      <AllVillasContainer propId={propertyId} />
    </div>
  );
};

export default page;
