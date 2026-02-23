import {
  create,
  type StateCreator,
  type StoreApi,
  type UseBoundStore,
} from 'zustand'
import {
  persist,
  createJSONStorage,
  type PersistOptions,
} from 'zustand/middleware'
import localforage from 'localforage'

export type HydrationState = {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export type CustomPersistOptions<T extends object> = Omit<
  PersistOptions<T & HydrationState, Partial<T>>,
  'storage'
> & {
  driver?: LocalForage
}

export const createPartialAsyncStore = <T extends object>(
  initializer: StateCreator<T, [], []>,
  options: CustomPersistOptions<T>
) => {
  const { name, partialize, driver, ...persistOptions } = options

  const stateCreatorWithHydration: StateCreator<
    T & HydrationState,
    [['zustand/persist', unknown]],
    []
  > = (set, get, api) => ({
    ...initializer(set, get, api),
    _hasHydrated: false,
    setHasHydrated: (state: boolean) => {
      set({ _hasHydrated: state } as Partial<T & HydrationState>)
    },
  })

  const defaultPartialize = (state: T & HydrationState) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key, value]) => !key.startsWith('_') && typeof value !== 'function'
      )
    ) as Partial<T>

  const store = create<T & HydrationState>()(
    persist(stateCreatorWithHydration, {
      name,
      storage: createJSONStorage(() => driver || localforage),
      partialize: partialize ?? defaultPartialize,
      ...persistOptions,
    })
  )

  const unsub = store.persist.onFinishHydration(() => {
    store.getState().setHasHydrated(true)
    if (unsub) unsub()
  })

  return store
}

/**
 * Zustandのpersistストアの水和が完了するのを待つPromiseを返す関数を生成します。
 *
 * @param useStore - persistミドルウェアを使用したZustandストアのフック
 * @returns 水和完了を解決するPromiseを返す関数
 */
export const createHydrationAwaiter = <T extends HydrationState>(
  useStore: UseBoundStore<StoreApi<T>>
): (() => Promise<void>) => {
  const hydrationPromise = new Promise<void>((resolve) => {
    const state = useStore.getState()
    if (state._hasHydrated) return resolve()
    const unsubscribe = useStore.subscribe((newState) => {
      if (newState._hasHydrated) {
        resolve()
        unsubscribe()
      }
    })
  })
  return () => hydrationPromise
}
