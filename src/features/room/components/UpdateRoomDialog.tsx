import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useRoomStore } from '../room-store'
import { RoomForm } from './RoomForm'

interface UpdateRoomDialogProps {
  id: string
}

export const UpdateRoomDialog = ({ id }: UpdateRoomDialogProps) => {
  const room = useRoomStore((state) => state.getRoom(id))

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Pencil className="w-4 h-4" />
          会議室を更新
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>会議室を更新</DialogTitle>
          <DialogDescription>会議室を更新します</DialogDescription>
        </DialogHeader>

        <RoomForm initialRoom={room} onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
