import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bankAccountService } from '../../../../../app/services/bankAccountService'
import toast from 'react-hot-toast'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController () {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: bankAccountService.create
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      })

      void queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success('Conta cadastrada com sucesso!')
      closeEditAccountModal()
      reset({
        initialBalance: '0',
        name: '',
        type: 'CHECKING',
        color: ''
      })
    } catch {
      toast.error('Erro ao cadastrar conta.')
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
