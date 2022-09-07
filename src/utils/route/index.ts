const getAsString = (value?: string | string[]): string => {
  if (!value) {
    return ''
  }

  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

export default {
  getAsString
}
