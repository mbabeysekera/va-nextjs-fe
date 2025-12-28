"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  hrefBase: string;
  currentPage: number;
  totalPages: number;
  visiblePages?: number;
}

const AppPagination = ({
  hrefBase,
  currentPage,
  totalPages,
  visiblePages = 5,
}: Props) => {
  const start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const end = Math.min(totalPages, start + visiblePages - 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${hrefBase}/${currentPage - 1}`} />
          </PaginationItem>
        )}

        {start > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${hrefBase}/${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${hrefBase}/${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
