<template>
  <section class="flex flex-col justify-center items-center border-t-2 border-solid pt-2 mt-2 w-full">
    <h2 class="text-2xl my-2 py-2">
      [{{ bank.name }}] 상세 입력
    </h2>
    <div>
      <span>계좌 번호</span>
      <input
        ref="accountNumber"
        :placeholder="`${accountNumberLength} 자리의 번호`"
        class="border-b-2 border-solid outline-none pl-1"
        type="number" />
    </div>
    <div class="my-5">
      <span>휴대폰 번호</span>
      <input
        ref="phoneNumber"
        class="border-b-2 border-solid outline-none pl-1"
        type="number" />
    </div>
    <span class="mb-1">약관 동의</span>
    <div class="flex justify-around w-1/5">
      <div>
        <input
          id="false"
          type="radio"
          name="signature"
          value="false"
          checked />
        <label for="false">동의 안함</label>
      </div>
      <div>
        <input
          id="true"
          ref="signature"
          name="signature"
          value="true"
          type="radio" />
        <label for="true">동의함</label>
      </div>
    </div>
    <button
      class="border border-solid rounded-md mt-2 p-1 bg-blue-300 text-white outline-none"
      @click="onSubmit">
      만들기
    </button>
    <Loader :loading="loading" />
  </section>
</template>

<script>
export default {
  data(){
    return {
      bank: {},
      loading: false
    }
  },
  computed:{
    accountNumberLength(){
      return this.$route.params.digits.reduce((a, b) => Number(a) + Number(b))
    }
  },
  mounted(){
    if(this.$route.params.code) this.bank = this.$route.params
    else this.$router.back()
  },
  methods: {
    validation(){
      const { accountNumber, phoneNumber, signature } = this.$refs
      if(accountNumber.value.length !== this.accountNumberLength) {
        this.$swal({
          title: `${this.bank.name}은 ${this.accountNumberLength}자리의 계좌번호만 가능합니다.`,
          icon: 'warning'
        })
        return false
      }
      if(phoneNumber.value.length !== 11) {
        this.$swal({ title: '휴대폰 번호는 11자리입니다.', icon: 'warning' })
        return false
      }
      if(!signature.checked) {
        this.$swal({ title: '동의 선택 시 계좌 연결이 가능합니다.', icon: 'warning' })
        return false
      }
      return true
    },
    async onSubmit(){
      try {
        if(!this.validation()) return 
        if(this.loading) return
        this.loading = true

        const { accountNumber, phoneNumber, signature } = this.$refs
        await this.$connectAccount({
          bankCode: this.bank.code,
          accountNumber: accountNumber.value,
          phoneNumber: phoneNumber.value,
          signature: signature.checked
        })

        await this.getAccountData()
        this.$openAlert('계좌 연결에 성공했습니다.')
        this.$router.push('/about/myaccount')
      } catch (error) {
        const title = error.response.data
        this.$swal.fire({ title, icon: 'error' })
      } finally {
        this.loading = false
      }
    },
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
  }
}
</script>
