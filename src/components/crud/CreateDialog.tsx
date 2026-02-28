import type { ComponentType } from 'react'
import { CreateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import type { AppEntity } from '@/lib/app-entity'
import type { CrudFormProps } from '@/lib/use-crud-form'

interface CreateDialogProps<T extends AppEntity> {
  featureName: string
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const CreateDialog = <T extends AppEntity>({
  featureName,
  CrudForm,
}: CreateDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<CreateIconButton label="作成" />}
      title={`${featureName}を作成`}
    >
      {(onSuccess) => <CrudForm crudMode="create" onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
