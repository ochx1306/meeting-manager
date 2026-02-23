import { useMemo, type ComponentType } from 'react'
import { AppTable } from '@/components/data-table'
import type { ColumnDef } from '@/components/data-table/column'
import type { CrudFormProps } from './crud-form'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'

interface CrudTableTemplateProps<T> {
  featureName: string
  data: T[]
  columns: ColumnDef<T>[]
  CrudForm: ComponentType<CrudFormProps<T>>
  DeleteAction: ComponentType<{ item: T }>
  PrefixActions?: ComponentType<{ item: T }>
}

export const CrudTableTemplate = <T,>({
  featureName,
  data,
  columns,
  CrudForm,
  DeleteAction,
  PrefixActions,
}: CrudTableTemplateProps<T>) => {
  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return [
      ...columns,
      {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => {
          const item = row as T
          return (
            <div className="flex gap-2">
              {PrefixActions && <PrefixActions item={item} />}
              <UpdateDialog
                featureName={featureName}
                item={item}
                CrudForm={CrudForm}
              />
              <DeleteAction item={item} />
            </div>
          )
        },
      },
    ]
  }, [columns, PrefixActions, featureName, CrudForm, DeleteAction])

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
