<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h1 class="text-4xl p-10">
      전체 제품 리스트
    </h1>
    <Loader
      v-if="loading"
      :loading="loading" />
    <template v-else>
      <table
        v-if="goodsList.length > 0">
        <thead>
          <tr>
            <th
              v-for="(head, i) in headName"
              :key="i">
              {{ head }}
            </th>
          </tr>
        </thead>
        <GoodsListTable
          v-for="goods in goodsList"
          :key="goods.id"
          :goods="goods" />
      </table>
      <span v-else> 등록된 상품이 없습니다. ❌</span>
    </template>
  </section>
  <RouterView />
</template>

<script>
import GoodsListTable from './GoodsListTable.vue'

export default {
  components: {
    GoodsListTable
  },
  data(){
    return {
      goodsList: [],
      loading: false,
      headName: ['이름', '가격', '판매 여부', '상세 & 수정']
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
