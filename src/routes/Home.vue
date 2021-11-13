<template>
  <InputBox />
  <GoodsList />
  <Alert
    :show="show"
    :title="title"
    :content="content"
    :path="path" />
</template>

<script>
import InputBox from '~/components/InputBox'
import GoodsList from '~/components/GoodsList'

export default {
  components: {
    InputBox,
    GoodsList
  },
  data(){
    return {
      show: false,
      title: '',
      content: '',
      path: ''
    }
  },
  mounted(){
    if(this.$store.state.user.currentUser) {
      if(!this.$store.state.account.accounts.length) {
        this.show = true
        this.title = '현재 등록된 계좌가 없습니다!'
        this.content = '계좌를 등록하러 가시겠습니까?'
        this.path = '/about/myaccount/addaccount'
        setTimeout(() => {
          this.show = false
        }, 5000)
      }
    }
  }
}
</script>
