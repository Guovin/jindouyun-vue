<template>
  <div class="about">
    <h2>{{user}},你好</h2>
    <h1>{{ message }}</h1>
    <a-button :loading="lg_loading" id="logout_button" type="button" @click="logout">注销</a-button>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      user: null,
      message: 'Welcome to Jindouyun!',
      lg_loading: false,
    }
  },
  mounted() {
    let that = this
    this.$axios({
      method: 'get',
      url: '/user',
    }).then(function (response) {
      if (response.status == 200) {
        that.user = response.data.name
      }
    })
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
