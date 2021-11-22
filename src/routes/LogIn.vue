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
      class="border-2 border-solid outline-none p-3 my-2 rounded-md bg-blue-300 text-white"
      @click="onSubmit">
      로그인
    </button>
    <a
      class="outline-none p-1 rounded-m cursor-pointer underline"
      @click="$router.push('/signup')">
      회원가입하러 가기
    </a>
    <Loader :loading="loading" />
  </section>
</template>

<script>
import emptyCheck from '~/utils/emptyCheck'

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
        await this.$store.dispatch('account/updateAccountInfo', accountInfo)
        if(!accountInfo.totalBalance) {
          this.$openAlert('현재 등록된 계좌가 없습니다!', '계좌를 등록하러 가시겠습니까?', '/about/myaccount/addaccount')
        } else {
          this.$openAlert('로그인 성공', '환영합니다😄')
        }
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      }
    },
    async onSubmit(){
      if(!this.validation()) return
      if(this.loading) return
      this.loading = true

      try {
        const res = await this.$login({ email: this.email.trim(), password: this.pw.trim() })
        localStorage.setItem('token', res.accessToken)
        const currentAccount = await this.$myAccountInfo()
        this.$router.push('/')
        await this.$store.commit('account/assignState', { currentAccount })
        this.getAccountData()
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loading = false
      }
    },
    validation(){
      const { email, pw } = this.$refs
      if(!email.value) {
        this.$swal.fire({ title: '이메일을 입력해 주세요.', icon: 'warning' })
        return false
      } else if(emptyCheck(email.value)) {
        this.$swal.fire({ title: '이메일에 공백은 안됩니다.', icon: 'warning' })
        return false
      }

      if(!pw.value) {
        this.$swal.fire({ title: '비밀번호를 입력해 주세요.', icon: 'warning' })
        return false
      } else if(emptyCheck(pw.value)) {
        this.$swal.fire({ title: '비밀번호에 공백은 안됩니다.', icon: 'warning' })
        return false
      } else if(pw.value.length < 8) {
        this.$swal.fire({ title: '비밀번호는 8자 이상 입력해 주세요.', icon: 'warning' })
        return false
      }

      return true
    }
  }
}
</script>
