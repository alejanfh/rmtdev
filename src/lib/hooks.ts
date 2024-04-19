import { useEffect, useState } from 'react'
import { JobItem } from './types'
import { BASE_API_URL } from './constants'
import { useQuery } from '@tanstack/react-query'

const fetchJobItem = async (id: number) => {
  const response = await fetch(`${BASE_API_URL}/${id}`)
  const data = await response.json()

  return data
}

export function useJobItem(id: number | null) {
  // ['job-item', id] como el [] de useEffect
  const { data, isLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      // After how long whe should consider data outdated ?
      // Cada hora se hace otro fetch para ver que data esté actualizado
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: () => {},
    }
  )
  const jobItem = data?.jobItem
  return { jobItem, isLoading } as const
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const totalNumberOfResults = jobItems.length
  const jobItemsSliced = jobItems.slice(0, 7)

  useEffect(() => {
    if (!searchText) return

    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`)

      const data = await response.json()
      setIsLoading(false)
      setJobItems(data.jobItems)
    }

    fetchData()
  }, [searchText])

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const
}

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null)
//   const [isLoading, setIsLoading] = useState<boolean>(false)

//   useEffect(() => {
//     if (!id) return

//     const fetchData = async () => {
//       setIsLoading(true)
//       const response = await fetch(`${BASE_API_URL}/${id}`)
//       const data = await response.json()
//       setIsLoading(false)
//       setJobItem(data.jobItem)
//     }

//     fetchData()
//   }, [id])

//   return { jobItem, isLoading } as const
// }

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id)
    }
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return activeId
}
