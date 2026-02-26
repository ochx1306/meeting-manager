import { useNavigate } from 'react-router-dom'
import { OpenDetailIconButton } from '@/components/icon-buttons'
import type { Member } from '../member-schema'

export const OpenMemberDetailButton = ({ item }: { item: Member }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/member/${item.id}`)
  }

  return <OpenDetailIconButton label="詳細" onClick={handleClick} />
}
