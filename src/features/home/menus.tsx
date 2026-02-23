import {
  Building2,
  Monitor,
  CalendarCheck,
  ScanQrCode,
  ChartLine,
  CircleQuestionMark,
  Settings,
} from 'lucide-react'

export const menus = [
  {
    id: 1,
    to: 'organization',
    title: '組織を管理',
    description: '組織の登録、変更、削除',
    icon: <Building2 />,
  },
  {
    id: 2,
    to: 'room',
    title: '会議室を管理',
    description: '会議室の登録、変更、削除',
    icon: <Monitor />,
  },
  {
    id: 3,
    to: 'meeting',
    title: '会議を管理',
    description: '会議の作成、変更、削除',
    icon: <CalendarCheck />,
  },
  {
    id: 4,
    to: 'reception',
    title: '会議の受付',
    description: '会議の受付',
    icon: <ScanQrCode />,
  },
  {
    id: 5,
    to: 'analytics',
    title: '分析',
    description: '会議の分析',
    icon: <ChartLine />,
  },
  {
    id: 6,
    to: 'guide',
    title: 'ガイド',
    description: 'アプリの使い方',
    icon: <CircleQuestionMark />,
  },
  {
    id: 7,
    to: 'settings',
    title: '設定',
    description: 'アプリの設定',
    icon: <Settings />,
  },
]
