<template>
  <div class="about">
    <h1 id="title">筋斗云管理系统</h1>
    <h2 id="hello">{{ username }},您好</h2>
    <h1 id="message">{{ message }}</h1>
    <a-button :loading="lg_loading" id="logout_button" type="button" @click="logout">注销</a-button>
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
  methods: {
    logout() {
      this.lg_loading = true
      let that = this
      this.$axios({
        method: 'get',
        url: '/logout',
      })
        .then(function (response) {
          if (response.data == 200) {
            //修改store的authorization为空并清除token
            that.$store.commit('ChangeToken', response.headers.authorization)
            localStorage.removeItem('Authorization')
            that.$store.commit('ChangeUser', '')
            that.lg_loading = false
            that.$router.push('/login')
          } else {
            that.lg_loading = false
          }
        })
        .catch((error) => {
          console.log(error)
        })
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