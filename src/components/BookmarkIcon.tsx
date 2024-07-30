import { useBookmarksContext } from "@/lib/hook";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import React from "react";

type BookmarkIconProps = {
  id: number;
};

const BookmarkIcon = ({ id }: BookmarkIconProps) => {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();
  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
};

export default BookmarkIcon;
