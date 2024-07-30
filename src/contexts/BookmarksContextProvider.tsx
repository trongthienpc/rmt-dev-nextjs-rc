"use client";
import { useJobItems, useLocalStorage } from "@/lib/hook";
import { JobItemExpanded } from "@/lib/types";
import { createContext } from "react";

type BookmarksContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );
  const { isLoading, jobItems: bookmarkedJobItems } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
