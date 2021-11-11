import axios from 'axios'

export default async function () {
  const token = localStorage.getItem('token')
  const { data } = await axios({
    url:'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method:'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'AhnGiHwan',
      'Authorization': `Bearer ${token}`
    },
  })
  // console.log('token', data)
  return data
}
