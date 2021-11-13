<template>
  <section class="w-full">
    <h3 class="text-2xl p-5 text-center">
      이미지 수정
    </h3>
    <div class="flex flex-col justify-center items-center w-full">
      <input
        ref="file"
        class="cursor-pointer"
        type="file"
        @change="selectFile" />
      <img
        :src="profileImgBase64"
        class="w-40 h-40 border border-solid border-black p-3 "
        alt="이미지 미리보기" />
      <div class="flex justify-around items-center mt-5 w-1/3">
        <button
          v-if="profileImgBase64"
          class="border border-solid rounded-md p-2 bg-red-300 text-white outline-none"
          @click="reset">
          선택 취소
        </button>
        <button
          class="border border-solid rounded-md p-2 bg-blue-300 text-white outline-none"
          @click="onSubmit">
          수정하기
        </button>
        <button
          v-if="currentUser.profileImg"
          class="border border-solid rounded-md p-2 bg-green-300 text-white outline-none"
          @click="removeImg">
          기본 이미지로 설정
        </button>
      </div>
      <Loader :loading="loading" />
    </div>
  </section>
</template>

<script>
import profileImgBase64 from '~/utils/altImage'
export default {
  data(){
    return {
      profileImgBase64: '',
      loading: false,
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    }
  },
  methods:{
    validation(){
      if(!this.profileImgBase64){
        this.$swal.fire({
          title: '이미지 파일을 올려주세요',
          icon: 'warning'
        })
        return false
      }
      return true
    },
    selectFile(e){
      const { files } = e.target
      for (const file of files){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', ()=>{
          this.profileImgBase64 = reader.result
        })
      }
    },
    reset(){
      this.$refs.file.value = ''
      this.profileImgBase64 = ''
    },
    async onSubmit(){
      try {
        if(!this.validation()) return
        if(this.loader) return
        this.loader = true

        const currentUser = await this.$userPut({
          profileImgBase64: this.profileImgBase64,
        })

        this.$store.dispatch('user/update', currentUser)
        this.$openAlert('프로필 이미지가 변경되었습니다.')
        this.reset()
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loader = false
      }
    },
    async removeImg(){
      try {
        if(this.loader) return
        this.loader = true

        const currentUser = await this.$userPut({
          profileImgBase64
        })

        this.$store.dispatch('user/update', currentUser)
        this.$openAlert('기본 이미지로 변경되었습니다.')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({
          title,
          icon: 'error'
        })
      } finally {
        this.loader = false
      }
    }
  }
}
</script>
