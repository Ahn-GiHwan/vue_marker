<template>
  <tbody>
    <tr>
      <td>{{ goods.title }}</td>
      <td>{{ goods.price.toLocaleString()+'원' }}</td>
      <td>{{ goods.isSoldOut }}</td>
      <td>
        <button @click="info">
          보기
        </button>
      </td>
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
  },
  methods: {
    info(){
      this.$router.push({name: 'admingoodsinfo', params: {id: this.goods.id}})
    }
  }
}
</script>
