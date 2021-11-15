<template>
  <Loader
    v-if="loading"
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    :loading="loading"
    :size="100"
    :width="10" />
  <template v-else>
    <section
      class="sticky top-10 right-0 left-0 flex justify-around items-center h-14 bg-blue-200 z-10">
      <RouterLink
        to="/admin/goodslist"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        전체 제품 보기 ({{ goodsList }})
      </RouterLink>
      <RouterLink
        to="/admin/selllist"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        전체 판매 내역 보기 ({{ sellList }})
      </RouterLink>
      <RouterLink
        to="/admin/addGoods"
        class="border-2 border-solid rounded-md border-white p-1 hover:text-gray-400">
        제품 추가 하기
      </RouterLink>
    </section>
    <RouterView />
  </template>
</template>

<script>
export default {
  data(){
    return {
      loading: false
    }
  },
  computed: {
    goodsList(){
      return this.$store.state.admin.goodsList.length
    },
    sellList(){
      return this.$store.state.admin.sellList.length
    }
  },
  async mounted(){
    await this.getData()
  },
  methods: {
    async getData(){
      try {
        if(this.loading) return 
        this.loading = true

        await Promise.all([this.$products(), this.$sellAll()]).then(async (value) => {
          await this.$store.dispatch('admin/updateAdmin', { goodsList: value[0] })
          await this.$store.dispatch('admin/updateAdmin', { sellList: value[1] })
        })
      } catch (error) {
        console.log(error.response.data)
        this.$store.dispatch('admin/goodsListNull')
        this.$store.dispatch('admin/sellListNull')
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
