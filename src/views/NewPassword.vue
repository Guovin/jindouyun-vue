<template>
  <a-form class="pass_form" :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="新的密码" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入你的新密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="再次输入密码" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入并确认你的新密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-alert v-if="success" class="message" message="修改成功" type="success" show-icon />
    <a-form-item class="pass_submit" v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">确认</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      confirmDirty: false,
      success: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit(e) {
      let that = this
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$axios({
            method: 'post',
            url: '/updatePassword',
            data: {
              password: values.password,
            },
          })
            .then(function (response) {
              if (response.data == 201) {
                that.success = true
                //延迟跳转
                setTimeout(() => {
                  that.$router.push('/')
                }, 1000)
              } else {
                console.log('出错！')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不相同!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
  },
}
</script>

<style lang="less">
.pass_form {
  margin-left: 20%;
  width: 50%;
}

.pass_submit {
  margin-left: 40%;
}

.message {
  width: 180px;
  margin-left: 52%;
  text-align: center;
}
</style>