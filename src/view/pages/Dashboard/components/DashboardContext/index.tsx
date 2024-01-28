import { createContext, useCallback, useState } from 'react'

interface DashboardContextValue {
  areValuesIsVisible: boolean
  isNewAccountModalOpen: boolean
  toggleValuesVisibility(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
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

  return (
    <DashboardContext.Provider
      value={{
        areValuesIsVisible,
        isNewAccountModalOpen,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
