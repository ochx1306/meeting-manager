import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { organizationSchema, type Organization } from '../organization-schema'
import { useOrganizationStore } from '../organization-store'
import {
  Form,
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { generateAppId } from '@/lib/app-id'

interface OrganizationFormProps {
  initialOrganization?: Organization
  onSuccess?: () => void
}

export const OrganizationForm = ({
  initialOrganization,
  onSuccess,
}: OrganizationFormProps) => {
  const isEditMode = !!initialOrganization

  const organizations = useOrganizationStore((state) => state.organizations)
  const createOrganization = useOrganizationStore(
    (state) => state.createOrganization
  )
  const updateOrganization = useOrganizationStore(
    (state) => state.updateOrganization
  )

  const form = useForm<Organization>({
    resolver: zodResolver(organizationSchema),
    defaultValues: isEditMode
      ? initialOrganization
      : {
          id: generateAppId(),
          name: '',
          type: 'unit',
          parentId: null,
          validFrom: new Date(),
          isIndefinite: true,
          validTo: null,
          isProvisional: false,
          isSuspended: false,
        },
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

  const onSubmit = (data: Organization) => {
    const formattedData = {
      ...data,
      parentId: data.parentId === '-' ? null : data.parentId,
    }

    if (isEditMode) {
      updateOrganization(formattedData)
    } else {
      createOrganization(formattedData)
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
              <FormLabel>組織名</FormLabel>
              <FormControl>
                <Input placeholder="組織名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                  {organizations
                    .filter((organization) => organization.id !== id)
                    .map((organization) => (
                      <SelectItem key={organization.id} value={organization.id}>
                        {organization.name}
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
        <Button type="submit">登録</Button>
      </form>
    </Form>
  )
}
