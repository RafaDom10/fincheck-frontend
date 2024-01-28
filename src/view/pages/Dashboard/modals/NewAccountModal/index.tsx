import { Modal } from '../../../../components/Modal'
import { useNewAccountModalController } from './useNewAccountModalController'

export function NewAccountModal () {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal
  } = useNewAccountModalController()

  return (
    <Modal
      title='Nova conta'
      onClose={closeNewAccountModal}
      open={isNewAccountModalOpen}
    >
      NewAccountModal
    </Modal>
  )
}
