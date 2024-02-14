import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionsService";

export function useTransactions () {
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll({
      month: 1,
      year: 2024,
    }),
    staleTime: Infinity
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading
  }
}
