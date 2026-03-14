// app/[propertyName]/[roomId]/page.tsx

import AvailabilityEntry from "./_components/availability-entry";

interface PageProps {
  params: Promise<{ propertyName: string; roomId: string }>;
  searchParams: Promise<{
    propId?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { roomId } = await params;
  const { propId, startDate, endDate } = await searchParams;

  const today = new Date();
  const fmt = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

  const lastDayNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0,
  );

  return (
    <div className="py-20 md:py-36 max-w-250 mx-auto px-4">
      <AvailabilityEntry
        propId={propId ?? ""}
        roomId={roomId}
        startDate={startDate ?? fmt(today)}
        endDate={endDate ?? fmt(lastDayNextMonth)}
      />
    </div>
  );
};

export default Page;
