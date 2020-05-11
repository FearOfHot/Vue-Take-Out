<template>
  <!--<div>-->
    <!--Hello World!-->
  <!--</div>-->
  <el-container>
    <!--顶部-->
    <el-header></el-header>

    <!--中央区域-->
    <el-main>
      <el-container>
        <!--左侧导航栏-->
        <el-aside></el-aside>
        <!--主内容显示区域，数据内容都是在这里面渲染的-->
        <el-main></el-main>
      </el-container>
    </el-main>

    <!--底部-->
    <el-footer></el-footer>
  </el-container>
</template>

<script>
    export default {
        name: 'AppIndex'
    }
</script>

<style scoped>

</style>


