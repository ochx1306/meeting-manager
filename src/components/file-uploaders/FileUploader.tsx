// import { useRef, type ChangeEvent } from 'react'
// import { Input } from '@/components/ui/input'
// import { ImportButton } from '../buttons/ImportButton'

// interface FileUploaderProps {
//   acceptValue: string
//   onFileUploaded: (file: File) => void
// }

// export const FileUploader = ({
//   acceptValue,
//   onFileUploaded,
// }: FileUploaderProps) => {
//   const inputRef = useRef<HTMLInputElement>(null)

//   const handleClickInput = () => {
//     inputRef.current?.click()
//   }

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       onFileUploaded(file)
//     }
//   }

//   return (
//     <>
//       <Input
//         type="file"
//         ref={inputRef}
//         accept={acceptValue}
//         onChange={handleFileChange}
//         className="hidden"
//       />
//       <ImportButton onClick={handleClickInput} />
//     </>
//   )
// }
