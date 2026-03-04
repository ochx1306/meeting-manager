import { Button } from '@/components/ui/button'
import { importAppData, exportAppData } from '@/lib/data-sync'

const SettingPage = () => {
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await importAppData(file)
      // 必要であればここで「インポート完了」のトースト通知などを出す
    }
  }

  return (
    <>
      <Button onClick={exportAppData}>Export</Button>

      <input type="file" accept="application/json" onChange={handleImport} />
    </>
  )
}

export { SettingPage as Component }
