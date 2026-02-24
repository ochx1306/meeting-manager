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
    to: 'role',
    title: '役職を管理',
    description: '役職の登録、変更、削除',
    // temp
    icon: <Building2 />,
  },
  {
    id: 3,
    to: 'member',
    title: 'メンバーを管理',
    description: 'メンバーの登録、変更、削除',
    // temp
    icon: <Building2 />,
  },
  {
    id: 4,
    to: 'room',
    title: '会議室を管理',
    description: '会議室の登録、変更、削除',
    icon: <Monitor />,
  },
  {
    id: 5,
    to: 'meeting',
    title: '会議を管理',
    description: '会議の作成、変更、削除',
    icon: <CalendarCheck />,
  },
  {
    id: 6,
    to: 'reception',
    title: '会議の受付',
    description: '会議の受付',
    icon: <ScanQrCode />,
  },
  {
    id: 7,
    to: 'analytics',
    title: '分析',
    description: '会議の分析',
    icon: <ChartLine />,
  },
  {
    id: 8,
    to: 'guide',
    title: 'ガイド',
    description: 'アプリの使い方',
    icon: <CircleQuestionMark />,
  },
  {
    id: 9,
    to: 'settings',
    title: '設定',
    description: 'アプリの設定',
    icon: <Settings />,
  },
]
