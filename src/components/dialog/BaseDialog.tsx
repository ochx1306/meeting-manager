import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface BaseDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  children: (onSuccess: () => void) => ReactNode
}

export const BaseDialog = ({
  trigger,
  title,
  description,
  children,
}: BaseDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children(handleSuccess)}
      </DialogContent>
    </Dialog>
  )
}
