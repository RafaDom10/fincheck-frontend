import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum([ 'CHECKING', 'INVESTMENT', 'CASH' ]),
  color: z.string().min(1, 'Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController () {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal
  } = useDashboard()

  return {
    isNewAccountModalOpen,
    closeNewAccountModal
  }
}
