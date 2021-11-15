<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h2 class="text-4xl p-10">
      전체 판매 내역 리스트
    </h2>
    <span v-if="!allList.length"> ❌ 판매 목록이 없습니다.  </span>
    <div
      v-else
      class="sticky top-10 right-0 left-0 flex justify-around items-center w-full h-14 bg-blue-50">
      <RouterLink
        to="/admin/selllist/allList"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        전체 판매 상품
      </RouterLink>
      <RouterLink
        to="/admin/selllist/reservationList"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        구매 요청 상품
      </RouterLink>
      <RouterLink
        to="/admin/selllist/sellList"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        구매 확정 상품
      </RouterLink>
      <RouterLink
        to="/admin/selllist/cancelList"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        취소 상품 목록
      </RouterLink>
    </div>
    <RouterView />
  </section>
</template>

<script>
export default {
  data(){
    return {
      list: [],
    }
  },
  computed: {
    allList(){
      return this.$store.state.admin.sellList
    }
  }
}
</script>

