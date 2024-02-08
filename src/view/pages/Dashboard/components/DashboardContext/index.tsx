import { createContext, useCallback, useState } from 'react'
import { BankAccount } from '../../../../../app/entities/BankAccount'

interface DashboardContextValue {
  areValuesIsVisible: boolean
  isNewAccountModalOpen: boolean
  isEditAccountModalOpen: boolean
  isNewTransactionsModalOpen: boolean
  accountBeingEdited: BankAccount | null
  newTransactionType: 'EXPENSE' | 'INCOME' | null
  toggleValuesVisibility(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
  openEditAccountModal(bankAccount: BankAccount): void
  closeEditAccountModal(): void
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
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'EXPENSE' | 'INCOME' | null>(null)
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null)


  const toggleValuesVisibility = useCallback(() => {
    setAreValuesIsVisible(prevState => !prevState)
    localStorage.setItem('fincheck:areValuesIsVisible', String(areValuesIsVisible))
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false)
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
        isEditAccountModalOpen,
        isNewTransactionsModalOpen,
        newTransactionType,
        accountBeingEdited,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openEditAccountModal,
        closeEditAccountModal,
        openNewTransactionsModal,
        closeNewTransactionsModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
