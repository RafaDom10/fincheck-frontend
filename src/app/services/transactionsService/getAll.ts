import { Transaction } from '../../entities/Transaction'
import { httpClient } from '../HttpClient'

type TransactionsResponse = Array<Transaction>

export async function getAll () {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions')
  return data
}
