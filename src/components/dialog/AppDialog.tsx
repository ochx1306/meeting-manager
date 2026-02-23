import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface AppDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  children: (onSuccess: () => void) => ReactNode
}

export const AppDialog = ({
  trigger,
  title,
  description,
  children,
}: AppDialogProps) => {
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
