import { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../lib/hooks'

type BookmarksContextProviderProps = {
  children: ReactNode
}

type BookmarksContextProps = {
  bookmarkedIds: number[]
  handleToggleBookmark: (id: number) => void
}

const BookmarksContext = createContext<BookmarksContextProps | null>(null)

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  //   const bookmarkedIdsFromLocalStorage = JSON.parse(
  //     localStorage.getItem('bookmarkedIds') || '[]'
  //   )
  // se puede poner de estado inicial una funcion y que asi solo se ejecute una vez
  // la funcion
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    []
  )

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkedIds((prev) => [...prev, id])
    }
  }

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

export function useBookmarksContext() {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error(
      'useBookmarksContext must be used within a BookmarksContextProvider'
    )
  }

  return context
}
