<template>
  <div id="Login">
    <a-input
      class="login_input"
      v-model="loginForm.tel"
      type="text"
      placeholder="请输入账号"
    >
      <a-icon slot="prefix" type="user" />
    </a-input>
    <br />
    <br />
    <a-input
      class="login_input"
      v-model="loginForm.password"
      type="password"
      placeholder="请输入密码"
    >
      <a-icon slot="prefix" type="key" />
    </a-input>
    <br />
    <a-alert
      v-if="success"
      class="message"
      message="登陆成功"
      type="success"
      show-icon
    />
    <a-alert
      v-if="error"
      class="message"
      message="账号或密码错误"
      type="error"
      show-icon
    />
    <a-alert
      v-if="nil"
      class="message"
      message="账号或密码不能为空"
      type="error"
      show-icon
    />
    <br />
    <a-button
      :loading="lg_loading"
      id="login_button"
      type="button"
      @click="login"
      >登陆</a-button
    >
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      lg_loading: false,
      success: false,
      error: false,
      nil: false,
      loginForm: {
        tel: '',
        password: '',
      },
    }
  },

  methods: {
    login() {
      let that = this
      this.lg_loading = true
      if (this.loginForm.tel === '' || this.loginForm.password === '') {
        this.nil = true
        this.lg_loading = false
      } else {
        that.loginForm.tel = that.loginForm.tel.toString()
        that.$store
          .dispatch('Login', that.loginForm)
          .then(() => {
            that.lg_loading = false
            that.error = false
            that.success = true
            that.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
            that.lg_loading = false
            that.success = false
            that.error = true
          })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#Login {
  margin-top: 10%;
}
.login_input {
  width: 300px;
}

#login_button {
  margin-top: 5px;
}

.message {
  width: 180px;
  margin: auto;
  margin-top: 20px;
}
</style>
