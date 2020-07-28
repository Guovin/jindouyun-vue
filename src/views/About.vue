<template>
  <div class="about">
    <h1 id="title">筋斗云管理系统</h1>
    <h2 id="hello">{{ username }},您好</h2>
    <h1 id="message">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      message: 'Welcome to Jindouyun!',
      lg_loading: false,
    }
  },
  computed: {
    username() {
      return this.$store.getters.getuser
    },
  },
}
</script>
<style lang="less">
#title {
  font-size: 45px;
  font-weight: 800;
  text-align: center;
}
#hello {
  font-size: 25px;
  text-align: center;
}

#message {
  font-size: 20px;
  text-align: center;
}
</style>