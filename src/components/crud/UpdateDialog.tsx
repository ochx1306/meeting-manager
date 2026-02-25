import type { ComponentType } from 'react'
import { UpdateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import type { CrudFormProps } from './crud-form'

interface UpdateDialogProps<T> {
  featureName: string
  item: T
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const UpdateDialog = <T,>({
  featureName,
  item,
  CrudForm,
}: UpdateDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<UpdateIconButton label="更新" />}
      title={`${featureName}を更新`}
    >
      {(onSuccess) => (
        <CrudForm mode="update" defaultValues={item} onSuccess={onSuccess} />
      )}
    </BaseDialog>
  )
}
