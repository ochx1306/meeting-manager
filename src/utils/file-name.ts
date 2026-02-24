export const INVALID_FILE_NAME = {
  CHARS_REGEX: /[\\/:*?"<>|]/,
  CHARS: '\\ / : * ? " < > |',
}

export const isInvalidFileName = (fileName: string): boolean => {
  return INVALID_FILE_NAME.CHARS_REGEX.test(fileName)
}
