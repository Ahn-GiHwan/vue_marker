<template>
  <section class="flex flex-col w-full justify-center items-center">
    <div class="relative flex justify-center items-center m-2">
      <img
        class="aboutImg block w-40 h-40 rounded-full overflow-hidden"
        :src="currentUser.profileImg"
        alt="프로필 이미지" />
      <div class="flex flex-col justify-center ml-5">
        <span>이메일 | {{ currentUser.email }}</span>
        <span>닉네임 | {{ currentUser.displayName }}</span>
      </div>
    </div>
    <div
      class="sticky top-10 right-0 left-0 flex justify-around items-center w-full h-14 bg-blue-200">
      <RouterLink
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400"
        to="/about/update">
        내 정보 수정
      </RouterLink>
      <RouterLink
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400"
        to="/about/myaccount">
        내 계좌정보 ({{ $store.state.account.accounts.length }})
      </RouterLink>
      <RouterLink
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400"
        to="/about/mybuylist">
        내 구매 목록 ({{ $store.state.buyList.allList.length }})
      </RouterLink>
    </div>
    <RouterView />
  </section>
</template>
<script>
export default {
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    },
    isUpdateBuyList(){
      return this.$store.state.buyList.update
    },
  },
  async mounted(){
    if(this.isUpdateBuyList) return
    try {
      this.loading = true
      const res = await this.$buyAllList()
      await this.$store.dispatch('buyList/updateBuyList', { allList: res })
      await this.$store.dispatch('buyList/update')
    } catch (error) {
      await this.$store.dispatch('buyList/update')
    } finally {
      this.loading = false
    }
  }
}
</script>
