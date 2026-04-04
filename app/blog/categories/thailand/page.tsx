import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Blog Articles",
  description:
    "discover the best of thailand, from stunning island hotels to picturesque beaches. explore the vibrant culture and breathtaking landscapes of ko pha-ngan.",
};
export default function Page() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      {/* Empty state */}
      <div className="flex flex-col items-center text-center px-4 pb-24">
        <h2 className="font-serif text-4xl italic font-normal text-gray-900 mb-4">
          Posts coming soon
        </h2>
        <p className="text-sm font-light text-gray-500 max-w-xs leading-relaxed mb-10">
          Explore other categories in this blog or check back later.
        </p>
      </div>
    </div>
  );
}
