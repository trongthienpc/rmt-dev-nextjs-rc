"use client";
import { RESULTS_PER_PAGE } from "@/lib/constants";
import { useDebounce, useSearchQuery, useSearchTextContext } from "@/lib/hook";
import { JobItem, PageDirection, SortBy } from "@/lib/types";
import { createContext, useCallback, useMemo, useState } from "react";

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();

  const { isLoading, jobItems } = useSearchQuery(debouncedSearchText);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
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

  const handleChangePage = useCallback(
    (direction: PageDirection) => {
      if (direction === "next") {
        setCurrentPage((prev) => Math.min(prev + 1, totalNumberOfPages));
      } else if (direction === "previous") {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    },
    [totalNumberOfPages]
  );

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfPages,
      totalNumberOfResults,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      currentPage,
      handleChangePage,
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
