import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koh Phangan Insights and Guides",
  description:
    "discover the best of koh phangan with our in-depth blog articles, featuring travel tips, island adventures, and the ultimate guide to joy beach villas.",
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
