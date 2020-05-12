<template>
<!--  <el-form>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="queryOrder" @keyup.enter.native="queryOrder">登录</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      label="订单id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="下单用户id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="number"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="订单总金额">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="订单备注"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="下单时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新订单时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="订单状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="evaluate"
      label="订单评价"
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "UserOrder",
        data () {
            return {
                tableData:[]
          }
        },
        methods: {
            queryOrder()
            {
                this.tableData=this.$axios
                    .post('/order/all/query', {})

            }
        },
        mounted() {
            this.queryOrder()
        }
    }
</script>

<style scoped>

</style>
