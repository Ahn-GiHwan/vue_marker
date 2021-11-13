import axios from 'axios'

export default async function () {
  const token = localStorage.getItem('token')
  const { data } = await axios({
    url:'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method:'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': process.env.apiKey,
      'username': process.env.username,
      'Authorization': `Bearer ${token}`
    },
  })
  console.log('auth', data)
  return data
}
