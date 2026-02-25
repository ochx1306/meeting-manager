import type { ReactNode } from 'react'
import type { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface BaseFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  children: ReactNode
  submitLabel?: string
  className?: string
}

export const BaseForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  submitLabel = '保存',
  className,
}: BaseFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
      >
        {children}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  )
}
