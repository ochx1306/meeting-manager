// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Toaster } from './components/ui/sonner'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/features/home/HomePage'),
  },
  {
    path: '/organization',
    lazy: () => import('@/features/organization/OrganizationPage'),
  },
  {
    path: 'role',
    lazy: () => import('@/features/role/RolePage'),
  },
  {
    path: '/member',
    lazy: () => import('@/features/member/MemberPage'),
  },
  {
    path: '/member/:id',
    lazy: () => import('@/features/member/MemberCardPage'),
  },
  {
    path: '/meeting-room',
    lazy: () => import('@/features/meeting-room/MeetingRoomPage'),
  },
  {
    path: '/meeting',
    lazy: () => import('@/features/meeting/MeetingPage'),
  },
  {
    path: '/reception',
    lazy: () => import('@/features/reception/ReceptionPage'),
  },
  {
    path: '/reception/:id',
    lazy: () => import('@/features/reception/ReceptionDetailPage'),
  },
])

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
  // </StrictMode>
)
