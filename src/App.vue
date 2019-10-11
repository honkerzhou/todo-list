<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
#app {
  min-width: 350px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
