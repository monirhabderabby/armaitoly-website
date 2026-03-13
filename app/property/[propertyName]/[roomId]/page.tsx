import SinglePropertyContainer from "./_component/single-property-container";

interface PageProps {
  params: Promise<{ propertyName: string; roomId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { roomId } = await params;

  return (
    <main className="mt-20">
      <SinglePropertyContainer roomId={roomId} />
    </main>
  );
};

export default Page;
