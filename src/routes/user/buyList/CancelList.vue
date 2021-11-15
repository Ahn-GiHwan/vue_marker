<template>
  <h2 class="text-4xl p-10">
    구매 취소 상품
  </h2>
  <span v-if="!cancelList.length"> ❌ 취소 목록이 없습니다.  </span>
  <template v-else>
    <table
      v-if="cancelList.length > 0">
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
        v-for="list in cancelList"
        :key="list.id"
        :list="list" />
    </table>
  </template>
</template>

<script>
import Tbody from './BuyListTable'
export default {
  components: {
    Tbody
  },
  data(){
    return {
      errorConetent: null,
      loading: false,
      headName: ['제품 이름', '제품 가격', '첫 요청 날짜'],
    }
  },
  computed: {
    cancelList(){
      return this.$store.getters['buyList/cancelList']
    }
  }
}
</script>
