<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item v-for="item in menu" :key="item.index" :index="item.index">
          <a-icon :type="item.type" />
          <span>{{ item.title }}</span>
          <router-link :to="item.path"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-menu class="right" mode="horizontal">
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="user" />
              {{ username }}
            </span>
            <a-menu-item-group title="欢迎使用">
              <a-menu-item v-for="option in options" :key="option.index">
                <a-icon :type="option.type" />
                <span>{{ option.title }}</span>
                <router-link :to="option.path"></router-link>
              </a-menu-item>
              <a-menu-item key="3" @click="logout">
                <a-icon type="logout" />
                <span>注销</span>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      menu: [
        { title: '首页', path: '/main', type: 'home', index: '1' },
        { title: '公司', path: '/company', type: 'shop', index: '2' },
        { title: '员工', path: '/staff', type: 'team', index: '3' },
        { title: '订单', path: '/order', type: 'shopping', index: '4' },
      ],
      options: [
        { title: '个人中心', path: '/center', type: 'user', index: '1' },
        { title: '设置', path: '/setting', type: 'setting', index: '2' },
      ],
    }
  },
  created() {
    let that = this
    this.$axios({
      method: 'get',
      url: '/user',
    }).then(function (response) {
      if (response.status == 200) {
        that.$store.commit('ChangeUser', response.data.name)
      }
    })
  },
  computed: {
    username() {
      return this.$store.getters.getuser
    },
  },
  methods: {
    logout() {
      let that = this
      this.$confirm({
        title: '您确定要进行注销操作吗?',
        content: '退出登陆状态',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that
            .$axios({
              method: 'get',
              url: '/logout',
            })
            .then(function (response) {
              if (response.data == 200) {
                //修改store的authorization为空并清除token
                that.$store.commit(
                  'ChangeToken',
                  response.headers.authorization
                )
                localStorage.removeItem('Authorization')
                that.$store.commit('ChangeUser', '')
                that.$router.push('/login')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        },
        onCancel() {
          // console.log('Cancel')
        },
        class: 'test',
      })
    },
  },
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
}

.ant-layout {
  min-height: 100%;
}
</style>
