<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h1 class="text-4xl p-10">
      로그인
    </h1>
    <div>
      <span>이메일</span>
      <input
        ref="email"
        v-model="email"
        class="border-b-2 border-solid outline-none pl-1"
        type="text" 
        @keypress.enter="onSubmit" />
    </div>
    <div>
      <span>비밀번호</span>
      <input
        ref="pw"
        v-model="pw"
        class="border-b-2 border-solid outline-none pl-1"
        type="password" 
        @keypress.enter="onSubmit" />
    </div>
    <button
      class="border-2 border-solid outline-none p-3 rounded-md bg-blue-300 text-white"
      @click="onSubmit">
      로그인하기
    </button>
    <Loader :loading="loading" />
  </section>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      pw: '',
      loading: false,
    }
  }, mounted(){
    this.$refs.email.focus()
  },
  methods:{
    async getAccountData(){
      try {
        const accountInfo = await this.$myAccountInfo()
        this.$store.dispatch('account/updateAccountInfo', accountInfo)
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({
          title,
          icon: 'error'
        })
      }
    },
    async onSubmit(){
      if(!this.validation()) return
      if(this.loading) return
      this.loading = true

      try {
        const res = await this.$login({
          email: this.email,
          password: this.pw
        })
        
        localStorage.setItem('token', res.accessToken)

        const currentAccount = await this.$myAccountInfo()

        this.$store.commit('account/assignState', {
          currentAccount
        })

        this.getAccountData()

        this.$router.push('/')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({
          title,
          icon: 'error'
        })
      } finally {
        this.loading = false
      }
    },
    validation(){
      const { email, pw} = this.$refs
      if(!email.value) {
        this.$swal({
          title: '이메일을 입력해 주세요.',
          icon: 'warning'
        }).then((value)=>{
          if(value)
            this.$refs.email.focus()
        })
        return false
      }
      if(!pw.value) {
        this.$swal.fire({
          title: '비밀번호를 입력해 주세요.',
          icon: 'warning'
        })
        return false
      }
      if(pw.value.length < 8) {
        this.$swal.fire({
          title: '비밀번호는 8자 이상 입력해 주세요.',
          icon: 'warning'
        })
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>
