import {
  createEnhancedFileTypeDefinition,
  type FileTypeDefinition,
} from './file-type'

const JSON_DEFINITION = {
  LABEL: 'JSON',
  MIME_TYPE: 'application/json',
  EXTENSIONS: ['json'],
} as const satisfies FileTypeDefinition

export const JSON = createEnhancedFileTypeDefinition(JSON_DEFINITION)
