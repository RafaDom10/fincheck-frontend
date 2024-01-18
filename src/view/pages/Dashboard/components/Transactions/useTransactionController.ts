import { useDashboard } from "../DashboardContext/useDashboard"

export function useTransactionController() {
  const { areValuesIsVisible } = useDashboard()

  return {
    areValuesIsVisible,
    isInitialLoading: false,
    transactions: [],
    isLoading: false
  }
}
