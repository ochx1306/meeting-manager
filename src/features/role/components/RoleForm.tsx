import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateAppId } from '@/lib/app-id'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { CrudFormProps } from '@/components/crud/crud-form'
import { roleFormSchema, type Role, type RoleFormValues } from '../role-schema'
import { useRoleStore } from '../role-store'

export const RoleForm = ({
  mode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Role>) => {
  const createItem = useRoleStore((state) => state.createItem)
  const updateItem = useRoleStore((state) => state.updateItem)

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    mode: 'onSubmit',
    defaultValues: defaultValues ?? { name: '' },
  })

  const onSubmit = (data: RoleFormValues) => {
    if (mode === 'create') {
      createItem({
        ...data,
        id: generateAppId(),
      })
    } else {
      if (!defaultValues?.id) return
      updateItem({
        ...data,
        id: defaultValues.id,
      })
    }

    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>役職名</FormLabel>
              <FormControl>
                <Input placeholder="役職名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">保存</Button>
      </form>
    </Form>
  )
}
