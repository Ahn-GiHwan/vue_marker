<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h2 class="text-4xl p-10">
      제품 추가하기
    </h2>
    <div>
      <span>이름*</span>
      <input
        ref="title"
        class="border-b-2 border-solid outline-none pl-1"
        type="text" />
    </div>
    <div>
      <span>가격*</span>
      <input
        ref="price"
        class="border-b-2 border-solid outline-none pl-1"
        type="number" />
    </div>
    <div>
      <span>상세 설명*</span><br />
      <textarea
        ref="description"
        class="border-2 border-solid"></textarea>
    </div>
    <div>
      <span>태그들(',' 로 구분)</span>
      <input
        ref="tags"
        placeholder="','로 구분"
        class="border-b-2 border-solid outline-none pl-1"
        type="text" />
    </div>
    <div class="flex m-10">
      <div class="flex flex-col items-center">
        <span>썸네일 사진</span>
        <input
          ref="thumbnailFile"
          type="file"
          @change="selecthumbnail" />
        <img
          :src="thumbnailBase64"
          class="w-40 h-40 border border-solid border-black p-3 "
          alt="썸네일 미리보기" />
      </div>
      <div class="flex flex-col items-center">
        <span>상세사진</span>
        <input
          ref="photoFile"
          type="file"
          @change="selectPhoto" />
        <img
          :src="photoBase64"
          class="w-40 h-40 border border-solid border-black p-3 "
          alt="상세사진 미리보기" />
      </div>
    </div>
    <button
      class="border-2 border-solid outline-none p-3 rounded-md bg-blue-300 text-white"
      type="button"
      @click="onSubmit">
      생성하기
    </button>
    <Loader :loading="loading" />
  </section>
</template>

<script>
import altImage from '~/utils/altImage'

export default {
  data(){
    return {
      thumbnailBase64: '',
      photoBase64: '',
      loading: false
    }
  },
  methods: {
    async onSubmit(){
      if(this.loading) return 
      this.loading = true

      try {
        const {title, price, description, tags} = this.$refs
        await this.$addProducts({
          title: title.value.trim(),
          price: price.value,
          description: description.value.trim(),
          tags: tags.value ? tags.value.split(',') : [],
          thumbnailBase64: this.thumbnailBase64 || altImage,
          photoBase64: this.photoBase64 || altImage
        })
        const res = await this.$products()
        await this.$store.dispatch('admin/updateAdmin', { goodsList: res })
        this.resetInput()
        this.$swal.fire({ title: '제품이 추가되었습니다.', icon: 'success' })
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loading = false
      } 
    },
    resetInput(){
      const {title, price, description, thumbnailFile, photoFile} = this.$refs
      title.value = ''
      price.value = ''
      description.value = ''
      thumbnailFile.file = ''
      photoFile.file = ''
      this.thumbnailBase64 = ''
      this.photoBase64 = ''
    },
    selecthumbnail(e){
      const { files } = e.target
      for (const file of files){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', ()=>{
          this.thumbnailBase64 = reader.result
        })
      }
    },
    selectPhoto(e){
      const { files } = e.target
      for (const file of files){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', ()=>{
          this.photoBase64 = reader.result
        })
      }
    }
  }
}
</script>
