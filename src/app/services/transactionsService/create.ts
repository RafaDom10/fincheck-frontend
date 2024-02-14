import { httpClient } from "../HttpClient"

interface TransactionsParams {
  bankAccountId: string
  categoryId: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE'
}

export async function create (params: TransactionsParams) {
  const { data } = await httpClient.post('/transactions', params)
  return data
}
