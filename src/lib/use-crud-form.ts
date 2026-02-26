import { z } from 'zod'
import { useForm, type UseFormProps, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateAppId } from '@/lib/app-id'
import type { AppEntity } from './app-entity'

type CrudMode = 'create' | 'update'

export interface CrudFormProps<T extends AppEntity> {
  crudMode: CrudMode
  defaultValues?: T
  onSuccess: () => void
}

interface UseCrudFormProps<
  TFormValues extends FieldValues,
  TEntity extends AppEntity,
> extends UseFormProps<TFormValues> {
  crudMode: CrudMode
  formSchema?: z.ZodType<any, any, any>
  entityId?: TEntity['id']
  transform?: (data: TFormValues) => Omit<TEntity, 'id'>
  createItem: (item: TEntity) => void
  updateItem: (item: TEntity) => void
  onSuccess?: () => void
}

export const useCrudForm = <
  TFormValues extends FieldValues,
  TEntity extends AppEntity,
>({
  crudMode,
  formSchema,
  entityId,
  transform,
  createItem,
  updateItem,
  onSuccess,
  resolver,
  ...useFormOptions
}: UseCrudFormProps<TFormValues, TEntity>) => {
  const finalResolver =
    resolver || (formSchema ? zodResolver(formSchema) : undefined)

  const form = useForm<TFormValues>({
    resolver: finalResolver,
    ...useFormOptions,
  })

  const onSubmit = (data: TFormValues) => {
    const baseData = transform ? transform(data) : data

    if (crudMode === 'create') {
      createItem({
        ...baseData,
        id: entityId || generateAppId(),
      } as unknown as TEntity)
    } else {
      if (!entityId) return
      updateItem({
        ...baseData,
        id: entityId,
      } as unknown as TEntity)
    }

    onSuccess?.()
  }

  return { form, onSubmit }
}
