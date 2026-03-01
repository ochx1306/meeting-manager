import { useState, useCallback, useRef } from 'react'
import {
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  Volume2,
  VolumeX,
  Play,
} from 'lucide-react'
import { QrScanner } from './QrScanner'
import { CameraPermission } from '../permissions/CameraPermission'
import { useAudioFeedback } from './use-audio-feedback'

export type ScanStatus = 'success' | 'error' | 'duplicate'

export interface ScanResult {
  status: ScanStatus
  message: string
}

interface ReceptionScannerProps {
  eventName: string
  onScan: (decodedText: string) => Promise<ScanResult>
  resetDelayMs?: number
  className?: string
  initialVolume?: number
  initialMuted?: boolean
}

type ReceptionScannerState = 'initial' | 'scanning' | 'processing' | 'result'

export const ReceptionScanner = ({
  eventName,
  onScan,
  resetDelayMs = 2000,
  className = '',
  initialVolume = 0.5,
  initialMuted = false,
}: ReceptionScannerProps) => {
  const [scannerState, setScannerState] =
    useState<ReceptionScannerState>('initial')
  const [cameraGranted, setCameraGranted] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const isProcessing = useRef(false)

  // 音声フィードバックフックの呼び出し
  const { volume, setVolume, isMuted, toggleMute, playSuccess, playError } =
    useAudioFeedback({ initialVolume, initialMuted })

  const handleScanSuccess = useCallback(
    async (decodedText: string) => {
      if (scannerState !== 'scanning' || isProcessing.current) return

      isProcessing.current = true
      setScannerState('processing')

      try {
        const result = await onScan(decodedText)
        setScanResult(result)
        setScannerState('result')

        // 状態に応じて音声を再生
        if (result.status === 'success') {
          playSuccess()
        } else {
          playError()
        }

        setTimeout(() => {
          setScannerState('scanning')
          setScanResult(null)
          isProcessing.current = false
        }, resetDelayMs)
      } catch (error) {
        setScanResult({
          status: 'error',
          message: `スキャンに失敗しました: ${error}`,
        })
        setScannerState('result')
        playError() // エラー時も音を鳴らす

        setTimeout(() => {
          setScannerState('scanning')
          setScanResult(null)
          isProcessing.current = false
        }, resetDelayMs)
      }
    },
    [scannerState, onScan, resetDelayMs, playSuccess, playError]
  )

  const handleStart = () => {
    setScannerState('scanning')
  }

  const handleEnd = () => {
    setScannerState('initial')
    setMenuOpen(false)
    setScanResult(null)
    isProcessing.current = false
  }

  if (scannerState === 'initial') {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[60vh] gap-8 p-4 ${className}`}
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{eventName}</h1>
          <p className="text-muted-foreground">受付システムを起動します</p>
        </div>

        <div className="p-6 bg-card rounded-xl border shadow-sm flex flex-col items-center gap-6 w-full max-w-sm">
          <CameraPermission onGranted={() => setCameraGranted(true)} />

          {/* 音量コントロールUI */}
          <div className="w-full space-y-4 bg-slate-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                音量設定
              </label>
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                aria-label={isMuted ? 'ミュート解除' : 'ミュート'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                disabled={isMuted}
                className="w-full accent-primary"
              />
              <button
                onClick={playSuccess}
                disabled={isMuted}
                className="p-2 bg-white border shadow-sm rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 text-primary"
                title="試し聞き"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>

          {cameraGranted && (
            <button
              onClick={handleStart}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-md font-medium text-lg transition-colors"
            >
              <Camera className="w-5 h-5" />
              受付を開始する
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-white text-slate-900 ${className}`}
    >
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          {eventName}
        </h1>
        <div className="flex items-center gap-2">
          {/* ヘッダーのミュート切り替えボタン */}
          {/* <button
            onClick={toggleMute}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-600"
            aria-label={isMuted ? 'ミュート解除' : 'ミュート'}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button> */}

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="メニュー"
            >
              <MoreVertical className="w-6 h-6 text-slate-700" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
                <button
                  onClick={handleEnd}
                  className="w-full text-left px-4 py-3 text-sm text-destructive hover:bg-slate-50 font-medium"
                >
                  受付を終了する
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="absolute top-24 left-0 w-full z-20 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur shadow-md px-6 py-3 rounded-full border text-base font-bold text-center min-w-[280px]">
          {scannerState === 'scanning' && 'QRコードをかざしてください'}
          {scannerState === 'processing' && '確認中...'}
          {scannerState === 'result' && scanResult?.message}
        </div>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/5">
        <div
          className={`w-full h-full transition-opacity duration-300 ${scannerState === 'scanning' ? 'opacity-100' : 'opacity-30 blur-sm'}`}
        >
          <QrScanner onScanSuccess={handleScanSuccess} />
        </div>

        {scannerState === 'result' && scanResult && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="transform scale-100 animate-in zoom-in-50 duration-300 ease-out">
              {scanResult.status === 'success' && (
                <div className="bg-white/90 rounded-full p-4 shadow-2xl">
                  <CheckCircle2 className="text-green-500 w-40 h-40" />
                </div>
              )}
              {scanResult.status === 'error' && (
                <div className="bg-white/90 rounded-full p-4 shadow-2xl">
                  <XCircle className="text-red-500 w-40 h-40" />
                </div>
              )}
              {scanResult.status === 'duplicate' && (
                <div className="bg-white/90 rounded-full p-4 shadow-2xl">
                  <AlertCircle className="text-yellow-500 w-40 h-40" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
