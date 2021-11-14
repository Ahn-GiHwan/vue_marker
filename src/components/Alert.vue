<template>
  <section
    v-show="show"
    class="alert absolute bottom-5 rounded-2xl bg-blue-200">
    <div class="relative flex flex-col justify-center items-center rounded-xl p-5 m-1 bg-blue-400 text-white">
      <span
        v-if="title"
        class="text-lg font-bold">{{ title }}</span>
      <span v-if="text">{{ text }}</span>
      <button
        v-if="path"
        class="border border-solid border-white rounded-lg mt-2 px-1 bg-white text-black cursor-pointer"
        @click="$router.push(path)">
        이동
      </button>
      <button
        class="absolute top-0 right-2"
        @click="$closeAlert()">
        x
      </button>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    show(){
      return this.$store.state.alert.show
    },
    title(){
      return this.$store.state.alert.title
    },
    text(){
      return this.$store.state.alert.text
    },
    path(){
      return this.$store.state.alert.path
    },
  },
}
</script>
