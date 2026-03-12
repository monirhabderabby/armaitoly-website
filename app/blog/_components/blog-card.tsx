import { Blog } from "@/types/blogs";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

interface BlogCardProps {
  blog: Blog;
}

// Fallback image placeholder
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80";

export default function BlogCard({ blog }: BlogCardProps) {
  const router = useRouter();
  const formattedDate = (() => {
    try {
      const d = new Date(blog.createdAt);
      const day = d.getDate();
      const month = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear();
      return `${day} ${month} , ${year}`;
    } catch {
      return blog.createdAt;
    }
  })();

  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        overflow-hidden
        w-full
        md:w-85
        flex
        flex-col
        font-sans
      "
    >
      {/* Cover Image */}
      <div className="w-full relative h-42 overflow-hidden">
        <Image
          src={blog.coverImage || FALLBACK_IMAGE}
          alt={blog.title}
          fill
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* Card Body */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2.5">
        {/* Author Row */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Joy Beach Villas"
          />
          <div className="flex flex-col leading-none gap-0.75">
            <span className="text-[11.5px] font-semibold text-gray-800 leading-tight tracking-[-0.01em]">
              The Joy Beach Villas
            </span>
            <span className="text-[10.5px] text-gray-400 leading-tight">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-0" />

        {/* Title */}
        <p
          className="
            text-[12.5px]
            font-bold
            text-gray-900
            leading-[1.45]
            tracking-[-0.01em]
            line-clamp-3
          "
        >
          {blog.title}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push(`/blog/${blog._id}`)}
          className="
            mt-0.5
            w-full
            bg-[#3b9fe8]
            hover:bg-[#2d8fd8]
            active:bg-[#2080c8]
            text-white
            text-[11.5px]
            font-semibold
            tracking-[0.01em]
            rounded-lg
            py-2.25
            transition-colors
            duration-150
            cursor-pointer
            select-none
          "
        >
          View Full Blog
        </button>
      </div>
    </div>
  );
}
