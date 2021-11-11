<template>
  <h1>UpdateUser</h1>
  <div class="flex flex-col">
    <input
      v-model="displayName"
      type="text" />
    <input
      type="password" />
    <input
      type="password" />
    <input
      type="password" />
    <input type="file" />
  </div>
  <button @click="onSubmit">
    수정하기
  </button>
</template>

<script>
export default {
  data(){
    return {
      displayName: this.$store.state.user.currentUser.displayName
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.user.currentUser
    }
  },
  methods:{
    onSubmit(){
      alert(this.displayName)
    }
  }
}
</script>

<style>

</style>
