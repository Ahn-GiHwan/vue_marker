<template>
  <h2 class="text-2xl p-5">
    나의 구매 목록
  </h2>
  <span v-if="!allList"> ❌ 구매 내역이 존재하지 않습니다. </span>
  <template v-else>
    <div
      class="sticky top-10 right-0 left-0 flex justify-around items-center w-full h-14 bg-blue-200">
      <RouterLink
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400"
        to="/about/mybuylist/reservationList">
        요청 목록 ({{ reservation }})
      </RouterLink>
      <RouterLink
        to="/about/mybuylist/buyList"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        구매 목록 ({{ buy }})
      </RouterLink>
      <RouterLink
        to="/about/mybuylist/cancellist"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        취소 목록 ({{ cancel }})
      </RouterLink>
    </div>
    <RouterView />
  </template>
</template>

<script>
export default {
  computed: {
    allList(){
      return this.$store.state.buyList.allList.length
    },
    reservation(){
      return this.$store.getters['buyList/reservationList'].length
    },
    buy(){
      return this.$store.getters['buyList/buyList'].length
    },
    cancel(){
      return this.$store.getters['buyList/cancelList'].length
    },
  },
}
</script>
