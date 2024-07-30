"use client";
import { useJobItemsContext } from "@/lib/hook";
import { PageDirection } from "@/lib/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

const PaginationControls = () => {
  const {
    currentPage,
    totalNumberOfPages,
    handleChangePage: onClick,
  } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          currentPage={currentPage}
          direction="previous"
          onClick={() => onClick("previous")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          currentPage={currentPage}
          direction="next"
          onClick={() => onClick("next")}
        />
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
