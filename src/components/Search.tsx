import React from "react";
import { Search as SearchIcon } from "lucide-react";
const Search = () => {
  return (
    <div className="h-10 md:px-3 md:py-1 md:bg-slate-50 cursor-pointer flex items-center rounded">
      <SearchIcon strokeWidth={1.25} />
    </div>
  );
};

export default Search;
