import { useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useQuery } from '@tanstack/react-query'
import { bankAccountService } from '../../../../../app/services/bankAccountService'

export function useAccountsController () {
  const windowWidth = useWindowWidth()
  const {
    areValuesIsVisible,
    toggleValuesVisibility,
    openNewAccountModal
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity
  })

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesIsVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal
  }
}
