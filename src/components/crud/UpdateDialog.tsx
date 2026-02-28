import type { ComponentType } from 'react'
import { UpdateIconButton } from '@/components/icon-buttons'
import { BaseDialog } from '@/components/dialog/BaseDialog'
import type { AppEntity } from '@/lib/app-entity'
import type { CrudFormProps } from '@/lib/use-crud-form'

interface UpdateDialogProps<T extends AppEntity> {
  featureName: string
  item: T
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const UpdateDialog = <T extends AppEntity>({
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
        <CrudForm
          crudMode="update"
          defaultValues={item}
          onSuccess={onSuccess}
        />
      )}
    </BaseDialog>
  )
}
