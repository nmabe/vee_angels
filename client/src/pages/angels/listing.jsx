import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import AngelsFilter from '../../components/v-angels/filter'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '@/config'
import { AngelCard } from '@/components/v-angels/angelCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFilteredAngels, getLikes } from '@/store/angels/angels-slice'
import { createSearchParams, useSearchParams, Link } from 'react-router-dom'
import SearchBar from 'react-js-search'
import ReactPaginate from 'react-paginate'

const AngelsListingPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const angelsList = useSelector(
    (state) => state.filteredAngel.angelsList.angels
  )
  const [likes, setLikes] = useState([])
  const [sort, setSort] = useState(null)
  const [filter, setFilter] = useState({})
  const [angels, setAngels] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 24
  const sortedAngels = [...angels].sort((a, b) =>
    (a.username || '').localeCompare(b.username || '')
  )
  const endOffset = itemOffset + itemsPerPage
  const currentItems = sortedAngels.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(sortedAngels.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage
    setItemOffset(newOffset)
  }

  const createSearchParamsHelper = (filter) => {
    const queryParams = []

    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value) && value.length > 0) {
        const filterValues = value.join(',')

        queryParams.push(`${key}=${encodeURIComponent(filterValues)}`)
      }
    }
    return queryParams.join('&')
  }

  const handleFilter = (getSectionId, getCurrentOption) => {
    let filtersCopy = { ...filter }
    const indexOfCurrentSection = Object.keys(filtersCopy).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      filtersCopy = {
        ...filtersCopy,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption =
        filtersCopy[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentOption === -1) {
        filtersCopy[getSectionId].push(getCurrentOption)
      } else {
        filtersCopy[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilter(filtersCopy)
    sessionStorage.setItem('filters', JSON.stringify(filtersCopy))
  }

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const queryString = createSearchParamsHelper(filter)
      setSearchParams(new URLSearchParams(queryString))
    }
  }, [filter])

  useEffect(() => {
    setSort('newest')
    setFilter(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  useEffect(() => {
    dispatch(fetchFilteredAngels({ filter, sort }))
  }, [dispatch, filter, sort])

  useEffect(() => {
    setAngels(angelsList)
  }, [angelsList])

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await dispatch(getLikes(user?.id || 0))
      setLikes(res.payload)
    }
    fetchLikes()
  }, [dispatch, user])

  // --- SEARCH FUNCTIONALITY ---
  useEffect(() => {
    if (!searchTerm) {
      setAngels(angelsList)
    } else {
      const lower = searchTerm.toLowerCase()
      setAngels(
        angelsList.filter(
          (angel) =>
            (angel.username && angel.username.toLowerCase().includes(lower)) ||
            (angel.firstname &&
              angel.firstname.toLowerCase().includes(lower)) ||
            (angel.lastname && angel.lastname.toLowerCase().includes(lower)) ||
            (angel.address?.city &&
              angel.address.city.toLowerCase().includes(lower)) ||
            (angel.address?.suburb &&
              angel.address.suburb.toLowerCase().includes(lower))
        )
      )
    }
  }, [searchTerm, angelsList])
  // --- END SEARCH FUNCTIONALITY ---

  // Reset pagination offset when the underlying list or search changes
  useEffect(() => {
    setItemOffset(0)
  }, [angelsList, searchTerm])

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-2 px-2 md:px-2 mt-24 max-w-7xl">
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight bg-gradient-to-r from-[#892f82] to-[#c2185b] bg-clip-text text-transparent drop-shadow-sm">
            All Angels
          </h1>
          <p className="text-base md:text-lg leading-normal text-gray-700 max-w-2xl mx-auto font-medium">
            Browse available angels and find your perfect match.
          </p>
          <div className="mt-2 flex justify-center md:justify-start">
            <Link
              to="/angels/angels"
              className="bg-gradient-to-r from-[#892f82] to-[#c2185b] text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-lg shadow-purple-400/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Angels
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1/2 md:grid-cols-[250px_1fr] gap-6">
          <AngelsFilter filter={filter} handleFilter={handleFilter} />
          <div className="bg-white/80 backdrop-blur-sm w-full rounded-2xl shadow-xl shadow-purple-300/40 border border-purple-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-400/50 transition-shadow duration-300">
            <div className="p-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
              <h4 className="text-xl font-extrabold text-gray-900">
                All Angels
              </h4>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 font-extrabold border-purple-200 hover:bg-purple-100 text-purple-700"
                    >
                      <ArrowUpDownIcon strokeWidth={3} className="h-4 w-4 " />
                      sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] ">
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={(value) => setSort(value)}
                    >
                      {sortOptions.map((item) => (
                        <DropdownMenuRadioItem key={item.id} value={item.id}>
                          {item.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="text-gray-600 font-semibold bg-purple-100 px-2 py-1 rounded-full text-sm">
                  {angels?.length} Angels
                </span>
              </div>
            </div>
            <SearchBar
              className="flex flex-1 w-full"
              placeHolderText={'Search here...'}
              data={angelsList}
              onSearchTextChange={setSearchTerm}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-3">
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((angel) => (
                  <AngelCard
                    userId={user ? user.id : 0}
                    angel={angel}
                    key={angel._id}
                    likes={likes?.likes || []}
                  />
                ))
              ) : (
                <p className="text-center text-gray-700 col-span-full py-8 text-lg font-medium">
                  No Angels Found
                </p>
              )}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination flex justify-center items-center gap-2 py-4"
              pageLinkClassName="page-num px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
              activeLinkClassName="active bg-[#892f82] text-white border-[#892f82]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AngelsListingPage
