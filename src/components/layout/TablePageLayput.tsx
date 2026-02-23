import type { ReactNode } from 'react'

interface TablePageLayoutProps {
  title: string
  action?: ReactNode
  children: ReactNode
}

export const TablePageLayout = ({
  title,
  action,
  children,
}: TablePageLayoutProps) => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}
