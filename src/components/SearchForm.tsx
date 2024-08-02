"use client";
import { useDebounce, useSearchTextContext } from "@/lib/hook";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchForm = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString() || ""}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
};

export default SearchForm;
