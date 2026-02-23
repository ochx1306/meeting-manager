import type { ReactNode, HTMLAttributes, KeyboardEvent } from 'react'
import { cn } from '@/utils/cn'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type AppCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
  title: string
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  onClick?: () => void
}

export const AppCard = ({
  className,
  title,
  description,
  children,
  footer,
  onClick,
  ...props
}: AppCardProps) => {
  const isClickable = !!onClick

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(e)
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Card
      className={cn(
        'flex flex-col',
        isClickable &&
          'cursor-pointer hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <div className="flex-grow">
        {children && <CardContent>{children}</CardContent>}
      </div>

      {footer && (
        <CardFooter className="flex justify-end gap-2">{footer}</CardFooter>
      )}
    </Card>
  )
}
