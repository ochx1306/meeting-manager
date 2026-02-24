export interface CrudFormProps<T> {
  mode: 'create' | 'update'
  defaultValues?: T
  onSuccess: () => void
}
