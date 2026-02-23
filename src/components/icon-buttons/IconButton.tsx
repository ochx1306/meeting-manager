import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface IconButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon
  label: string
  showLabel?: boolean
  iconClassName?: string
}

const IconButton = ({
  icon: Icon,
  label,
  showLabel = true,
  className,
  iconClassName,
  onClick,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <>
      <Button
        size={showLabel ? 'default' : 'icon'}
        className={cn('gap-2', className)}
        aria-label={label}
        title={label}
        onClick={onClick}
        {...props}
      >
        <Icon className={cn('h-4 w-4', iconClassName)} aria-hidden="true" />
        {showLabel && <span>{label}</span>}
        {children}
      </Button>
    </>
  )
}

export { IconButton, type IconButtonProps }
