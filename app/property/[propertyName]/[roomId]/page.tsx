import { AdditionalVillas } from "@/components/shared/AdditionalVillas";
import SinglePropertyContainer from "./_component/single-property-container";

interface PageProps {
  params: Promise<{ propertyName: string; roomId: string }>;
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { roomId } = await params;
  const { startDate, endDate } = await searchParams;

  return (
    <main className="mt-20">
      <SinglePropertyContainer
        roomId={roomId}
        startDate={startDate}
        endDate={endDate}
      />

      <AdditionalVillas currentRoomId={roomId} />
    </main>
  );
};

export default Page;
