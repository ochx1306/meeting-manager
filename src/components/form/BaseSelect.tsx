import type { Control, FieldValues, Path } from 'react-hook-form'
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

export interface SelectOption {
  label: string
  value: string
}

interface BaseSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  options: SelectOption[]
  placeholder?: string
  allowClear?: boolean
  clearLabel?: string
}

export const BaseSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  allowClear = false,
  clearLabel = '-',
}: BaseSelectProps<T>) => {
  const UNSELECTED_VALUE = 'unselected'

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isEmpty =
          field.value === null ||
          field.value === undefined ||
          field.value === ''

        const selectValue = isEmpty
          ? allowClear
            ? UNSELECTED_VALUE
            : undefined
          : String(field.value)

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={(val) => {
                field.onChange(val === UNSELECTED_VALUE ? null : val)
              }}
              value={selectValue}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {allowClear && (
                  <SelectItem value={UNSELECTED_VALUE}>{clearLabel}</SelectItem>
                )}
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
