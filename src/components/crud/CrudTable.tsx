import { useMemo, type ComponentType } from 'react'
import { BaseDataTable } from '@/components/data-table'
import type { ColumnDef } from '@/components/data-table/column'
import type { AppEntity } from '@/lib/app-entity'
import type { CrudFormProps } from './crud-form'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'
import { DeleteButton } from './DeleteButton'

interface CrudTableProps<T extends AppEntity> {
  featureName: string
  items: T[]
  deleteItem: (id: T['id']) => void
  columns: ColumnDef<T>[]
  CrudForm: ComponentType<CrudFormProps<T>>
  PrefixActions?: ComponentType<{ item: T }>
}

export const CrudTable = <T extends AppEntity>({
  featureName,
  items,
  deleteItem,
  columns,
  CrudForm,
  PrefixActions,
}: CrudTableProps<T>) => {
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
              <DeleteButton
                itemName={item.name}
                handleDelete={() => deleteItem(item.id)}
              />
            </div>
          )
        },
      },
    ]
  }, [columns, PrefixActions, featureName, CrudForm, deleteItem])

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{featureName}一覧</h1>
        <CreateDialog featureName={featureName} CrudForm={CrudForm} />
      </div>
      <BaseDataTable
        columns={tableColumns}
        data={items}
        getRowId={(item) => item.id}
      />
    </div>
  )
}
