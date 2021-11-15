<template>
  <h2 class="text-4xl p-10">
    구매 요청 상품
  </h2>
  <span v-if="!reservationList.length"> ❌ 요청 목록이 없습니다.  </span>
  <template v-else>
    <table
      v-if="reservationList.length > 0">
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
        v-for="list in reservationList"
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
      headName: ['제품 이름', '제품 가격', '구매 요청 날짜', '구매확정', '구매 취소'],
    }
  },
  computed:{
    reservationList(){
      return this.$store.getters['buyList/reservationList']
    }
  },
}
</script>
