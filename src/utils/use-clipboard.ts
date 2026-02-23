import { useState } from 'react'

export const useClipboard = () => {
  const [isCopying, setIsCopying] = useState(false)

  const copyText = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const copyImage = async (url: string): Promise<boolean> => {
    setIsCopying(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const data = [new ClipboardItem({ [blob.type]: blob })]
      await navigator.clipboard.write(data)
      return true
    } catch (err) {
      console.error(err)
      return false
    } finally {
      setIsCopying(false)
    }
  }

  return { copyText, copyImage, isCopying }
}
