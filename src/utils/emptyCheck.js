const blank_pattern = /[\s]/g

export const emptyChekck = (value) => {
  if (blank_pattern.test(value)) return true
  else return false
}

export default emptyChekck
