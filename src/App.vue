<template>
  <div class="app">
    <TheHeader class="sticky inset-x-0 top-0" />
    <RouterView />
    <Alert />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import Alert from '~/components/Alert'

export default {
  components: {
    TheHeader,
    Alert
  }
}
</script>
