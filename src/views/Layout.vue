<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item v-for="item in menu" :key="item.index" :index="item.index">
          <a-icon :type="item.type" />
          <span>{{ item.title }}</span>
          <router-link :to="item.path">{{ item.title }}</router-link>
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
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
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
        { title: '公司', path: '/company', type: 'home', index: '2' },
        { title: '员工', path: '/staff', type: 'team', index: '3' },
        { title: '订单', path: '/order', type: 'shopping', index: '4' },
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
</style>
