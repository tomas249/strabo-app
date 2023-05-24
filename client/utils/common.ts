export function fromArrayToObject<T extends {}>(arr: T[], key: keyof T): Record<string, T> {
  return arr.reduce((acc, item) => {
    acc[String(item[key])] = item
    return acc
  }, {} as Record<string, T>)
}

export function toByField<T extends { [key: string]: string }>(array: T[], field: string) {
  return fromArrayToObject(array, field)
}