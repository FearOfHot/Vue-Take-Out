<template>
  <div id="app">
     <Head v-if="$route.name!='Login'" />
    <el-container style="height: calc(100vh - 70px);">

      <template v-if="($route.name+'').indexOf('Admin')==-1">
        <UserSide v-if="$route.name!='Login'" />
        <UserSide v-else-if="$route.name!='AdminIndex' && $route.name!='Login'" />
      </template>
      <template v-else>
        <AdminSide v-if="$route.name!='Login'" />
        <AdminSide v-else-if="$route.name!='UserIndex' && $route.name!='Login'" />
      </template>


      <el-main >
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Head from "@/components/home/Head";
import UserSide from "@/components/home/user/UserSide";
import AdminSide from "@/components/home/admin/AdminSide";
export default {
  name: "App",
  components: {
    Head,
    UserSide,
    AdminSide
  }
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*!*margin-top: 60px;*!*/
}
</style>
