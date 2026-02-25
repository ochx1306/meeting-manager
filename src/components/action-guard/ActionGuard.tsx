import { useState, type ReactNode } from 'react'
import { BaseConfirmDialog } from '../confirm-dialog/BaseConfirmDialog'

interface ActionGuardProps {
  onAction: () => void
  shouldConfirm?: boolean
  title: string
  description: string
  cancelLabel?: string
  actionLabel?: string
  renderTrigger: (handleTrigger: () => void) => ReactNode
}

const ActionGuard = ({
  onAction,
  shouldConfirm,
  title,
  description,
  cancelLabel = 'キャンセル',
  actionLabel = '実行',
  renderTrigger,
}: ActionGuardProps) => {
  const [open, setOpen] = useState(false)

  const handleTrigger = () => {
    if (shouldConfirm) {
      setOpen(true)
    } else {
      onAction()
    }
  }

  const handleConfirm = () => {
    onAction()
    setOpen(false)
  }

  return (
    <>
      <BaseConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        cancelLabel={cancelLabel}
        actionLabel={actionLabel}
        onAction={handleConfirm}
      />
      {renderTrigger(handleTrigger)}
    </>
  )
}

export { ActionGuard, type ActionGuardProps }
