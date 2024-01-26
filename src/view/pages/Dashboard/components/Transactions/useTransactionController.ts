import { useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'

export function useTransactionController () {
  const { areValuesIsVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

  function handleOpenFiltersModal () {
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal () {
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesIsVisible,
    isInitialLoading: false,
    transactions: [],
    isLoading: false,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen
  }
}
