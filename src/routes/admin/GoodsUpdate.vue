<template>
  <section class="flex flex-col justify-center items-center w-full">
    <Loader
      v-if="loading"
      :loading="loading" />
    <div
      v-else
      class="relative flex flex-col justify-center items-center p-5 w-full">
      <h2 class="text-4xl p-10">
        제품 상세보기 & 수정하기
      </h2>
      <div>
        <span>이름*</span>
        <input
          ref="title"
          v-model="title"
          class="border-b-2 border-solid outline-none pl-1"
          type="text" />
      </div>
      <div class="m-2">
        <span>가격*</span>
        <input
          ref="price"
          v-model="price"
          class="border-b-2 border-solid outline-none pl-1"
          type="number" />
      </div>
      <div>
        <span>상세 설명*</span><br />
        <textarea
          ref="description"
          v-model="description"
          class="border-2 border-solid"></textarea>
      </div>
      <div class="m-2">
        <span>태그들(',' 로 구분)</span>
        <input
          ref="tags"
          v-model="tags"
          placeholder="','로 구분"
          class="border-b-2 border-solid outline-none pl-1"
          type="text" />
      </div>
      <div class="flex justify-around w-1/3">
        <span class="mb-1 text-center">품절 여부</span>
        <div>
          <input
            id="false"
            type="radio"
            name="isSoldOut"
            value="false"
            :checked="!isSoldOut" />
          <label for="false">false</label>
        </div>
        <div>
          <input
            id="true"
            ref="isSoldOut"
            name="isSoldOut"
            value="true"
            type="radio" 
            :checked="isSoldOut" />
          <label for="true">true</label>
        </div>
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
      <div class="flex justify-around items-center w-1/4">
        <button
          class="border-2 border-solid outline-none p-3 rounded-md bg-red-300 text-white"
          @click="$router.go()">
          새로고침
        </button>
        <button
          class="border-2 border-solid outline-none p-3 rounded-md bg-blue-300 text-white"
          @click="onSubmit">
          수정완료
        </button>
      </div>
      <button
        class="absolute top-2 right-4 border border-solid rounded-xl p-1 bg-red-300"
        @click="$router.back()">
        뒤로가기
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      description: '',
      isSoldOut: false,
      photoBase64: '',
      getPhotoBase64: '',
      price: '',
      tags: [],
      thumbnailBase64: '',
      getThumbnailBase64: '',
      title: '',
    }
  },
  computed: {
    id(){
      return this.$route.params.id
    },
  },
  async mounted(){
    this.getGoodsInfo()
  },
  methods:{
    validation(){
      const { title, price, description } = this.$refs
      if(!title.value) {
        this.$swal({ title: '이름을 입력하세요!', icon: 'error'})
        return false
      }
      if(!price.value) {
        this.$swal({ title: '가격을 입력하세요!', icon: 'error'})
        return false
      }
      if(!description.value) {
        this.$swal({ title: '상세 설명을 입력하세요!', icon: 'error'})
        return false
      }
      return true
    },
    async onSubmit(){
      try {
        if(!this.validation()) return
        if(this.loading) return
        this.loading = true

        const { title, price, description, tags, isSoldOut } = this.$refs

        await this.$productsPut(this.id, {
          title: title.value,
          price: price.vlaue,
          description: description.value,
          tags: tags.value ? tags.value.split(',') : [],
          thumbnailBase64: this.thumbnailBase64 === this.getThumbnailBase64 ? '' : this.thumbnailBase64,
          photoBase64: this.photoBase64 === this.getPhotoBase64 ? '' : this.photoBase64,
          isSoldOut: isSoldOut.checked
        })

        this.$openAlert('수정이 완료되었습니다.')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({
          title,
          icon: 'error'
        })
      } finally {
        this.loading = false
        this.getGoodsInfo()
      }
    },
    async getGoodsInfo(){
      if(this.loading) return 
      this.loading = true

      try {
        const { title, description, thumbnail, photo, tags, price, isSoldOut } =  await this.$productInfo(this.id)
        this.title = title
        this.description = description
        this.thumbnailBase64 = thumbnail
        this.getThumbnailBase64 = thumbnail
        this.photoBase64 = photo
        this.getPhotoBase64 = photo
        this.price = price
        this.tags = tags
        this.isSoldOut = isSoldOut
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({
          title,
          icon: 'error'
        })

        this.$router.back()
      } finally {
        this.loading = false
      }
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
