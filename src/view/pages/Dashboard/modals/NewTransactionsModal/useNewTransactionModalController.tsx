import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../../../../../app/services/transactionsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'

const schema = z.object({
  value: z.string().min(1, 'Informe o valor.'),
  name: z.string().min(1, 'Informe o nome.'),
  categoryId: z.string().min(1, 'Informe a categoria.'),
  bankAccountId: z.string().min(1, 'Informe a conta.'),
  date: z.date()
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController () {
  const {
    isNewTransactionsModalOpen,
    closeNewTransactionsModal,
    newTransactionType
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

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: transactionService.create
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success('Transação cadastrada com sucesso.')
      closeNewTransactionsModal()

      reset({
        name: '',
        bankAccountId: '',
        categoryId: '',
        value: '0'
      })
    } catch {
      toast.error('Erro ao cadastrar transação.')
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter( category => category.type === newTransactionType )
  }, [categoriesList, newTransactionType])

  return {
    isNewTransactionsModalOpen,
    closeNewTransactionsModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
