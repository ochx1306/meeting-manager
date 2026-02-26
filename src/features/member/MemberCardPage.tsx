import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toPng } from 'html-to-image'
import type { AppId } from '@/lib/app-id'
import { formatEra } from '@/lib/formatter'
import { generateQrCodeDataUrl } from '@/lib/qr-code'
import {
  useOrganizationStore,
  awaitOrganizationStoreHydration,
} from '../organization/organization-store'
import { useRoleStore, awaitRoleStoreHydration } from '../role/role-store'
import { useMemberStore, awaitMemberStoreHydration } from './member-store'
import { MemberCard } from './components/MemberCard'

const MemberCardPage = () => {
  const { id } = useParams<{ id: string }>()
  const memberId = id as AppId

  const cardRef = useRef<HTMLDivElement>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  const getItem = useMemberStore((state) => state.getItem)
  const getOrganization = useOrganizationStore((state) => state.getItem)
  const getRole = useRoleStore((state) => state.getItem)

  const item = memberId ? getItem(memberId) : undefined

  useEffect(() => {
    if (!item) return

    let isMounted = true
    const fetchQrCode = async () => {
      try {
        const url = await generateQrCodeDataUrl(item)
        if (isMounted) {
          setQrCodeUrl(url)
        }
      } catch (err) {
        console.error('QRコードの生成に失敗しました', err)
      }
    }

    fetchQrCode()

    return () => {
      isMounted = false
    }
  }, [item])

  // 早期リターンの前にフックを配置するため、itemがundefinedでもエラーにならないよう安全に値を計算します
  const organizationName = item
    ? (getOrganization(item.organizationId)?.name ?? '所属不明')
    : ''
  const roleName = item ? (getRole(item.roleId)?.name ?? '役職不明') : ''
  const fiscalYear = item?.fiscalYear ?? 0
  const index = item?.index ?? 0

  const downloadImage = useCallback(async () => {
    if (!cardRef.current) return

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true })
      const link = document.createElement('a')
      link.download = `${organizationName}-${formatEra(fiscalYear)}-${roleName}-No.${index + 1}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('画像の生成に失敗しました', err)
    }
  }, [fiscalYear, index, organizationName, roleName])

  // すべてのフックの宣言が終わった後で、itemが存在しない場合の早期リターンを行います
  if (!item) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">メンバー情報が見つかりません</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <MemberCard
        organizationName={organizationName}
        fiscalYear={fiscalYear}
        roleName={roleName}
        index={index}
        qrCodeUrl={qrCodeUrl}
        cardRef={cardRef}
      />
      <button
        onClick={downloadImage}
        disabled={!qrCodeUrl}
        className="mt-8 px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        名刺画像を保存する
      </button>
    </div>
  )
}

const memberCardPageLoader = async () => {
  await Promise.all([
    awaitMemberStoreHydration(),
    awaitOrganizationStoreHydration(),
    awaitRoleStoreHydration(),
  ])
  return null
}

export { MemberCardPage as Component, memberCardPageLoader as loader }
