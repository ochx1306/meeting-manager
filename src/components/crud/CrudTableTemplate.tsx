import { useMemo, type ComponentType } from 'react'
import { AppTable } from '@/components/data-table'
import type { ColumnDef } from '@/components/data-table/column'

import type { CrudFormProps } from './crud-form'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'
import { DeleteButton } from './DeleteButton'

interface CrudTableTemplateProps<T> {
  featureName: string
  data: T[]
  columns: ColumnDef<T>[]
  // CreateDialog: ComponentType
  CrudForm: ComponentType<CrudFormProps<T>>
  // UpdateDialog: ComponentType<{ item: T }>
  // DeleteButton: ComponentType<{ item: T }>
  handleDelete: () => void
}

export const CrudTableTemplate = <T,>({
  featureName,
  data,
  columns,
  // CreateDialog,
  CrudForm,
  // UpdateDialog,
  // DeleteButton,
  handleDelete,
}: CrudTableTemplateProps<T>) => {
  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return [
      ...columns,
      {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <UpdateDialog
              featureName={featureName}
              item={row as T}
              CrudForm={CrudForm}
            />
            <DeleteButton itemName="temp" handleDelete={handleDelete} />
          </div>
        ),
      },
    ]
  }, [columns, featureName, CrudForm, handleDelete])

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{featureName}一覧</h1>
        <CreateDialog featureName={featureName} CrudForm={CrudForm} />
      </div>
      <AppTable columns={tableColumns} data={data} />
    </div>
  )
}
