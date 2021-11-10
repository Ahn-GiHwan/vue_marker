<template>
  <h1>LogIn</h1>
  <input
    v-model="id"
    type="text" /><br />
  <input
    v-model="pw"
    type="password" /><br />
  <button @click="logIn">
    LogIn!!
  </button>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      id: '',
      pw: ''
    }
  },
  methods:{
    async logIn(){
      const { data } = await axios({
        url:'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
        method:'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'AhnGiHwan'
        },
        data: {
          email: this.id,
          password: this.pw
        }
      })

      console.log(data.accessToken)
      sessionStorage.setItem('accessToken', data.accessToken)
    }
  }
}
</script>

<style>

</style>
