import { useOrganizationStore } from '@/features/organization/organization-store'
import { useRoleStore } from '@/features/role/role-store'
import { useMemberStore } from '@/features/member/member-store'
import { useMeetingRoomStore } from '@/features/meeting-room/meeting-room-store'
import { useMeetingStore } from '@/features/meeting/meeting-store'
import { useReceptionStore } from '@/features/reception/reception-store'

export const exportAppData = () => {
  const data = {
    organizations: useOrganizationStore.getState().items,
    roles: useRoleStore.getState().items,
    members: useMemberStore.getState().items,
    meetingRooms: useMeetingRoomStore.getState().items,
    meetings: useMeetingStore.getState().items,
    receptions: useReceptionStore.getState().items,
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'meeting-manager-data.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 選択されたJSONファイルからデータを読み込み、各ストアを上書きする関数
export const importAppData = async (file: File) => {
  const text = await file.text()
  const data = JSON.parse(text)

  // 万が一データが欠損していた場合にアプリがクラッシュしないよう、空配列をフォールバックにしています
  useOrganizationStore.getState().setItems(data.organizations || [])
  useRoleStore.getState().setItems(data.roles || [])
  useMemberStore.getState().setItems(data.members || [])
  useMeetingRoomStore.getState().setItems(data.meetingRooms || [])
  useMeetingStore.getState().setItems(data.meetings || [])
  useReceptionStore.getState().setItems(data.receptions || [])
}
