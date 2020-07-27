<template>
  <div class="home">
    <img alt="Jindouyun logo" src="../assets/logo.png" />
    <Login msg="Welcome to Jindouyun" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login,
  },
}
</script>

<style lang="less">
.home {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  text-align: center;
}
</style>
