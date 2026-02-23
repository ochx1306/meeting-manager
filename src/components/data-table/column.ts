import type { ReactNode } from 'react'

// type Header<TData> = ReactNode | ((props: { column: TData }) => ReactNode)
type Header = ReactNode
type Cell<TData> = (props: { row: TData }) => ReactNode

type ColumnDefWithAccessorKey<TData> = {
  accessorKey: keyof TData
  id?: string
  cell?: Cell<TData>
}

type ColumnDefWithId<TData> = {
  accessorKey?: never
  id: string
  cell: Cell<TData>
}

export type ColumnDef<TData> = (
  | ColumnDefWithAccessorKey<TData>
  | ColumnDefWithId<TData>
) & {
  header: Header
}
