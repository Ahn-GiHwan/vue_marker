<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h2 class="text-4xl p-10">
      전체 제품 리스트 ({{ goodsList.length }})
    </h2>
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
        <Tbody
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
import Tbody from './GoodsListTable'

export default {
  components: {
    Tbody
  },
  data(){
    return {
      loading: false,
      headName: ['이름', '가격', '판매 여부', '상세 & 수정']
    }
  },
  computed:{
    goodsList(){
      return this.$store.state.admin.goodsList
    }
  },
}
</script>
