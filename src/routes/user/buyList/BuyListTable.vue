<template>
  <tbody>
    <tr>
      <td>{{ list.product.title }}</td>
      <td>{{ list.product.price.toLocaleString() + '원' }}</td>
      <td> {{ time }} </td>
      <template v-if="!list.isCanceled && !list.done">
        <td>
          <button @click="completeBuy">
            구매 확정
          </button>
        </td>
        <td>
          <button
            @click="cancelBuy">
            구매 취소
          </button>
        </td>
      </template>
      <Loader :loading="loading" />
    </tr>
  </tbody>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      loading: false
    }
  },
  computed: {
    time(){
      return dayjs(this.list.timePaid).format('YYYY/MM/DD - HH:mm:ss') 
    }
  },
  methods: {
    async getBuyList(){
      try {
        await this.$buyAllList()
        const res = await this.$buyAllList()
        this.$store.dispatch('buyList/updateBuyList', { allList: res })
      } catch (error) {
        this.errorConetent = error.response.data
      } finally {
        this.loading = false
      }
    },
    async completeBuy(){
      this.$swal.fire({
        title: '정말 구매 하시겠습니까?',
        icon: 'question',
        showCancelButton:true,
      }).then(async ({ isConfirmed })=> {
        if(isConfirmed){
          try {
            if(this.loading) return 
            this.loading = true

            await this.$productsOk({ detailId: this.list.detailId })
            this.getBuyList()
            this.$openAlert('구매가 확정되었습니다.')
          } catch (error) {
            const title = error.response.data
            this.$swal.fire({ title, icon: 'error' })
          } finally {
            this.loading = false
          }  
        }
      })
    },
    async cancelBuy(){
      this.$swal.fire({
        title: '정말 취소 하시겠습니까?',
        icon: 'question',
        showCancelButton:true,
      }).then(async ({ isConfirmed })=> {
        if(isConfirmed){
          try {
          if(this.loading) return 
            this.loading = true

            await this.$productsCancel({ detailId: this.list.detailId })
            this.getBuyList()
            this.$openAlert('구매 취소가 되었습니다.')
          } catch (error) {
            const title = error.response.data
            this.$swal.fire({ title, icon: 'error' })
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
