<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h1 class="text-4xl p-10">
      전체 판매 내역 리스트
    </h1>
    <Loader
      v-if="loading"
      :loading="loading" />
    <template v-else>
      <table
        v-if="sellList.length > 0">
        <thead>
          <tr>
            <th
              v-for="(head, i) in headName"
              :key="i">
              {{ head }}
            </th>
          </tr>
        </thead>
        <SellTable
          v-for="sell in sellList"
          :key="sell.detailId"
          :sell="sell" />
      </table>
      <span v-else> 구입한 상품이 없습니다. ❌</span>
    </template>
  </section>
</template>

<script>
import SellTable from './SellTable'
export default {
  components: {
    SellTable
  },
  data(){
    return {
      sellList: [],
      loading: false,
      headName: ['이메일','닉네임','제품 이름','제품 가격','결제 은행','계좌 번호','구매 일자','취소 여부','획정 여부']
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
