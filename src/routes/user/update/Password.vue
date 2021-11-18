<template>
  <section class="w-full">
    <h3 class="text-2xl p-5 text-center">
      비밀번호 변경
    </h3>
    <div class="flex flex-col justify-center items-center w-full">
      <div>
        <span>기존 비밀번호</span>
        <input
          ref="oldPassword"
          class="border-b-2 border-solid outline-none pl-1"
          type="password" />
      </div>
      <div>
        <span>변경할 비밀번호</span>
        <input
          ref="newPassword"
          class="border-b-2 border-solid outline-none pl-1"
          type="password" />
      </div>
      <div>
        <span>변경할 비밀번호 확인</span>
        <input
          ref="newPasswordConfirm"
          class="border-b-2 border-solid outline-none pl-1"
          type="password" />
      </div>
      <button
        class="border border-solid rounded-md p-2 bg-blue-300 text-white outline-none m-5"
        @click="onSubmit">
        수정하기
      </button>
      <Loader :loading="loading" />
    </div>
  </section>
</template>

<script>
import { emptyCheck } from '~/utils/emptyCheck'

export default {
data(){
    return {
      loading: false,
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    }
  },
  methods: {
    validation(){
      const { oldPassword, newPassword, newPasswordConfirm } = this.$refs
      if(oldPassword.value || newPassword.value || newPasswordConfirm.value) {
        if(!oldPassword.value){
          this.$swal.fire({ title: '기존 비밀번호를 적어주세요', icon: 'warning' })
          return false
        } else if (oldPassword.value.length < 8){
          this.$swal.fire({ title: '비밀번호는 8자 이상 입니다.', icon: 'warning' })
          return false
        } else if(emptyCheck(oldPassword.value)) {
          this.$swal.fire({ title: '비밀번호에 공백은 안됩니다.', icon: 'warning' })
          return false
        }

        if(!newPassword.value){
          this.$swal.fire({ title: '변경할 비밀번호를 적어주세요', icon: 'warning' })
          return false
        } else if (newPassword.value.length < 8){
          this.$swal.fire({ title: '비밀번호는 8자 이상 입니다.', icon: 'warning' })
          return false
        } else if(emptyCheck(newPassword.value)) {
          this.$swal.fire({ title: '변경할 비밀번호에 공백은 안됩니다.', icon: 'warning' })
          return false
        } else if(oldPassword.value === newPassword.value) {
          this.$swal.fire({ title: '변경할 비밀번호가 기존 비밀번호와 같습니다.', icon: 'warning' })
          return false
        }

        if(!newPasswordConfirm.value){
          this.$swal.fire({ title: '변경할 비밀번호 확인을 적어주세요', icon: 'warning' })
          return false
        } else if (newPasswordConfirm.value.length < 8){
          this.$swal.fire({ title: '비밀번호는 8자 이상 입니다.', icon: 'warning' })
          return false
        } else if(emptyCheck(newPasswordConfirm.value)) {
          this.$swal.fire({ title: '비밀번호 확인에 공백은 안됩니다.', icon: 'warning' })
          return false
        } else if(newPassword.value !== newPasswordConfirm.value){
          this.$swal.fire({ title: '변경할 두 비밀번호가 일치하지 않습니다', icon: 'warning' })
          return false
        }
      } else {
        this.$swal.fire({ title: '내용을 입력해 주세요.', icon: 'warning' })
        return false
      }
      return true
    },
    async onSubmit(){
      try {
        if(!this.validation()) return
        if(this.loader) return
        this.loader = true

        await this.$userPut({ oldPassword: this.$refs.oldPassword.value, newPassword: this.$refs.newPassword.value })

        this.$swal.fire({
          title: '비밀번호 수정 완료!',
          text: '비밀번호 변경으로 자동 로그아웃 됩니다. 다시 로그인 해주세요',
          icon: 'success'
        })

        this.$store.dispatch('user/logout')
        this.$store.dispatch('account/logout')
        this.$store.dispatch('admin/logout')
        this.$store.dispatch('buyList/logout')
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loader = false
      }
    }
  }
}
</script>
