<template>
  <header class="z-10	 flex justify-end items-center h-10 bg-blue-400">
    <template
      v-if="currentUser">
      <img
        class="block w-7 h-7 rounded-full overflow-hidden mr-2"
        :src="currentUser.profileImg"
        alt="프로필 이미지" />
      <span>[{{ currentUser.displayName }}]님😎</span>
      <RouterLink
        to="/"
        class="mx-3">
        홈
      </RouterLink>
      <RouterLink
        to="/about"
        class="mx-3">
        마이페이지
      </RouterLink>
      <RouterLink
        v-if="currentUser.email === admin"
        to="/admin"
        class="mx-3">
        관리자페이지
      </RouterLink>
      <button
        class="mr-3"
        @click="onLogout">
        로그아웃
      </button>
    </template>
    <template v-else>
      <RouterLink
        to="/login">
        로그인
      </RouterLink>
      <RouterLink
        to="/signup"
        class="mx-3">
        회원가입
      </RouterLink>
    </template>
  </header>
</template>

<script>
export default {
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    },
    admin(){
      return process.env.admin
    },
    altImage(){
      return 'http://placehold.it/100x100.png/000000/ffffff?text=?'
    }
  },methods: {
    async onLogout(){
      this.$swal.fire({
        title: '정말 로그아웃 하시겠습니까?',
        icon: 'question',
        showCancelButton:true,
      }).then( async ({ isConfirmed }) => {
        if(isConfirmed) {
           const res = await this.$logout()

          if(res) {
            this.$swal.fire({
              title: '로그아웃이 완료되었습니다.',
              icon: 'success'
            })
            this.$store.dispatch('user/logout')
            this.$store.dispatch('account/logout')
            localStorage.removeItem('token')
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>
