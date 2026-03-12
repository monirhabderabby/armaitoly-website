"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllBlogs } from "@/hooks/blogs/use-get-all-blogs";
import { useState } from "react";
import BlogCard from "./blog-card";

const LIMIT = 3;

const BlogContainer = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetAllBlogs({
    page,
    limit: LIMIT,
  });

  const blogs = data?.data || [];
  const meta = data?.meta;

  const start = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const end = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;

  return (
    <div className="max-w-325 mx-auto px-4 py-16">
      {/* BLOG GRID */}
      {isLoading && <LoadingState />}

      {isError && <ErrorState message={error.message} />}

      {!isLoading && !isError && blogs.length === 0 && <EmptyState />}

      {!isLoading && !isError && blogs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4 ">
            {/* Result text */}
            <p className="text-sm text-muted-foreground">
              Showing {start} to {end} of {meta?.total} results
            </p>

            {/* Pagination */}
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: meta?.pages || 0 }).map((_, index) => {
                    const p = index + 1;

                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          isActive={p === page}
                          onClick={() => setPage(p)}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, meta?.pages || 1))
                      }
                      className={
                        page === meta?.pages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogContainer;

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h3 className="text-xl font-semibold">No blogs found</h3>
      <p className="text-muted-foreground mt-2">
        There are currently no blog posts available.
      </p>
    </div>
  );
};

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h3 className="text-xl font-semibold text-red-500">
        Something went wrong
      </h3>
      <p className="text-muted-foreground mt-2">{message}</p>
    </div>
  );
};
