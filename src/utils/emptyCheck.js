const blank_pattern = /[\s]/g

export const emptyCheck = (value) => {
  if (blank_pattern.test(value)) return true
  else return false
}
