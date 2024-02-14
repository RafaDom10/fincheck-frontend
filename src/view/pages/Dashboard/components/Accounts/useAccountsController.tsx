import { useMemo, useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useBankAccount } from '../../../../../app/hooks/useBankAccounts'

export function useAccountsController () {
  const windowWidth = useWindowWidth()
  const {
    areValuesIsVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    openEditAccountModal
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const { accounts, isFetching } = useBankAccount()

  const currentBalance = useMemo(() => {
    return accounts.reduce(( total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesIsVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
    openEditAccountModal
  }
}
