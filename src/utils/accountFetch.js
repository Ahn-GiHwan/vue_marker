import axios from 'axios'

export const getMyAccountInfo = async () => {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': process.env.apiKey,
      'username': process.env.username, 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
  return data
}

export const getAbleBanks = async () =>{
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': process.env.apiKey,
      'username': process.env.username, 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return data
}
