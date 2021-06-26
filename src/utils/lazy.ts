export const lazy = <T>(initFunction: () => T) => {
  let value: T | null = null

  return (): T => {
    if (value === null) {
      value = initFunction()
    }

    return value
  }
}
