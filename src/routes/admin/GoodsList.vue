<template>
  <h1>goods list</h1>
  <Loader :loading="loading" />
  <ul v-if="goodsList.length > 0">
    <li
      v-for="goods in goodsList"
      :key="goods.id">
      <span>{{ goods.title }}</span>
      <span>{{ goods.price }}</span>
      <span>{{ goods.tags.join(' ') }}</span>
      <button>수정 하기</button>
    </li>
  </ul>
  <span v-else> 등록된 상품이 없습니다. </span>
</template>

<script>
export default {
  data(){
    return {
      goodsList: [],
      loading: false
    }
  },
  async mounted(){
    try {
      if(this.loading) return 
      this.loading = true

      const res = await this.$products()
      this.goodsList = [...res]
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
