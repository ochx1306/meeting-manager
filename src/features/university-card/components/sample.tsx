import { useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'

interface UniversityCardProps {
  orgName?: string
  role?: string
  qrCodeUrl?: string
  logoUrl?: string
}

// 動作確認用のデフォルト値設定（実際は親コンポーネントからpropsで受け取る想定）
const UniversityCard = ({
  orgName = '財務局',
  role = '局長',
  qrCodeUrl = 'https://placehold.co/100x100/png?text=QR',
  logoUrl = 'src/features/university-card/images/AsiaUniversity_Logo.png',
}: UniversityCardProps) => {
  const cardRef = useRef(null)

  const downloadImage = useCallback(async () => {
    if (!cardRef.current) return

    try {
      // html-to-imageで要素をPNG化
      const dataUrl = await toPng(cardRef.current, { cacheBust: true })
      const link = document.createElement('a')
      link.download = 'univ-card.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('画像の生成に失敗しました', err)
    }
  }, [])

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* 名刺サイズ（91:55）を維持しつつ、QRを大きくするため全体を少し大きめに設定
       */}
      <div
        ref={cardRef}
        className="w-[455px] h-[275px] p-6 flex flex-col bg-white border border-gray-200 shadow-xl rounded-lg font-sans text-gray-800 box-border overflow-hidden"
      >
        {/* メインコンテンツエリア：左右分割 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 左カラム：ロゴ + 大学名 + 所属情報 */}
          <div className="flex-[1.5] flex flex-col pr-4 border-r border-gray-100">
            {/* ヘッダー部分 */}
            <div className="flex items-center gap-2 mb-6">
              <img
                src={logoUrl}
                alt="Univ Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-bold text-blue-900 leading-tight">
                亜細亜大学
                <br />
                Asia University
              </span>
            </div>

            {/* 所属・役職（中央配置されるようflex-1で調整） */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl font-black leading-tight break-all text-gray-900">
                {orgName}
              </div>
              <div className="text-base mt-3 text-gray-500 font-semibold tracking-wide">
                {role}
              </div>
            </div>
          </div>

          {/* 右カラム：巨大なQRコードエリア */}
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

        {/* フッター：最下部に固定 */}
        <footer className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-400 text-center italic">
          © 2026 Asia University Student Association Finance Burue. All Rights
          Reserved.
        </footer>
      </div>

      <button
        onClick={downloadImage}
        className="mt-8 px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg active:scale-95"
      >
        名刺画像を保存する
      </button>
    </div>
  )
}

export { UniversityCard }
