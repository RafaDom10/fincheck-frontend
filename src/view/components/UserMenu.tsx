import { ExitIcon } from "@radix-ui/react-icons"
import { DropdownMenu } from "./DropdownMenu"
import { useAuth } from "../../app/hooks/useAuth"

export function UserMenu() {
  const { signout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border-teal-100">
          <span className="text-sm text-teal-900 tracking-[-0.5px] font-medium">
            RD
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 mt-1 mr-2">
        <DropdownMenu.Item
          onSelect={signout}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
