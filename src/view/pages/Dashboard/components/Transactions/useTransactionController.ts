import { useEffect, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'

export function useTransactionController () {
  const { areValuesIsVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const {
    transactions, isLoading, isInitialLoading, refetch
  } = useTransactions(filters)

  useEffect(() => {
    refetch()
  }, [filters, refetch])

  function handleChangeMonth (month: number) {
    setFilters(prevState => ({
      ...prevState,
      month
    }))
  }

  function handleOpenFiltersModal () {
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal () {
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesIsVisible,
    isInitialLoading,
    transactions,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeMonth,
    filters
  }
}
