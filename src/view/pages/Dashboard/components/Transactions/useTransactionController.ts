import { useEffect, useState } from 'react'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useTransactions } from '../../../../../app/hooks/useTransactions'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'
import { Transaction } from '../../../../../app/entities/Transaction';

export function useTransactionController() {
  const { areValuesIsVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null)

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

  function handleChangeFilters<T extends keyof TransactionsFilters>(filter: T) {
    return (value: TransactionsFilters[T]) => {
      if (value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters(
    { bankAccountId, year }: { bankAccountId: string | undefined, year: number }
  ) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setIsFiltersModalOpen(false)
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false)
  }

  function handleOpenTransactionModal (transaction: Transaction) {
    setTransactionBeingEdited( transaction )
    setIsEditModalOpen(true)
  }

  function handleCloseTransactionModal () {
    setTransactionBeingEdited( null )
    setIsEditModalOpen(false)
  }

  return {
    areValuesIsVisible,
    isInitialLoading,
    transactions,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenTransactionModal,
    handleCloseTransactionModal
  }
}
