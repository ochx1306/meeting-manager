import { ActionGuard } from '@/components/action-guard/ActionGuard'
import { DeleteIconButton } from '@/components/icon-buttons'

interface DeleteButtonProps {
  itemName: string
  handleDelete: () => void
}

export const DeleteButton = ({ itemName, handleDelete }: DeleteButtonProps) => {
  return (
    <ActionGuard
      onAction={handleDelete}
      shouldConfirm={true}
      renderTrigger={(handleTrigger) => (
        <DeleteIconButton label="削除" onClick={handleTrigger} />
      )}
      title={`「${itemName}」を削除しますか？`}
      description="この操作は取り消せません。"
      actionLabel="削除"
    />
  )
}
