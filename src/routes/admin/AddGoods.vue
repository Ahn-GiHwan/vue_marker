<template>
  <h1>AddGoods</h1>

  <div>
    <span>이름</span>
    <input
      ref="title"
      type="text" />
  </div>
  <div>
    <span>가격</span>
    <input
      ref="price"
      type="number" />
  </div>
  <div>
    <span>상세 설명</span>
    <textarea ref="description"></textarea>
  </div>
  <div>
    <span>태그들</span>
    <input
      ref="tags"
      type="text" />
  </div>
  <div>
    <span>썸네일 사진</span>
    <input type="file" />
  </div>
  <div>
    <span>상세사진</span>
    <input type="file" />
  </div>
  <button
    type="button"
    @click="onSubmit">
    생성하기
  </button>
  <Loader :loading="loading" />
</template>

<script>
export default {
  data(){
    return {
      thumbnailBase64: '',
      photoBase64: '',
      loading: false
    }
  },
  methods: {
    onSubmit(){
      if(this.loading) return 
      this.loading = true

      try {
        const {title, price, description} = this.$refs
        this.$addProducts({
          title: title.value,
          price: price.value,
          description: description.value,
          tags: [],
          thumbnailBase64: this.thumbnailBase64,
          photoBase64: this.photoBase64
        })
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

<style>

</style>
