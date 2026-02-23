import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Toaster } from './components/ui/sonner'
import { awaitOrganizationHydration } from './features/organization/organization-store'
import { awaitRoomHydration } from './features/room/room-store'
import { awaitMeetingHydration } from './features/meeting/meeting-store'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/features/home/HomePage'),
  },
  {
    path: '/university-card',
    lazy: () => import('@/features/university-card/UniversityCardPage'),
  },
  {
    path: '/organization',
    lazy: () => import('@/features/organization/OrganizationPage'),
  },
  {
    path: '/room',
    lazy: () => import('@/features/room/RoomPage'),
  },
  {
    path: '/meeting',
    lazy: () => import('@/features/meeting/MeetingPage'),
  },
  {
    path: '/reception',
    lazy: () => import('@/features/reception/ReceptionPage'),
  },
])

const rootElement = document.getElementById('root')!

const initializeApp = async () => {
  try {
    await Promise.all([
      awaitOrganizationHydration(),
      awaitRoomHydration(),
      awaitMeetingHydration(),
    ])

    createRoot(rootElement).render(
      <StrictMode>
        <RouterProvider router={router} />
        <Toaster />
      </StrictMode>
    )
  } catch (error) {
    console.error(error)
    rootElement.innerHTML = 'アプリケーションの初期化に失敗しました。'
  }
}

initializeApp()
