<template>
  <h1 class="text-2xl p-5">
    나의 계좌 정보
  </h1>
  <Loader :loading="loading" />
  <ul v-if="accounts.length > 0">
    <li
      v-for="account in accounts"
      :key="account.id">
    </li>
  </ul>
  <span v-else>연결된 계좌가 없습니다. ❌</span>
  <RouterLink
    to="/"
    class="border border-solid rounded-md p-2 bg-blue-300 text-white outline-none">
    추가 연결 하기
  </RouterLink>
</template>

<script>
export default {
  data(){
    return {
      totalBalance: 0,
      accounts: [],
      loading: false
    }
  },
  async mounted(){
    try {
      this.loading = true

      const {totalBalance, accounts} = await this.$myAccountInfo()
      this.totalBalance = totalBalance
      this.accounts = accounts
    } catch (error) {
      const title = error.response.data
      this.$swal.fire({
        title,
        icon: 'error'
      })
    } finally {
      this.loading = false
    }
  }
}
</script>
