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
import { Plus } from 'lucide-react'
import { OrganizationForm } from './OrganizationForm'

export const AddOrganizationDialog = () => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Plus className="w-4 h-4" />
          組織を追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>組織の新規作成</DialogTitle>
          <DialogDescription>
            新しい組織の情報を入力してください。保存ボタンでリストに追加されます。
          </DialogDescription>
        </DialogHeader>

        <OrganizationForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
