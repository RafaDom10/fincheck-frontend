import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { DatePickerInput } from '../../../../components/DatePickerInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useEditTransactionModalController } from './useEditTransactionModalController'
import { Transaction } from '../../../../../app/entities/Transaction'
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal'
import { TrashIcon } from '../../../../components/icons/TrashIcon'

interface EditTransactionsModalProps {
  transaction: Transaction | null
  open: boolean
  onClose(): void
}

export function EditTransactionsModal({ transaction, open, onClose }: EditTransactionsModalProps) {
  const {
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteTransaction
  } = useEditTransactionModalController(transaction, onClose)

  const isExpense = transaction?.type === 'EXPENSE'

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
        title="Tem certeza que deseja excluir esta transação?"
      />
    )
  }

  return (
    <Modal
      title={
        isExpense
          ? 'Editar Despesa'
          : 'Editar Receita'
      }
      onClose={onClose}
      open={open}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className='text-gray-600 tracking-[-0.5px] text-xs'>
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>
              R$
            </span>
            <Controller
              control={control}
              name='value'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className='mt-10 flex gap-4 flex-col'>
          <Input
            type='text'
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name='categoryId'
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                placeholder='Categoria'
                options={categories.map( category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name='bankAccountId'
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map( account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                onChange={onChange}
                value={value}
              />
            )}
          />

        </div>

        <Button className='w-full mt-6' isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
