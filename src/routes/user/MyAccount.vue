<template>
  <h2 class="text-2xl p-5">
    나의 계좌 정보
  </h2>
  <Loader
    v-if="loading"
    :loading="loading" />
  <template v-else>
    <h3 class="text-xl border-4 border-solid border-green-200 rounded-md p-2">
      현재 총 금액: {{ totalBalance.toLocaleString() + '원' }}
    </h3>
    <ul
      v-if="accounts.length > 0"
      class="flex justify-around mt-3 w-1/2">
      <li
        v-for="account in accounts"
        :key="account.id"
        class="flex flex-col items-center border-2 border-solid p-2 rounded">
        <span>{{ account.bankName }}</span>
        <span>{{ account.balance.toLocaleString() + '원' }}</span>
        <button
          class="border-2 border-solid outline-none py-1 px-2 rounded-md bg-red-300 text-white"
          @click="unconnect(account.bankName, account.id)">
          해지
        </button>
      </li>
    </ul>
    <span v-else>연결된 계좌가 없습니다. ❌</span>
    <RouterLink
      to="/about/myaccount/addaccount"
      class="border border-solid rounded-md my-2 p-2 bg-blue-300 text-white outline-none">
      추가 연결
    </RouterLink>
    <RouterView />
  </template>
</template>

<script>
export default {
  data(){
    return {
      loading: false
    }
  },
  computed: {
    accounts(){
      return this.$store.state.account.accounts
    },
    totalBalance(){
      return this.$store.state.account.totalBalance
    }
  },
  mounted(){
    this.getAccountData()
  },
  methods: {
    async getAccountData(){
      try {
        this.loading = true
        const accountInfo = await this.$myAccountInfo()
        this.$store.dispatch('account/updateAccountInfo', accountInfo)
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loading = false
      }
    },
    async unconnect(name, accountId){
      const inputOptions = {
        false: '동의 안함',
        true: '동의함',
      }
      const { value } = await this.$swal.fire({
        title: `[${name}] 해지 동의`,
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return '동의 내용을 선택해 주세요!'
          }
        }
      })
      
      if(JSON.parse(value)) {
        await this.$deleteAccount({
          accountId,
          signature: true
        })
        this.$openAlert('해지가 완료되었습니다.')
        await this.getAccountData()
      } else {
        this.$openAlert('❌ 해지가 취소되었습니다.')
      }
    }
  }
}
</script>
