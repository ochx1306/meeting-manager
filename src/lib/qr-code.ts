// import { z } from 'zod'
import QRCode from 'qrcode'
// import { appEntitySchema, type AppEntity } from './app-entity'
// import { getCryptoKey, encryptQrData, decryptQrData } from './crypto'

// export const generateQrCodeDataUrl = async (
//   entity: AppEntity
// ): Promise<string> => {
//   const secretPhrase = import.meta.env.VITE_SECRET_PHRASE

//   if (!secretPhrase) {
//     throw new Error('Secret phrase is not defined')
//   }

//   const key = await getCryptoKey(secretPhrase)

//   const encryptedString = await encryptQrData(entity, key)

//   const qrDataUrl = await QRCode.toDataURL(encryptedString, {
//     width: 256,
//     margin: 2,
//     color: {
//       dark: '#000000',
//       light: '#ffffff',
//     },
//   })

//   return qrDataUrl
// }

export const generateQrCodeDataUrl = async (text: string): Promise<string> => {
  const qrDataUrl = await QRCode.toDataURL(text, {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  })

  return qrDataUrl
}

// export const processScannedQrCode = async (
//   scannedString: string
// ): Promise<AppEntity> => {
//   const secretPhrase = import.meta.env.VITE_SECRET_PHRASE

//   if (!secretPhrase) {
//     throw new Error('Secret phrase is not defined')
//   }

//   try {
//     const key = await getCryptoKey(secretPhrase)

//     const decryptedData = await decryptQrData(scannedString, key)

//     const validatedData = appEntitySchema.parse(decryptedData)

//     return validatedData
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       console.error('データの型が不正です:', error.message)
//       throw new Error('Invalid data format')
//     } else {
//       console.error(
//         '復号に失敗しました。データが不正または改ざんされています。',
//         error
//       )
//       throw new Error('Decryption failed')
//     }
//   }
// }
