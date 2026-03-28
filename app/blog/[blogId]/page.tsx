import { baseUrl } from "@/constants";
import { Metadata } from "next";
import SingleBlogContainer from "./_components/blog-container";

interface Props {
  params: Promise<{ blogId: string }>;
}

// ── Fetch helper (reuse the same call Next.js will deduplicate) ───────────────
async function getBlog(blogId: string) {
  try {
    const res = await fetch(`${baseUrl}/blog/${blogId}`, {
      // Cache for 60 s, revalidate in background (ISR-style)
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await getBlog(blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: blog.metaInfo?.title || blog.title,
    description: blog.metaInfo?.description || "",

    // Open Graph (Facebook / LinkedIn previews)
    openGraph: {
      title: blog.metaInfo?.title || blog.title,
      description: blog.metaInfo?.description || "",
      ...(blog.coverImage && { images: [{ url: blog.coverImage }] }),
      type: "article",
      publishedTime: blog.createdAt,
    },

    // Twitter / X card
    twitter: {
      card: "summary_large_image",
      title: blog.metaInfo?.title || blog.title,
      description: blog.metaInfo?.description || "",
      ...(blog.coverImage && { images: [blog.coverImage] }),
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Page = async ({ params }: Props) => {
  const { blogId } = await params;
  return <SingleBlogContainer blogId={blogId} />;
};

export default Page;
