import { useState } from 'react'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header, { HeaderTop } from './Header'
import Logo from './Logo'
import BookmarksButton from './BookmarksButton'
import SearchForm from './SearchForm'
import Sidebar, { SidebarTop } from './Sidebar'
import JobItemContent from './JobItemContent'
import ResultsCount from './ResultsCount'
import JobList from './JobList'
import Pagination from './PaginationControls'
import Sorting from './SortingControls'
import { useDebounce, useJobItems } from '../lib/hooks'
import { Toaster } from 'react-hot-toast'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { PageDirection, SortBy } from '../lib/types'

function App() {
  // state
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 250)
  const { jobItems, isLoading } = useJobItems(debouncedSearchText)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>('relevant')

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore
    } else if (sortBy === 'recent') {
      return a.daysAgo - b.daysAgo
    }

    return 0
  })
  const jobItemsSortedAndSliced =
    jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || []

  // event handlers / actions
  const handleChangePage = (direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1)
    }
  }
  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1)
    setSortBy(newSortBy)
  }

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <Sorting handleChangeSortBy={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <Pagination
            onClick={handleChangePage}
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position='top-right' />
    </>
  )
}

export default App
