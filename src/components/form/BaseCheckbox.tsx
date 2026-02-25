import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface BaseCheckboxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
}

export const BaseCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
}: BaseCheckboxProps<T>) => {
  const checkboxId = `${String(name)}-checkbox`

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={checkboxId}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor={checkboxId}>{label}</Label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
