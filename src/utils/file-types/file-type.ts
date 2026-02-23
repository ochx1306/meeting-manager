/**
 * ファイル形式定義
 */
export type FileTypeDefinition = {
  readonly LABEL: string
  readonly MIME_TYPE: string
  readonly EXTENSIONS: readonly string[]
}

/**
 * 派生プロパティを含む、拡張されたファイル形式定義
 */
export type EnhancedFileTypeDefinition = FileTypeDefinition & {
  /**
   * ドット付きの拡張子配列 (例: ['.jpg', '.jpeg'])
   */
  readonly DOT_EXTENSIONS: readonly string[]

  /**
   * HTMLのaccept属性やHTTPヘッダーに適した、
   * MIMEタイプと拡張子をカンマ区切りで結合した文字列
   * (例: 'image/jpeg,.jpg,.jpeg')
   */
  readonly ACCEPT_VALUE: string
}

// type MultipleFileTypeDefinition = {
//   readonly LABEL: string
//   readonly FILE_TYPE_DEFINITIONS: readonly FileTypeDefinition[]
// }

export type EnhancedMultipleFileTypeDefinition = Omit<
  EnhancedFileTypeDefinition,
  'MIME_TYPE'
> & {
  readonly MIME_TYPES: readonly string[]
}

const formatDotExtension = (extension: string): string => {
  return `.${extension}`
}

const formatDotExtensions = (extensions: readonly string[]): string[] => {
  return extensions.map(formatDotExtension)
}

const generateAcceptValue = (
  mimeTypes: string[],
  dotExtensions: string[]
): string => {
  return `${mimeTypes.join(',')},${dotExtensions.join(',')}`
}

export const createEnhancedFileTypeDefinition = (
  definition: FileTypeDefinition
): EnhancedFileTypeDefinition => {
  const dotExtensions = formatDotExtensions(definition.EXTENSIONS)
  const acceptValue = generateAcceptValue([definition.MIME_TYPE], dotExtensions)

  return {
    ...definition,
    DOT_EXTENSIONS: dotExtensions,
    ACCEPT_VALUE: acceptValue,
  }
}

// const createMultipleFileTypeDefinition = (
//   multipleDefinition: MultipleFileTypeDefinition
// ): EnhancedMultipleFileTypeDefinition => {
//   const extensions = multipleDefinition.FILE_TYPE_DEFINITIONS.flatMap(
//     (definition) => definition.EXTENSIONS
//   )
//   const mimeTypes = multipleDefinition.FILE_TYPE_DEFINITIONS.map(
//     (definition) => definition.MIME_TYPE
//   )
//   const dotExtensions = formatDotExtensions(extensions)
//   const acceptValue = generateAcceptValue(mimeTypes, dotExtensions)

//   return {
//     LABEL: multipleDefinition.LABEL,
//     MIME_TYPES: mimeTypes,
//     EXTENSIONS: extensions,
//     DOT_EXTENSIONS: dotExtensions,
//     ACCEPT_VALUE: acceptValue,
//   }
// }
