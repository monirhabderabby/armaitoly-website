import BookingConfirmedClient from "../../booking-cancelled/[bookId]/_components/BookingConfirmedClient";

const Page = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;
  return <BookingConfirmedClient bookId={bookId} />;
};

export default Page;
