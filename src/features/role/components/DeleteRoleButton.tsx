import { DeleteButton } from '@/components/crud/DeleteButton'
import type { Role } from '../role-schema'
import { useRoleStore } from '../role-store'

export const DeleteRoleButton = ({ item }: { item: Role }) => {
  const deleteItem = useRoleStore((state) => state.deleteItem)

  const handleDelete = () => {
    deleteItem(item.id)
  }

  return <DeleteButton itemName={item.name} handleDelete={handleDelete} />
}
