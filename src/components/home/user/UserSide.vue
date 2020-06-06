<template>
  <!-- <div class="sidebar"> -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  <!-- </div> -->
</template>

<script>
    export default {
        name: "Side",
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'indexUser',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'dish',
                        title: '菜单'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'cart',
                        title: '购物车'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'order',
                        title: '订单'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'info',
                        title: '配送信息'
                    },
                ]
            };
    },
      computed: {
          onRoutes() {
              return this.$route.path.replace('/', '');
          }
      }
    }
</script>

<style scoped>
#side {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
#side > ul {
  height: 100%;
}

.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
