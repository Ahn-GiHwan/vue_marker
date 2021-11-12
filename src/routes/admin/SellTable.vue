<template>
  <tbody>
    <tr>
      <td>{{ sell.user.email }}</td>
      <td>{{ sell.user.displayName }}</td>
      <td>{{ sell.product.title }}</td>
      <td>{{ sell.product.price.toLocaleString() + '원' }}</td>
      <td>{{ sell.account.bankName }}</td>
      <td>{{ sell.account.accountNumber }}</td>
      <td>{{ time }}</td>
      <td>{{ sell.isCanceled }}</td>
      <td>{{ sell.done }}</td>
    </tr>
  </tbody>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    sell: {
      type: Object,
      default: ()=>({})
    }
  }, computed: {
    time(){
      return dayjs(this.sell.timePaid).format('YYYY/MM/DD - HH:mm:ss') 
    }
  }
}
</script>
