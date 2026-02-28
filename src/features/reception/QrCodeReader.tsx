import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void
}

export default function QrScanner({ onScanSuccess }: QrScannerProps) {
  const containerId = 'qr-reader-container'
  const isScanning = useRef(false)
  const html5QrCode = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode(containerId)
    }

    const startScanner = async () => {
      if (isScanning.current) return

      try {
        await html5QrCode.current?.start(
          { facingMode: 'user' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScanSuccess(decodedText)
          },
          () => {}
        )
        isScanning.current = true
      } catch (err) {
        console.warn('カメラの起動に失敗しました:', err)
      }
    }

    startScanner()

    return () => {
      if (isScanning.current && html5QrCode.current) {
        html5QrCode.current
          .stop()
          .then(() => {
            html5QrCode.current?.clear()
            isScanning.current = false
          })
          .catch((err) => {
            console.warn('カメラの停止に失敗しました:', err)
          })
      }
    }
  }, [onScanSuccess])

  return (
    <div
      id={containerId}
      className="relative w-full max-w-sm mx-auto aspect-video overflow-hidden rounded-md bg-muted border"
    />
  )
}
