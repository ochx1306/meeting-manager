import { useState, useCallback, useRef } from 'react'

interface UseAudioFeedbackProps {
  initialVolume?: number
  initialMuted?: boolean
  onVolumeChange?: (volume: number) => void
  onMuteChange?: (muted: boolean) => void
}

export const useAudioFeedback = ({
  initialVolume = 0.5,
  initialMuted = false,
  onVolumeChange,
  onMuteChange,
}: UseAudioFeedbackProps = {}) => {
  const [volume, setVolumeState] = useState(initialVolume)
  const [isMuted, setIsMutedState] = useState(initialMuted)
  // AudioContextはユーザー操作後に初期化する必要があるためRefで保持
  const audioCtxRef = useRef<AudioContext | null>(null)

  const setVolume = useCallback(
    (newVolume: number) => {
      setVolumeState(newVolume)
      if (onVolumeChange) onVolumeChange(newVolume)
    },
    [onVolumeChange]
  )

  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev
      if (onMuteChange) onMuteChange(next)
      return next
    })
  }, [onMuteChange])

  // 実際の音声ファイル(mp3等)を使う場合は、ここを new Audio('success.mp3') の再生処理に差し替えます
  // 今回はアセットなしですぐ動くようにWeb Audio APIで電子音を生成します
  const playTone = useCallback(
    (frequency: number, type: OscillatorType, duration: number) => {
      if (isMuted || volume === 0) return

      // 初回再生時にAudioContextを生成（ブラウザのAutoplay制限対策）
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)()
      }

      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

      // 音量制御と、クリックノイズを防ぐためのフェードアウト
      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
      )

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.start()
      oscillator.stop(ctx.currentTime + duration)
    },
    [isMuted, volume]
  )

  const playSuccess = useCallback(() => {
    // ピロン♪ という高めの音
    playTone(880, 'sine', 0.1) // A5
    setTimeout(() => playTone(1318.51, 'sine', 0.2), 100) // E6
  }, [playTone])

  const playError = useCallback(() => {
    // ブブッ という警告音
    playTone(300, 'sawtooth', 0.1)
    setTimeout(() => playTone(300, 'sawtooth', 0.2), 150)
  }, [playTone])

  return {
    volume,
    setVolume,
    isMuted,
    toggleMute,
    playSuccess,
    playError,
  }
}
