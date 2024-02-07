import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useNewAccountModalController } from './useNewAccountModalController'

export function NewAccountModal () {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isPending
  } = useNewAccountModalController()

  return (
    <Modal
      title='Nova conta'
      onClose={closeNewAccountModal}
      open={isNewAccountModalOpen}
    >
      <form onSubmit={handleSubmit}>
        <div >
          <span className='text-gray-600 tracking-[-0.5px] text-xs'>
            Saldo inicial
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>
              R$
            </span>

            <Controller
              control={control}
              name='initialBalance'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder='Nome da conta'
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name='type'
            defaultValue='CHECKING'
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                placeholder='Tipo'
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico'
                  }
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name='color'
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />

        </div>
        <Button
          className='w-full mt-6'
          isLoading={isPending}
        >
          Criar
        </Button>
      </form>
    </Modal>
  )
}
