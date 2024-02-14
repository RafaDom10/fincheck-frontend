import { useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'

export function useTransactionController () {
  const { areValuesIsVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

  const { transactions, isLoading, isInitialLoading } = useTransactions()

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
    isFiltersModalOpen
  }
}
