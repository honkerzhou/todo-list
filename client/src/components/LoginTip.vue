<template>
  <el-alert>
    <template #title>
      <router-link to="/login">登录</router-link>可以获得更好体验哦~
    </template>
  </el-alert>
</template>

<script>
export default {
  name: 'LoginTip',
  data() { 
    return {

    }
  }
 }
</script>

<style lang="" scoped>

</style>