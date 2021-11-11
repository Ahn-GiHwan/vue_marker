<template>
  <h1>sell list</h1>
  <Loader :loading="loading" />
  <ul v-if="sellList.length > 0">
    <li
      v-for="sell in sellList"
      :key="sell.detailDd">
      <span>{{ sell.user.email }}</span>
      <span>{{ sell.user.displayName }}</span>
      <span>{{ sell.product.title }}</span>
      <span>{{ sell.product.price }}</span>
      <span>{{ sell.account.bankName }}</span>
      <span>{{ sell.account.accountNumber }}</span>
      <span>{{ sell.timePaid }}</span>
      <span>{{ sell.isCanceled }}</span>
      <span>{{ sell.done }}</span>
      
      <button>수정 하기</button>
    </li>
  </ul>
  <span v-else> 구입한 상품이 없습니다. </span>
</template>

<script>
export default {
  data(){
    return {
      sellList: [],
      loading: false
    }
  },
  async mounted(){
    try {
      if(this.loading) return 
      this.loading = true

      const res = await this.$sellAll()
      this.sellList = [...res]
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

<style>

</style>
