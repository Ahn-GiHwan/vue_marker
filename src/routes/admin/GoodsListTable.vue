<template>
  <tbody>
    <tr>
      <td>{{ goods.title }}</td>
      <td>{{ goods.price.toLocaleString()+'원' }}</td>
      <td>{{ goods.isSoldOut }}</td>
      <td><button>상세</button></td>
      <td><button>수정</button></td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: ()=>({})
    }
  }
}
</script>
