<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h1 class="text-4xl p-10">
      회원 가입
    </h1>
    <div>
      <span>이메일*</span>
      <input
        ref="email"
        v-model="email"
        class="border-b-2 border-solid outline-none pl-1 w-1/2"
        type="text" />
      @
      <select
        ref="select"
        class="border-b-2 border-solid outline-none pl-1">
        <option value="">
          선택
        </option>
        <option value="naver.com">
          네이버
        </option>
        <option value="daum.com">
          다음
        </option>
        <option value="google.com">
          구글
        </option>
      </select>
    </div>
    <div>
      <span>비밀번호*</span>
      <input
        ref="pw"
        v-model="pw"
        class="border-b-2 border-solid outline-none pl-1"
        type="password" />
    </div>
    <div>
      <span>비밀번호 확인*</span>
      <input
        ref="pwConfirm"
        v-model="pwConfirm"
        class="border-b-2 border-solid outline-none pl-1"
        type="password"
        autocomplete="off" />
    </div>
    <div>
      <span>닉네임*</span>
      <input
        ref="displayName"
        v-model="displayName"
        class="border-b-2 border-solid outline-none pl-1"
        type="text" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <span>프로필 사진</span>
      <input
        type="file"
        @change="selectFile" />
      <img
        :src="profileImgBase64"
        class="w-40 h-40 border border-solid border-black p-3 "
        alt="이미지 미리보기" />
    </div>
    
    <button
      class="border-2 border-solid outline-none p-3 rounded-md bg-blue-300 text-white"
      @click="onSubmit">
      signup!!
    </button>
  </section>
</template>

<script>
import defaultImage from '~/utils/altImage'
import emptyCheck from '~/utils/emptyCheck'
import specialStringCheck from '~/utils/specialStringCheck'

export default {
  data(){
    return {
      email: '',
      pw: '',
      pwConfirm:'',
      displayName: '',
      profileImgBase64: null,
      loading: false
    }
  },mounted(){
    this.$refs.email.focus()
  },
  methods:{
    async onSubmit(){
      if(!this.validation()) return
      if(this.loading) return
      this.loading = true

      try {
        await this.$signup({
          email: `${this.email.trim()}@${this.$refs.select.value}`,
          password: this.pw.trim(),
          displayName: this.displayName.trim(),
          profileImgBase64: this.profileImgBase64 || defaultImage
        })
        this.$swal.fire({
          title: '회원가입 성공!',
          text: '로그인 화면으로 이동합니다.',
          icon: 'success'
        })
        this.$router.push('/login')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon:'error' })
      } finally {
        this.loading = false
      }
    },
    selectFile(e){
      const { files } = e.target
      for (const file of files){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.profileImgBase64 = reader.result
        })
      }
    },
    validation(){
      const { email, select, pw, pwConfirm, displayName } = this.$refs
      if(!email.value) {
        this.$swal({ title: '이메일을 입력해 주세요.', icon: 'warning' })
        return false
      } else if(emptyCheck(email.value)) {
        this.$swal.fire({ title: '이메일에 공백은 안됩니다.', icon: 'warning' })
        return false
      } else if(specialStringCheck(email.value)) {
        this.$swal.fire({ title: '이메일에 특수문자는 안됩니다.', icon: 'warning' })
        return false
      } else if(!select.value) {
        this.$swal.fire({ title: '이메일을 선택해 주세요.', icon: 'warning' })
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
      
      if(!pwConfirm.value) {
        this.$swal.fire({ title: '비밀번호 확인을 입력해 주세요.', icon: 'warning' })
        return false
      } else if(pw.value !== pwConfirm.value) {
        this.$swal.fire({ title: '비밀번호와 비밀번호 확인이 맞지 않습니다.', icon: 'warning' })
        return false
      }

      if(!displayName.value) {
        this.$swal.fire({ title: '닉네임을 입력해 주세요.', icon: 'warning' })
        return false
      } else if(emptyCheck(displayName.value)) {
        this.$swal.fire({ title: '닉네임에 공백은 안됩니다.', icon: 'warning' })
        return false
      }

      return true
    }
  }
}
</script>

<style>

</style>
