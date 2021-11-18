<template>
  <h2 class="text-2xl m-5 pt-5 border-t-2 border-solid w-full text-center">
    가능한 은행
  </h2>
  <ul>
    <li
      v-for="bank in ableBanks"
      :key="bank.code">
      <div
        v-if="!bank.disabled"
        class="flex justify-between items-center border-b-2 border-solid pb-2 mb-2">
        <span>{{ bank.name }}</span>
        <button
          class="border border-solid rounded-md ml-2 p-1 text-blue-300 outline-none hover:bg-blue-300 hover:text-white"
          @click="addAccount(bank.name, bank.code, bank.digits)">
          연결하기
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    ableBanks(){
      return this.$store.state.account.ableBanks
    }
  },
  methods:{
    addAccount(name, code, digits){
      this.$router.push({ name: 'inputaccount', params: {code, name, digits} })
    }
  }
}
</script>
