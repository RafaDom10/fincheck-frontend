import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { DatePickerInput } from '../../../../components/DatePickerInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useNewTransactionModalController } from './useNewTransactionModalController'

export function NewTransactionsModal() {
  const {
    isNewTransactionsModalOpen,
    closeNewTransactionsModal,
    newTransactionType,
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading
  } = useNewTransactionModalController()

  const isExpense = newTransactionType === 'EXPENSE'

  return (
    <Modal
      title={
        isExpense
          ? 'Nova Despesa'
          : 'Nova Receita'
      }
      onClose={closeNewTransactionsModal}
      open={isNewTransactionsModalOpen}
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
          Criar
        </Button>
      </form>
    </Modal>
  )
}
