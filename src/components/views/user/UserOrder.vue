<template>
<!--  <el-form>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="queryOrder" @keyup.enter.native="queryOrder">登录</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
  <div>
    <div class="line">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="line">
      <el-row>
        <el-button type="primary" plain>查看</el-button>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="订单id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="下单用户id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="订单编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="订单总金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="订单备注"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="下单时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新订单时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="evaluate"
        label="订单评价"
        width="100">
      </el-table-column>
    </el-table>
  </div>
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
    .line{
      display: inline-block;
    }
</style>
