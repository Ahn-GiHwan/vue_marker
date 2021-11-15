<template>
  <tbody>
    <tr>
      <td>{{ list.user.email }}</td>
      <td>{{ list.user.displayName }}</td>
      <td>{{ list.product.title }}</td>
      <td>{{ list.product.price.toLocaleString() + '원' }}</td>
      <td>{{ list.account.bankName }}</td>
      <td>{{ list.account.accountNumber }}</td>
      <td>{{ time }}</td>
      <template v-if="!list.isCanceled && !list.done">
        <td class="p-2 bg-green-200">
          요청
        </td>
      </template>
      <template v-if="list.done">
        <td class="p-2 bg-blue-200">
          확정
        </td>
      </template>
      <template v-if="list.isCanceled">
        <td class="p-2 bg-red-200">
          취소
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    list: {
      type: Object,
      default: ()=>({})
    }
  },
  computed: {
    time(){
      return dayjs(this.list.timePaid).format('YYYY/MM/DD - HH:mm:ss') 
    }
  }
}
</script>
