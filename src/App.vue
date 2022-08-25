<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
  /* 去页面周围白边 */
  html,body {
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100vh;
  }
</style>
