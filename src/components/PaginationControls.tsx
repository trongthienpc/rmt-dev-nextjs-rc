"use client";
import { useJobItemsContext } from "@/lib/hook";
import { PageDirection } from "@/lib/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const PaginationControls = () => {
  const { currentPage, totalNumberOfPages } = useJobItemsContext();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <section className="pagination">
      {currentPage > 1 && (
        // <PaginationButton
        //   currentPage={currentPage}
        //   direction="previous"
        //   onClick={() => onClick("previous")}
        // />
        <Link
          href={createPageUrl(currentPage - 1)}
          className=" flex items-center gap-1"
          scroll={false}
          aria-label="Previous page"
        >
          <ArrowLeftIcon className="w-5 h-5 font-semibold drop-shadow-lg" />
        </Link>
      )}
      {currentPage < totalNumberOfPages && (
        // <PaginationButton
        //   currentPage={currentPage}
        //   direction="next"
        //   onClick={() => onClick("next")}
        // />
        <Link
          href={createPageUrl(currentPage + 1)}
          className=" flex items-center gap-1"
          scroll={false}
          aria-label="Next page"
        >
          <ArrowRightIcon className="w-5 h-5 font-semibold drop-shadow-lg" />
        </Link>
      )}
    </section>
  );
};

export default PaginationControls;

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
