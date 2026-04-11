"use client";

import { useGetSingleBlog } from "@/hooks/blogs/use-get-single-blog";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, Tag } from "lucide-react";
import Image from "next/image";

interface Props {
  blogId: string;
}

const SKELETON_WIDTHS = [90, 75, 85, 70, 95, 80, 72, 88];
// ── Skeleton ──────────────────────────────────────────────────────────────────

function BlogSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pb-20">
      {/* Cover */}
      <div className="h-105 w-full rounded-2xl bg-gray-200" />

      {/* Meta */}
      <div className="mx-auto max-w-3xl space-y-4 px-4">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-gray-200" />
          <div className="h-5 w-20 rounded-full bg-gray-200" />
        </div>
        <div className="h-10 w-3/4 rounded-lg bg-gray-200" />
        <div className="h-6 w-1/2 rounded-lg bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-200" />
          <div className="space-y-1">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-3 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl space-y-3 px-4">
        {SKELETON_WIDTHS.map((width, i) => (
          <div
            key={i}
            className="h-4 rounded bg-gray-200"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Error ─────────────────────────────────────────────────────────────────────

function BlogError({ message }: { message: string }) {
  return (
    <div className="flex min-h-96 my-36 flex-col items-center justify-center gap-5 text-center px-4">
      {/* Icon */}
      <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <p className="text-[0.9375rem] font-semibold text-gray-900">
          Could not load this post
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Something went wrong while fetching the blog. This is usually
          temporary — try refreshing the page.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Try again
        </button>
        <button
          onClick={() => history.back()}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 px-3 py-1.5 transition-colors"
        >
          Go back
        </button>
      </div>

      {/* Error detail */}
      <p className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md font-mono">
        {message}
      </p>
    </div>
  );
}

function calcReadingTime(html: string): number {
  return Math.max(
    1,
    Math.ceil(html.replace(/<[^>]*>/g, "").split(/\s+/).length / 200),
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SingleBlogContainer({ blogId }: Props) {
  const { data, isLoading, isError, error } = useGetSingleBlog({ id: blogId });

  if (isLoading) return <BlogSkeleton />;
  if (isError)
    return <BlogError message={error?.message ?? "Something went wrong"} />;
  if (!data?.data) return null;

  const blog = data.data;
  const author = blog.createdBy;
  const authorName = `${author.firstName} ${author.lastName}`;
  const publishedDate = format(new Date(blog.createdAt), "MMMM d, yyyy");
  const readingTime = calcReadingTime(blog.content);

  return (
    <article className="min-h-screen mt-20 bg-white pb-24">
      {/* ── Cover image ─────────────────────────────────────── */}
      {blog.coverImage && (
        <div className="relative h-105 w-full overflow-hidden md:h-130">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay so title can sit on top if needed */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      {/* ── Content wrapper ─────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* ── Title ─────────────────────────────────────────── */}
        <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-2xl md:text-4xl">
          {blog.title}
        </h1>

        {/* ── Meta row ──────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
          {blog.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              {blog.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" />
            {publishedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" />
            {readingTime} min read
          </span>
        </div>

        {/* ── Author ────────────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3 border-y border-gray-100 py-5">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-gray-200">
            {author.profileImage ? (
              <Image
                src={author.profileImage}
                alt={authorName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-lg font-semibold text-gray-500">
                {author.firstName[0]}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-400">{author.email}</p>
          </div>

          {/* Draft badge */}
          {!blog.isPublished && (
            <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Draft
            </span>
          )}
        </div>

        {/* ── Rich text content ──────────────────────────────── */}
        <div
          className="prose prose-sm max-w-none text-gray-500 my-3 
    prose-ul:list-disc prose-ul:pl-5 
    prose-ol:list-decimal prose-ol:pl-5
    prose-li:my-0.5 
    [&_ul]:list-disc [&_ul]:pl-5 
    [&_ol]:list-decimal [&_ol]:pl-5
    [&_li]:my-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="border-gray-100 border-t" />
        {/* ── Tags ──────────────────────────────────────────── */}
        {blog.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-[#23A4D2]/10 px-3 py-1 text-xs font-medium text-[#23A4D2]"
              >
                <Tag className="size-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
