import { useEffect, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

export const QrCodeReader = () => {
  const [scannedResult, setScannedResult] = useState('')

  useEffect(() => {
    // 【改善1】実験的機能：ブラウザ標準の爆速API（Barcode Detector）があれば使用する
    const html5QrCode = new Html5Qrcode('qr-reader-container', {
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
      verbose: true,
    })

    const startScanning = async () => {
      try {
        await html5QrCode.start(
          // 【改善2】PCのインカメラを指定しつつ、理想的な高解像度（フルHD）を要求する
          {
            facingMode: 'user',
            // width: { ideal: 1920 },
            // height: { ideal: 1080 },
          },
          {
            fps: 10,
            // 【改善3】qrboxはあえて設定せず、ビデオ領域全体からQRコードを探させる
            // これにより、画面のどこに映っていても、どんなサイズでも解析しやすくなります
          },
          (decodedText) => {
            setScannedResult(decodedText)
          },
          () => {
            // スキャン失敗時は何もしない
          }
        )
      } catch (err) {
        console.error('カメラの起動に失敗しました', err)
      }
    }

    startScanning()

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error)
      }
    }
  }, [])

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>高精度QRリーダー</h2>

      <div
        id="qr-reader-container"
        style={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
        }}
      >
        <strong>読み取り結果:</strong>
        <p
          style={{
            wordBreak: 'break-all',
            margin: '10px 0 0',
            fontFamily: 'monospace',
          }}
        >
          {scannedResult ||
            'QRコードをカメラにかざしてください（ピントが合うように少し離すと読み取りやすいです）'}
        </p>
      </div>
    </div>
  )
}
