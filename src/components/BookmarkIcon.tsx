import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { BookmarksContext } from '../contexts/BookmarksContextProvider'

type BookmarkIconProps = {
  bookmarkId: number
}

export default function BookmarkIcon({ bookmarkId }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext)

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(bookmarkId)
        e.stopPropagation()
      }}
      className='bookmark-btn'
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(bookmarkId) ? 'filled' : ''}`}
      />
    </button>
  )
}
