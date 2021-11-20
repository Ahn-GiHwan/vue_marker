const special_pattern = /[~!@#$%^&*()_+|<>?:{}]/

export const specialStringCheck = (value) => {
  if (special_pattern.test(value)) return true
  else return false
}

export default specialStringCheck
