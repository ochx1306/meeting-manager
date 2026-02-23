import {
  createEnhancedFileTypeDefinition,
  type FileTypeDefinition,
} from './file-type'

const CSV_DEFINITION = {
  LABEL: 'CSV',
  MIME_TYPE: 'text/csv',
  EXTENSIONS: ['csv'],
} as const satisfies FileTypeDefinition

export const CSV = createEnhancedFileTypeDefinition(CSV_DEFINITION)
