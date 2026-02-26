import { formatEra } from '@/lib/formatter'
import { generateAppId } from '@/lib/app-id'
import { CreateIconButton } from '@/components/icon-buttons'
import { ActionGuard } from '@/components/action-guard/ActionGuard'
import { useOrganizationStore } from '@/features/organization/organization-store'
import { useRoleStore } from '@/features/role/role-store'
import { useMemberStore } from '../member-store'

export const CreateAllMembersButton = () => {
  const fiscalYear = 2026

  const organizations = useOrganizationStore((state) => state.items)
  const roles = useRoleStore((state) => state.items)

  const setItems = useMemberStore((state) => state.setItems)

  const handleAction = () => {
    const members = organizations
      .map((o) => {
        return roles.map((r) => {
          return {
            id: generateAppId(),
            name: `${o.name} ${formatEra(fiscalYear)} ${r.name} 1`,
            organizationId: o.id,
            fiscalYear,
            roleId: r.id,
            index: 0,
          }
        })
      })
      .flat()

    setItems(members)
  }

  return (
    <ActionGuard
      onAction={handleAction}
      shouldConfirm
      title="全てのメンバーを作成しますか？"
      description="現在の組織と役職を参照し、すべてのメンバーを1つずつ作成します"
      renderTrigger={(handleTrigger) => (
        <CreateIconButton label="一括作成" onClick={handleTrigger} />
      )}
    />
  )
}
