<template>
  <h1>SignUp</h1>
  <input
    v-model="id"
    type="text" /><br />
  <input
    v-model="pw"
    type="password" /><br />
  <input
    v-model="displayName"
    type="text" /><br />
  <button @click="signUp">
    signup!!
  </button>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      id: '',
      pw: '',
      displayName:''
    }
  },
  methods:{
    async signUp(){
      const res = await axios({
        url:'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
        method:'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'AhnGiHwan'
        },
        data: {
          email: this.id,
          password: this.pw,
          displayName: this.displayName
        }
      })

      console.log(res)
    }
  }
}
</script>

<style>

</style>
