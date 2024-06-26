import { ReactNode, createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";

type BookmarksContextProviderProps = {
  children: ReactNode;
};

type BookmarksContextProps = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextProps | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  //   const bookmarkedIdsFromLocalStorage = JSON.parse(
  //     localStorage.getItem('bookmarkedIds') || '[]'
  //   )
  // se puede poner de estado inicial una funcion y que asi solo se ejecute una vez
  // la funcion
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  // value aqui va el objeto con las cosas que quieres que toda la app pueda utilizar
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
