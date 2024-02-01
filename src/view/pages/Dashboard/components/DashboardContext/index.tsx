import { createContext, useCallback, useState } from 'react'

interface DashboardContextValue {
  areValuesIsVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionsModalOpen: boolean
  newTransactionType: 'EXPENSE' | 'INCOME' | null
  toggleValuesVisibility(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
  openNewTransactionsModal(type: 'EXPENSE' | 'INCOME'): void
  closeNewTransactionsModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider ({ children }: { children: React.ReactNode }) {
  const [areValuesIsVisible, setAreValuesIsVisible] = useState(() => {
    const areVisible = localStorage.getItem('fincheck:areValuesIsVisible')

    if (areVisible !== 'true') {
      return true
    }

    return false
  })
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'EXPENSE' | 'INCOME' | null>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesIsVisible(prevState => !prevState)
    localStorage.setItem('fincheck:areValuesIsVisible', String(areValuesIsVisible))
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionsModal = useCallback((type: 'EXPENSE' | 'INCOME') => {
    setNewTransactionType(type)
    setIsNewTransactionsModalOpen(true)
  }, [])

  const closeNewTransactionsModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionsModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        areValuesIsVisible,
        isNewAccountModalOpen,
        isNewTransactionsModalOpen,
        newTransactionType,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionsModal,
        closeNewTransactionsModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
