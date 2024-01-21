import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '../../app/utils/cs'

export function Modal () {
  return(
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay className={cn(
          'fixed z-50 inset-0 bg-black/80 backdrop-blur-sm',
          'data-[state=open]:animate-overlay-show'
        )} />

        <Dialog.Content
          className={cn(
            'fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2',
            'data-[state=open]:animate-content-show'
          )}
        >

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
