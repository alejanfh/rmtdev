import { ReactNode, createContext, useEffect, useState } from 'react'

type BookmarksContextProviderProps = {
  children: ReactNode
}

export const BookmarksContext = createContext(null)

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  //   const bookmarkedIdsFromLocalStorage = JSON.parse(
  //     localStorage.getItem('bookmarkedIds') || '[]'
  //   )
  // se ppuede poner de estado inicial una funcion y que asi solo se ejecute una vez
  // la funcion
  const [bookmarkedIds, setBookmarkIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('bookmarkedIds') || '[]')
  )

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkIds((prev) => [...prev, id])
    }
  }

  useEffect(() => {
    localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  // value aqui va el objeto con las cosas que quieres que toda la app pueda utilizar
  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
