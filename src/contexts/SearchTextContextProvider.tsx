"use client";
import { useDebounce } from "@/lib/hook";
import React from "react";

type SearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (searchText: string) => void;
};

export const SearchTextContext =
  React.createContext<SearchTextContextType | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = React.useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, debouncedSearchText, handleChangeSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
