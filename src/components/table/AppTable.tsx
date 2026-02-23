import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ColumnDef } from './column'

interface AppTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  getRowId?: (row: TData) => string | number
}

const AppTable = <TData,>({
  columns,
  data,
  getRowId,
}: AppTableProps<TData>) => {
  // const renderHeader = (column: ColumnDef<TData>) => {
  //   return typeof column.header === 'function'
  //     ? column.header({ column })
  //     : column.header
  // }
  const getColumnKey = (column: ColumnDef<TData>, index: number) => {
    return column.id || String(column.accessorKey) || index
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, i) => (
            <TableHead key={getColumnKey(column, i)}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, y) => (
          <TableRow key={getRowId ? getRowId(row) : y}>
            {columns.map((column, x) => (
              <TableCell key={x}>
                {column.cell
                  ? column.cell({ row })
                  : column.accessorKey
                    ? String(row[column.accessorKey])
                    : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { AppTable }
