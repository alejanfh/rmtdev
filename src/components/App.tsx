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

function App() {
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 250)
  const { jobItemsSliced, isLoading, totalNumberOfResults } =
    useJobItems(debouncedSearchText)

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
    </>
  )
}

export default App
