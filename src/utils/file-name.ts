export const INVALID_FILE_NAME = {
  CHARS_REGEX: /[\\/:*?"<>|]/,
  CHARS: '\\ / : * ? " < > |',
}

export const isInvalidFileName = (name: string): boolean => {
  return INVALID_FILE_NAME.CHARS_REGEX.test(name)
}
