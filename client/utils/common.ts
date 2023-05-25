export function fromArrayToObject<T extends {}>(arr: T[], key: keyof T): Record<string, T> {
  return arr.reduce((acc, item) => {
    acc[String(item[key])] = item
    return acc
  }, {} as Record<string, T>)
}

export function toByField<T extends { [key: string]: unknown }>(array: T[], field: string) {
  return fromArrayToObject(array, field)
}

export function parseCountryName(name: string) {
  const splitName = name.split(' ');
  return splitName.length > 1
    ? splitName[0].charAt(0) + splitName[1].charAt(0)
    : name.substring(0, 2);
}

export function convertCurrency(amount: number, rate: number) {
  const value = amount * rate  
  const stringValue = value.toFixed(2)
  return stringValue
}