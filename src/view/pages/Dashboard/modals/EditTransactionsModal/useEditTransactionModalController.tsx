import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { useMemo, useState } from 'react'
import { Transaction } from '../../../../../app/entities/Transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../../../../../app/services/transactionsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor.'),
    z.number()
  ]),
  name: z.string().min(1, 'Informe o nome.'),
  categoryId: z.string().min(1, 'Informe a categoria.'),
  bankAccountId: z.string().min(1, 'Informe a conta.'),
  date: z.date()
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    }
  })

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: transactionService.update
  })

  const [isDeleteModalOpen, setIDeleteModalOpen] = useState(false)

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString()
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success('Transação atualizada com sucesso.')
      onClose()

    } catch {
      toast.error('Erro ao atualizar transação.')
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  function handleCloseDeleteModal () {
    setIDeleteModalOpen(false)
  }

  function handleOpenDeleteModal () {
    setIDeleteModalOpen(true)
  }

  const { isLoading: isLoadingDelete, mutateAsync: removeTransaction } = useMutation({
    mutationFn: transactionService.remove
  })

  async function handleDeleteTransaction () {
    try {
      await removeTransaction(transaction!.id)

      void queryClient.invalidateQueries({ queryKey: ['transactions'] })
      void queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success('Transação removida com sucesso!')
      onClose()
    } catch {
      toast.error('Erro ao remover a transação.')
    }
  }

  return {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteTransaction
  }
}
