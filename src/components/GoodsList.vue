<template>
  <span class="ml-20 font-bold text-lg">{{ goodsList.length }}개의 제품</span>
  <section class="flex flex-wrap justify-start items-center w-3/4 m-auto">
    <div
      v-for="goods in goodsList"
      :key="goods.id"
      class="flex flex-col flex-wrap justify-center items-center w-32 border-2 border-solid border-black rounded-md m-1 cursor-pointer hover:bg-blue-200"
      @click="clickGoods(goods.id)">
      <img
        class="w-30 h-30 rounded-full p-2"
        :src="goods.thumbnail"
        alt="썸네일 이미지" />
      <h2>{{ goods.title }}</h2>
      <span>{{ goods.price.toLocaleString()+"원" }}</span>
    </div>
    <span v-if="goodsList.length === 0">제품이 없습니다</span>
  </section>
</template>

<script>
export default {
  computed:{
    goodsList(){
      return this.$store.state.goods.goodsList
    },
    isUpdate(){
      return this.$store.state.goods.update
    },
  },
  async mounted(){
    if(this.loading) return
    this.loading = true
    try {
      const goodsList = await this.$productsSearch() 
      this.$store.dispatch('goods/searchGoodsList', goodsList)
    } catch (error) {
      const title = error.response.data
      this.$swal.fire({
        title,
        icon: 'error'
      })
    } finally {
      this.loading = false
    }
  },
  methods:{
    clickGoods(id){
      this.$router.push({ name:'goodsInfo', params: { id } })
    }
  }
}
</script>

<style>

</style>
