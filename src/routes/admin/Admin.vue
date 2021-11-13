<template>
  <section class="flex justify-around items-center h-14 bg-blue-100">
    <RouterLink
      to="/admin/goodslist"
      class="border-2 border-solid rounded-md p-1 hover:text-gray-400">
      전체 제품 보기
    </RouterLink>
    <RouterLink
      to="/admin/selllist"
      class="border-2 border-solid rounded-md p-1 hover:text-gray-400">
      전체 판매 내역 보기
    </RouterLink>
    <RouterLink
      to="/admin/addGoods"
      class="border-2 border-solid rounded-md p-1 hover:text-gray-400">
      제품 추가 하기
    </RouterLink>
  </section>
  <RouterView />
</template>

<script>
export default {

}
</script>
