<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h2 class="text-4xl p-10">
      전체 요청 목록
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
  computed: {
    reservationList(){
      return this.$store.getters['admin/reservationList']
    }
  }
}
</script>
