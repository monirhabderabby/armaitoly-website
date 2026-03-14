"use client";
import VillaCard from "@/components/shared/cards/villa-card";
import VillaCardSkeleton from "@/components/shared/skeleton/villa-card-skleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetVillasByPropId } from "@/hooks/property/use-get-all-villas-by-property";
import { useState } from "react";

interface Props {
  propId: string;
}

const LIMIT = 10;

const AllVillasContainer = ({ propId }: Props) => {
  const [page, setPage] = useState(1);
  const { isLoading, data, isError, error } = useGetVillasByPropId({
    propId,
    page,
    limit: LIMIT,
  });

  let content;

  if (isLoading) {
    content = (
      <div className="grid gap-5">
        <VillaCardSkeleton />
        <VillaCardSkeleton />
        <VillaCardSkeleton />
      </div>
    );
  } else if (isError) {
    content = <ErrorState message={error.message} />;
  } else if (data && data.data.rooms.length === 0) {
    content = (
      <div className="py-24 flex flex-col justify-center items-center">
        <p className="text-muted-foreground mt-2">
          NO Room Found on this property {data.data.name}
        </p>
      </div>
    );
  } else if (data && data.data.rooms.length > 0) {
    const villas = data.data.rooms;

    const meta = data?.meta;

    const start = meta ? (meta.page - 1) * meta.limit + 1 : 0;
    const end = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;
    content = (
      <div className="grid gap-10">
        {villas.map((villa, idx) => (
          <VillaCard key={villa.roomId} data={villa} reversed={idx % 2 !== 0} />
        ))}

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
      </div>
    );
  }
  return <div className="my-20 md:my-36 max-w-325 mx-auto ">{content}</div>;
};

export default AllVillasContainer;

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
