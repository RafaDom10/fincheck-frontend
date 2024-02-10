import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bankAccountService } from '../../../../../app/services/bankAccountService'
import toast from 'react-hot-toast'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number()
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController () {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      type: accountBeingEdited?.type,
      name: accountBeingEdited?.name,
      initialBalance: accountBeingEdited?.initialBalance
    }
  })

  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: bankAccountService.update
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      })

      void queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success('Conta editada com sucesso!')
      closeEditAccountModal()
    } catch {
      toast.error('Erro ao salvar as alteraçãoes conta.')
    }
  })

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  }
}
