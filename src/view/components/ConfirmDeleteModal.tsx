import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onClose(): void
}

export function ConfirmDeleteModal ({ onClose }: ConfirmDeleteModalProps ) {
  return (
    <Modal open={true} title="Excluir" onClose={onClose}>
      Content
    </Modal>
  )
}
