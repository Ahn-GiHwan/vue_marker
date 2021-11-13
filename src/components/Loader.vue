<template>
  <div
    v-show="loading"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${width}px`,
      borderColor: color
    }"
    class="loader">
  </div>
</template>

<script>
export default {
  props: {
    size:{
      type: Number,
      default: 30
    },
    color:{
      type:String,
      default: '#1976D2'
    },
    width: {
      type: Number,
      default: 4
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
