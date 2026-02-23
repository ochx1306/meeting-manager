import type { ReactNode, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type MenuCardProps = Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'children'
> & {
  to: string
  title: string
  description: string
  icon: ReactNode
}

export const MenuCard = ({
  className,
  to,
  title,
  description,
  icon,
  ...props
}: MenuCardProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'group block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl',
        className
      )}
      {...props}
    >
      <Card className="flex flex-col h-full cursor-pointer hover:bg-muted/50 transition-colors border-gray-200">
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription className="truncate">{description}</CardDescription>
        </CardHeader>

        <div className="flex-grow">
          <CardContent className="flex flex-col items-center justify-center gap-2 pb-6">
            <div className="text-4xl transition-transform group-hover:scale-110 duration-200">
              {icon}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
