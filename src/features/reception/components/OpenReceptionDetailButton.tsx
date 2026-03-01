import { useNavigate } from 'react-router-dom'
import { OpenDetailIconButton } from '@/components/icon-buttons'
import type { Reception } from '../reception-schema'

export const OpenReceptionDetailButton = ({ item }: { item: Reception }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/reception/${item.id}`)
  }

  return <OpenDetailIconButton label="詳細" onClick={handleClick} />
}
