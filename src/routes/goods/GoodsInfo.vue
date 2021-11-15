<template>
  <section class="goodsinfo flex flex-col justify-center items-center w-full mt-14">
    <Loader
      v-if="loading"
      :loading="loading" />
    <div
      v-else
      class="relative flex flex-col justify-center items-center border-t border-b border-solid border-black w-full p-10">
      <img
        class="rounded-xl"
        :src="photo"
        alt="상품 이미지" />
      <span class="text-4xl py-6">{{ title }}</span>
      <div
        v-if="tags.length > 0"
        class="flex">
        <div
          v-for="(tag, i) in tags"
          :key="i"
          class="borde border-solid rounded-2xl m-2 p-2 bg-green-400 text-white">
          {{ tag }}
        </div>
      </div>
      <span>가격 {{ price.toLocaleString() + "원" }}</span>
      <span>{{ description }}</span>
      <button
        class="border-2 border-solid outline-none p-3 rounded-md bg-blue-300 text-white"
        @click="onBuy">
        구매신청
      </button>
      <div
        v-if="isSoldOut"
        class="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
        <span class="text-red-600 text-9xl">품절</span>
      </div>
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
      photo: [],
      price: '',
      tags: '',
      thumbnail: '',
      title: '',
    }
  },
  computed: {
    id(){
      return this.$route.params.id
    },
    currentUser(){
      return this.$store.state.user.currentUser
    },
    accountsObj(){
      return this.$store.state.account.accounts.reduce((acc, cur) => {
        acc[cur.id] = `${cur.bankName} (잔액: ${cur.balance.toLocaleString()}원)`
        return acc
      }, {})
    },
    accountsLength(){
      return this.$store.state.account.accounts.length
    }
  },
  async mounted(){
    this.loading = true

    try {
      const { title, description, thumbnail, photo, tags, price, isSoldOut } =  await this.$productInfo(this.id)
      this.title = title
      this.description = description
      this.thumbnail = thumbnail
      this.photo = photo
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
  methods:{
    async onBuy(){
      if(!localStorage.getItem('token') || !this.currentUser){
        this.$swal.fire({
          title: '로그인 후 이용 가능합니다.',
          text: '로그인 화면으로 이동하겠습니까?',
          icon: 'question',
          showCancelButton: true
        }).then(({ isConfirmed }) => {
          if(isConfirmed) {
            this.$router.push('/login')
            return
          } else {
            return
          }
        })
      }
      else if(this.accountsLength === 0) {
        this.$swal.fire({
          title: '등록된 계좌가 없습니다.',
          text: '계좌 등록 창으로 이동하겠습니까?',
          icon: 'question',
          showCancelButton: true
        }).then(({ isConfirmed }) => {
          if(isConfirmed) {
            this.$router.push('/about/myaccount/addaccount')
            return 
          } else {
            return
          }
        })
      }else {
        const inputOptions= this.accountsObj
        const {value: accountId} = await this.$swal.fire({
          title: '결제할 은행을 선택해 주세요',
          input: 'radio',
          inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return '결제할 은행을 선택해주세요.'
            }
          }
        })
        try {
          if(accountId){
            await this.$productsBuy({ productId: this.id, accountId }) 
            await this.$store.dispatch('admin/updateAdmin', { update: false })
            await this.$store.dispatch('buyList/updateBuyList', { update: false })
            this.$swal.fire({ title: '구매 신청 성공!', icon: 'success' })
          }
        } catch (error) {
          const title = error.response.data
          this.$swal.fire({ title, icon: 'error' })
        } 
      }
    }
  }
}
</script>
