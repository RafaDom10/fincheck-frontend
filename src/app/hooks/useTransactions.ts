import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionsService";
import { TransactionsFilters } from "../services/transactionsService/getAll";

export function useTransactions (filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filters),
    staleTime: Infinity
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch
  }
}
