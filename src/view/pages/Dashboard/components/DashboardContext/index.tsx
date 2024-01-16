import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesIsVisible: boolean
  toggleValuesVisibility(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider ({ children }: { children: React.ReactNode }) {
  const [ areValuesIsVisible, setAreValuesIsVisible ] = useState(true)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesIsVisible(prevState => !prevState)
  }, [])

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
