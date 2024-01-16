import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesIsVisible: boolean
  toggleValuesVisibility(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesIsVisible, setAreValuesIsVisible] = useState(() => {
    const areVisible = localStorage.getItem('fincheck:areValuesIsVisible')

    if (areVisible !== 'true') {
      return true
    }

    return false
  })

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesIsVisible(prevState => !prevState)
    localStorage.setItem('fincheck:areValuesIsVisible', String(areValuesIsVisible))
  }, [areValuesIsVisible])

  return (
    <DashboardContext.Provider
      value={{
        areValuesIsVisible,
        toggleValuesVisibility
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
