import type { ComponentType } from 'react'
import { CreateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import type { CrudFormProps } from './crud-form'

interface CreateDialogProps<T> {
  featureName: string
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const CreateDialog = <T,>({
  featureName,
  CrudForm,
}: CreateDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<CreateIconButton label="作成" />}
      title={`${featureName}を作成`}
    >
      {(onSuccess) => <CrudForm mode="create" onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
