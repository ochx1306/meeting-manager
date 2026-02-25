import type { StateCreator } from 'zustand'
import type { AppEntity } from './app-entity'

export type CrudState<T extends AppEntity> = {
  items: T[]
  setItems: (items: T[]) => void
  createItem: (item: T) => void
  updateItem: (item: T) => void
  deleteItem: (id: string) => void
  getItem: (id: string) => T | undefined
}

export const createCrudSlice =
  <T extends AppEntity, State extends CrudState<T>>(): StateCreator<
    State,
    [],
    [],
    CrudState<T>
  > =>
  (set, get) => ({
    items: [],
    setItems: (items) => set({ items } as Partial<State>),
    createItem: (item) =>
      set((state) => ({ items: [...state.items, item] }) as Partial<State>),
    updateItem: (item) =>
      set(
        (state) =>
          ({
            items: state.items.map((i) => (i.id === item.id ? item : i)),
          }) as Partial<State>
      ),
    deleteItem: (id) =>
      set(
        (state) =>
          ({
            items: state.items.filter((i) => i.id !== id),
          }) as Partial<State>
      ),
    getItem: (id) => get().items.find((i) => i.id === id),
  })

export interface CrudStoreHook<T extends AppEntity> {
  <U>(selector: (state: CrudState<T>) => U): U
  (): CrudState<T>
  getState: () => CrudState<T>
}
