import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { useCrudForm, type CrudFormProps } from '@/lib/use-crud-form'
import { BaseForm, BaseTextInput } from '@/components/form/'
import { organizationSchema, type Organization } from '../organization-schema'
import { useOrganizationStore } from '../organization-store'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const OrganizationForm = ({
  crudMode,
  defaultValues,
  onSuccess,
}: CrudFormProps<Organization>) => {
  const items = useOrganizationStore((state) => state.items)
  const createItem = useOrganizationStore((state) => state.createItem)
  const updateItem = useOrganizationStore((state) => state.updateItem)

  const { form, onSubmit } = useCrudForm<Organization, Organization>({
    defaultValues: defaultValues ?? {
      name: '',
      type: 'unit',
      parentId: null,
      validFrom: new Date(),
      isIndefinite: true,
      validTo: null,
      isProvisional: false,
      isSuspended: false,
    },
    crudMode,
    schema: organizationSchema,
    entityId: defaultValues?.id,
    createItem,
    updateItem,
    onSuccess,
  })

  const id = form.watch('id')
  const isIndefinite = useWatch({
    control: form.control,
    name: 'isIndefinite',
  })

  useEffect(() => {
    if (isIndefinite) {
      form.setValue('validTo', null)
    }
  }, [isIndefinite, form])

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseTextInput
        control={form.control}
        name="name"
        label="組織名"
        placeholder="組織名"
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>種別</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value ?? 'unit'}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="種別" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="unit">組織</SelectItem>
                <SelectItem value="group">グループ</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="parentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>親組織</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value ?? '-'}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="親組織" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="-">-</SelectItem>
                {items
                  .filter((item) => item.id !== id)
                  .map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="validFrom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>活動開始日</FormLabel>
            <FormControl>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isIndefinite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>活動終了日</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="isIndefinite-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isIndefinite-checkbox">未定</Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!isIndefinite && (
        <FormField
          control={form.control}
          name="validTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活動終了日</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value ?? undefined}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="isProvisional"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="isProvisional-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isProvisional-checkbox">仮認定</Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isSuspended"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="isSuspended-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isSuspended-checkbox">休止中</Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseForm>
  )
}
