import { appIdSchema } from './app-id'
import type { AppEntity } from './app-entity'

// 暗号化アルゴリズム
const ALGORITHM = 'AES-GCM'

/**
 * 共通の暗号化キーを準備する関数
 * @param secretPhrase 共有のシークレット文字列（実際の運用では環境変数等から取得）
 */
export const getCryptoKey = async (
  secretPhrase: string
): Promise<CryptoKey> => {
  const encoder = new TextEncoder()
  // AES-256用に32バイトにパディング・調整
  const keyData = encoder.encode(secretPhrase.padEnd(32, '0').slice(0, 32))

  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: ALGORITHM },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * オブジェクトを暗号化し、QRコードに最適なBase64URL形式の文字列を生成する関数
 */
export const encryptQrData = async <T extends AppEntity>(
  data: T,
  key: CryptoKey
): Promise<string> => {
  const encoder = new TextEncoder()
  const jsonString = JSON.stringify(data)
  const encodedData = encoder.encode(jsonString)

  // AES-GCMに必要な初期化ベクトル(IV)をランダム生成
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encodedData
  )

  // IVと暗号化データ（認証タグ含む）を結合
  const encryptedArray = new Uint8Array(encryptedBuffer)
  const combinedArray = new Uint8Array(iv.length + encryptedArray.length)
  combinedArray.set(iv)
  combinedArray.set(encryptedArray, iv.length)

  // Uint8ArrayをBase64に変換し、URLセーフ（QRコードセーフ）に置換
  const binString = Array.from(combinedArray, (byte) =>
    String.fromCharCode(byte)
  ).join('')
  const base64 = btoa(binString)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * QRコードのBase64URL文字列を復号し、型安全なオブジェクトを返す関数
 */
export const decryptQrData = async <T extends AppEntity>(
  encryptedText: string,
  key: CryptoKey
): Promise<T> => {
  // Base64URLを標準のBase64に戻す
  let base64 = encryptedText.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }

  const binaryString = atob(base64)
  const combinedArray = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    combinedArray[i] = binaryString.charCodeAt(i)
  }

  // 先頭12バイトのIVと、残りの暗号化データに分離
  const iv = combinedArray.slice(0, 12)
  const encryptedData = combinedArray.slice(12)

  // 復号処理（改ざんされている場合はここで例外がスローされます）
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    encryptedData
  )

  const decoder = new TextDecoder('utf-8')
  const jsonString = decoder.decode(decryptedBuffer)
  const parsedData = JSON.parse(jsonString)

  // 実行時にZodでUUID v4のフォーマットチェックを実施
  appIdSchema.parse(parsedData.id)

  return parsedData as T
}
