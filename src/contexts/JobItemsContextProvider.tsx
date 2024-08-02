"use client";
import { RESULTS_PER_PAGE } from "@/lib/constants";
import { useDebounce, useSearchQuery, useSearchTextContext } from "@/lib/hook";
import { JobItem, PageDirection, SortBy } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useMemo, useState } from "react";

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangeSortBy: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { debouncedSearchText } = useSearchTextContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchText = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const sortBy = (searchParams.get("sortBy") as SortBy) || "relevant";

  const debouncedSearchText = useDebounce(searchText, 500);

  const { isLoading, jobItems } = useSearchQuery(debouncedSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  // const handleChangePage = useCallback(
  //   (direction: PageDirection) => {
  //     if (direction === "next") {
  //       setCurrentPage((prev) => Math.min(prev + 1, totalNumberOfPages));
  //     } else if (direction === "previous") {
  //       setCurrentPage((prev) => Math.max(prev - 1, 1));
  //     }
  //   },
  //   [totalNumberOfPages]
  // );

  const handleChangeSortBy = useCallback(
    (newSortBy: SortBy) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", newSortBy);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfPages,
      totalNumberOfResults,
      currentPage,
      sortBy,
      handleChangeSortBy,
    }),
    [
      currentPage,
      handleChangeSortBy,
      isLoading,
      jobItems,
      jobItemsSortedAndSliced,
      sortBy,
      totalNumberOfPages,
      totalNumberOfResults,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
