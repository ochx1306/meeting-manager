import localforage from 'localforage'
import { APP_NAME } from '@/constants/app'

export const appStateStorage = localforage.createInstance({
  name: APP_NAME,
  storeName: 'AppState',
})
