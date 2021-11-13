<template>
  <section class="w-full">
    <h3 class="text-2xl p-5 text-center">
      닉네임 수정
    </h3>
    <div class="flex justify-center items-center w-full">
      <span>닉네임</span>
      <input
        ref="displayName"
        :value="currentUser.displayName"
        :placeholder="currentUser.displayName"
        class="border-b-2 border-solid outline-none pl-1"
        type="text" />
      <button
        class="border border-solid rounded-md p-2 bg-blue-300 text-white outline-none m-5"
        @click="onSubmit">
        수정하기
      </button>
      <Loader :loading="loading" />
      <Alert
        :show="show"
        :title="title" />
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      show: false,
      title: '',
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    }
  },
  methods: {
    validation(){
      const { displayName } = this.$refs
      if(!displayName.value){
        this.$swal.fire({
          title: '닉네임을 적어주세요',
          icon: 'warning'
        })
        return false
      }
      return true
    },
    async onSubmit(){
      try {
        if(!this.validation()) return
        if(this.loader) return
        this.loader = true

        const displayName = this.$refs.displayName.value
        const currentUser = await this.$userPut({
          displayName
        })

        this.$store.dispatch('user/update', currentUser)

        this.show = true
        this.title = '닉네임 수정이 완료되었습니다.'
        setTimeout(() => {
          this.show = false
        }, 5000)

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
