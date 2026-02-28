import { useState, useEffect } from 'react'
import {
  AlertTriangle,
  Check,
  CameraOff,
  XCircle,
  Loader2,
  MonitorX,
  RefreshCcw,
} from 'lucide-react'

type PermissionStatus =
  | 'idle'
  | 'loading'
  | 'granted'
  | 'denied'
  | 'no_device'
  | 'in_use'
  | 'unsupported'
  | 'error'

interface CameraPermissionProps {
  onGranted: () => void
}

export const CameraPermission = ({ onGranted }: CameraPermissionProps) => {
  const [status, setStatus] = useState<PermissionStatus>('idle')

  useEffect(() => {
    const checkInitialPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        })

        if (permissionStatus.state === 'granted') {
          setStatus('granted')
          onGranted()
        } else if (permissionStatus.state === 'denied') {
          setStatus('denied')
        }

        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            setStatus('granted')
            onGranted()
          } else if (permissionStatus.state === 'denied') {
            setStatus('denied')
          }
        }
      } catch (error) {
        console.warn(
          'Permissions APIがサポートされていないか、カメラの確認に失敗しました',
          error
        )
      }
    }

    checkInitialPermission()
  }, [onGranted])

  const requestPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('unsupported')
      return
    }

    setStatus('loading')

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      stream.getTracks().forEach((track) => track.stop())

      setStatus('granted')
      onGranted()
    } catch (error) {
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            setStatus('denied')
            break
          case 'NotFoundError':
            setStatus('no_device')
            break
          case 'NotReadableError':
            setStatus('in_use')
            break
          default:
            setStatus('error')
        }
      } else {
        setStatus('error')
      }
    }
  }

  const handleRetry = () => {
    if (status === 'denied') {
      window.location.reload()
    } else {
      requestPermission()
    }
  }

  const getUiContent = () => {
    switch (status) {
      case 'idle':
        return {
          icon: <AlertTriangle className="w-4 h-4 mr-2" />,
          text: 'カメラへのアクセスを許可する',
          className: 'bg-primary text-primary-foreground hover:bg-primary/90',
        }
      case 'loading':
        return {
          icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" />,
          text: 'アクセスを要求中...',
          className: 'bg-primary/50 text-primary-foreground',
        }
      case 'granted':
        return {
          icon: <Check className="w-4 h-4 mr-2 text-green-600" />,
          text: 'カメラへのアクセスが許可されました',
          className: 'bg-muted text-muted-foreground border border-input',
        }
      case 'denied':
        return {
          icon: <CameraOff className="w-4 h-4 mr-2" />,
          text: 'カメラへのアクセスが拒否されています',
          className:
            'bg-destructive/10 text-destructive border border-destructive/20',
        }
      case 'no_device':
        return {
          icon: <MonitorX className="w-4 h-4 mr-2" />,
          text: '利用できるカメラがありません',
          className: 'bg-muted text-muted-foreground border border-input',
        }
      case 'in_use':
        return {
          icon: <XCircle className="w-4 h-4 mr-2" />,
          text: 'カメラが他のアプリで使用されています',
          className:
            'bg-destructive/10 text-destructive border border-destructive/20',
        }
      case 'unsupported':
      case 'error':
        return {
          icon: <XCircle className="w-4 h-4 mr-2" />,
          text: 'カメラの起動に失敗しました',
          className:
            'bg-destructive/10 text-destructive border border-destructive/20',
        }
    }
  }

  const { icon, text, className } = getUiContent()
  const isErrorState = [
    'denied',
    'no_device',
    'in_use',
    'unsupported',
    'error',
  ].includes(status)
  const isButtonDisabled = status !== 'idle'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={requestPermission}
          disabled={isButtonDisabled}
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 h-9 px-4 py-2 ${className}`}
        >
          {icon}
          {text}
        </button>

        {isErrorState && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9 border"
            aria-label="再試行"
            title="再試行"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {status === 'denied' && (
        <p className="text-xs text-muted-foreground max-w-sm text-center mt-1">
          ブラウザのアドレスバーにあるアイコン（🔒など）をクリックし、カメラの権限をリセットしてから再試行してください。
        </p>
      )}
    </div>
  )
}
