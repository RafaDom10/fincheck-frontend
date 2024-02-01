import { useDashboard } from '../../components/DashboardContext/useDashboard'

export function useNewTransactionModalController () {
  const {
    isNewTransactionsModalOpen,
    closeNewTransactionsModal,
    newTransactionType
  } = useDashboard()

  return {
    isNewTransactionsModalOpen,
    closeNewTransactionsModal,
    newTransactionType
  }
}
