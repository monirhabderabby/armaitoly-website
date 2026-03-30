import BookingCancelledClient from "../../booking-confirmed/[bookId]/_components/BookingCancelledClient";

const Page = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;
  return <BookingCancelledClient bookId={bookId} />;
};

export default Page;
