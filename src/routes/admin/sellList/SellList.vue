<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h2 class="text-4xl p-10">
      구매 확정 목록
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
          :key="list.detailId"
          :list="list" />
      </table>
      <span v-else> 구입한 상품이 없습니다. ❌</span>
    </template>
  </section>
</template>

<script>
import Tbody from './SellListTable'

export default {
  components: {
    Tbody
  },
  data(){
    return {
      headName: ['이메일', '닉네임', '제품 이름', '제품 가격', '결제 은행', '계좌 번호', '구매 일자', '상태'],
    }
  },
  computed:{
    buyList(){
      return this.$store.getters['admin/buyList']
    }
  }
}
</script>
