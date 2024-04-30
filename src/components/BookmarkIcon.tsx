import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  bookmarkId: number;
};

export default function BookmarkIcon({ bookmarkId }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(bookmarkId);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(bookmarkId) ? "filled" : ""}`}
      />
    </button>
  );
}
