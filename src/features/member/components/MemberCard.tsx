import type { RefObject } from 'react'
import { formatEra } from '@/lib/formatter'
import logo from '/images/asia-university-logo.png'

interface MemberCardProps {
  organizationName: string
  fiscalYear: number
  roleName: string
  index: number
  qrCodeUrl: string
  cardRef: RefObject<HTMLDivElement | null>
}

const MemberCard = ({
  organizationName,
  fiscalYear,
  roleName,
  index,
  qrCodeUrl,
  cardRef,
}: MemberCardProps) => {
  if (!qrCodeUrl.length) {
    return null
  }

  return (
    <div
      ref={cardRef}
      className="w-[455px] h-[275px] p-6 flex flex-col bg-white border border-gray-200 shadow-xl rounded-lg font-sans text-gray-800 box-border overflow-hidden"
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[1.5] flex flex-col pr-4 border-r border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Asia" className="w-8 h-8 object-contain" />
            <span className="text-sm font-bold text-blue-900 leading-tight">
              亜細亜大学
              <br />
              Asia University
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="text-xl font-black leading-tight break-all text-gray-900">
              {organizationName}
            </div>
            <div className="text-base mt-3 text-gray-500 font-semibold tracking-wide">
              {formatEra(fiscalYear)} {roleName} No.{index + 1}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pl-4">
          <div className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">
            Scan for Entry
          </div>
          <div className="w-32 h-32 bg-white p-1 border-2 border-gray-900 rounded-lg shadow-sm">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <footer className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-400 text-center italic">
        © 2026 Asia University Student Association Finance Burue. All Rights
        Reserved.
      </footer>
    </div>
  )
}

export { MemberCard }
