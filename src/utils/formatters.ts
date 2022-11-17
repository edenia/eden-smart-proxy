export const formatWithThousandSeparator = (
  value: string,
  precision: number
): string => {
  if (!value || isNaN(+value)) {
    return value
  }

  let newValue = parseFloat(value)

  if (precision >= 0) {
    newValue = +newValue.toFixed(precision)
  }

  const comma = newValue.toString().split('.')

  return `${comma[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
    comma[1] ? `.${comma[1]}` : ''
  }`
}
