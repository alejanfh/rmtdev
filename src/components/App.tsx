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

function App() {
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 250)
  const { jobItems, isLoading } = useJobItems(debouncedSearchText)

  const totalNumberOfResults = jobItems?.length || 0
  const jobItemsSliced = jobItems?.slice(0, 7) || []

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
            <Sorting />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <Pagination />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position='top-right' />
    </>
  )
}

export default App
