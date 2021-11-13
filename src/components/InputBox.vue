<template>
  <section class="flex w-full justify-center items-center h-10 my-20">
    <input
      ref="searchText"
      type="search"
      placeholder="M1 맥북"
      class="border-black border-b-2 outline-none" 
      @keypress.enter="onSubmit" />
    <button @click="onSubmit">
      검색
    </button>
    <Loader :loading="loading" />
  </section>
</template>

<script>
export default {
  data(){
    return {
      loading: false
    }
  },
  mounted() {
    this.$refs.searchText.focus()
  },
  methods: {
    async onSubmit(){
      if(this.loading) return
      this.loading = true

      try {
        const { searchText } = this.$refs
        const goodsList = await this.$productsSearch({
          searchText: searchText.value
        }) 

        this.$store.dispatch('goods/searchGoodsList', goodsList)
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
}
</script>
