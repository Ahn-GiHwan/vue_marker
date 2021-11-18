<template>
  <section class="flex w-full justify-center items-center h-40 mt-10 mb-20 bg-blue-50">
    <div class="flex flex-col">
      <div>
        <span>제목</span>
        <input
          ref="searchText"
          type="search"
          placeholder="M1 맥북"
          class="border-black border-b-2 pl-2 outline-none bg-transparent" 
          @keypress.enter="onSubmit" />
      </div>
      <div>
        <span>태그</span>
        <input
          ref="searchTags"
          type="tag"
          placeholder="(','로 구분) ex)맥북, m1"
          class="border-black border-b-2 pl-2 outline-none bg-transparent"
          @keypress.enter="onSubmit" />
      </div>
    </div>
    <button
      class="border-2 border-solid outline-none ml-3 p-3 rounded-md bg-blue-300 text-white"
      @click="onSubmit">
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
        const { searchText, searchTags } = this.$refs
        const goodsList = await this.$productsSearch({
          searchText: searchText.value,
          searchTags: searchTags.value.split(',')
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
