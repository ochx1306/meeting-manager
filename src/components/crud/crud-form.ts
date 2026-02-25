export interface CrudFormProps<T> {
  crudMode: 'create' | 'update'
  defaultValues?: T
  onSuccess: () => void
}
