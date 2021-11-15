<template>
  <h2 class="text-4xl p-10">
    구매 확정 상품
  </h2>
  <span v-if="!buyList.length"> ❌ 확정 목록이 없습니다.  </span>
  <template v-else>
    <table
      v-if="buyList.length > 0">
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
        v-for="list in buyList"
        :key="list.id"
        :list="list" />
    </table>
  </template>
</template>

<script>
import Tbody from './BuyListTable.vue'

export default {
  components: {
    Tbody
  },
  data(){
    return {
      errorConetent: null,
      headName: ['제품 이름', '제품 가격', '구매 요청 날짜'],
    }
  },
  computed: {
    buyList(){
      return this.$store.getters['buyList/buyList']
    }
  }
}
</script>
