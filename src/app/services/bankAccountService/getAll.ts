import { httpClient } from '../HttpClient'

type BankAccountResponse = Array<{
  id: string
  userId: string
  name: string
  initialBalance: number
  type: 'INVESTMENT' | 'CHECKING' | 'CASH'
  color: string
  currentBalance: number
}>

export async function getAll () {
  const { data } = await httpClient.get<BankAccountResponse>('/bank-accounts')
  return data
}
