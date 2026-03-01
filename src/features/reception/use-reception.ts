import { useState, useCallback } from 'react'
import type { ScanResult } from '@/components/qr/ReceptionScanner'

interface UseReceptionParams {
  initialAttendedIds?: string[]
  allowedIds?: string[]
  onSuccess?: (id: string) => void
}

export const useReception = ({
  initialAttendedIds = [],
  allowedIds = [],
  onSuccess,
}: UseReceptionParams = {}) => {
  // 既に受付が完了したIDを保持するステート
  const [attendedIds, setAttendedIds] = useState<string[]>(initialAttendedIds)

  const handleScan = useCallback(
    async (decodedText: string): Promise<ScanResult> => {
      // ネットワーク越しのAPI通信（データベースでの照合など）を想定し、
      // 意図的に非同期関数として定義しています

      const scannedId = decodedText.trim()

      // 1. 重複チェック
      if (attendedIds.includes(scannedId)) {
        return {
          status: 'duplicate',
          message: '既に受付済みです',
        }
      }

      // 2. 許可リストとの照合（制限がある場合のみ）
      if (allowedIds.length > 0 && !allowedIds.includes(scannedId)) {
        return {
          status: 'error',
          message: '参加対象外のIDです',
        }
      }

      // 3. 成功処理（受付済みリストに追加）
      // ※実際はここでバックエンドのAPI（受付完了エンドポイント）を叩く処理が入ります
      setAttendedIds((prev) => [...prev, scannedId])

      if (onSuccess) onSuccess(scannedId)

      return {
        status: 'success',
        message: '受付を完了しました',
      }
    },
    [allowedIds, attendedIds, onSuccess]
  )

  const resetAttended = useCallback(() => {
    setAttendedIds([])
  }, [])

  return {
    attendedIds,
    handleScan,
    resetAttended,
    attendeeCount: attendedIds.length,
  }
}
