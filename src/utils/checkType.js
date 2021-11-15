const blank_pattern = /[\s]/g

export default (value) => {
  if (blank_pattern.test(value)) return true
  else return false
}
