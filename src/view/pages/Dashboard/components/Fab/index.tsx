import { PlusIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from '../../../../components/DropdownMenu'
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon'
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'

export function Fab () {
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="text-white rounded-full w-12 h-12 bg-teal-900 flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mr-2 mb-2">
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
