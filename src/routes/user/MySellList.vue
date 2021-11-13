<template>
  <h1 class="text-2xl p-5">
    나의 구매 목록
  </h1>
  <Loader
    v-if="loading"
    :loading="loading" />
  <template v-else>
    <ul v-if="sellList.length > 0">
      <li
        v-for="sell in sellList"
        :key="sell.id">
        {{ sell.product.title }}
        <button>구매 확정</button>
        <button>구매 취소</button>
      </li>
    </ul>
    <span v-else>{{ errorConetent }} ❌</span>
  </template>
</template>

<script>
export default {
  data(){
    return {
      sellList: [],
      errorConetent: '',
      loading: false
    }
  },
  async mounted(){
    try {
      this.loading = true

      const res = await this.$sellAllList()
      this.sellList = res
    } catch (error) {
      this.errorConetent = error.response.data
    } finally {
      this.loading = false
    }
  }
}
</script>
