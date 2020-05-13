<template>
  <div>
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-document-copy"></i>
        <span>订单</span>
      </el-card>
    </div>
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
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-row>
    </div>
    <div class="operate-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="number"
          label="订单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="收货人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="收货人电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货人地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="金额"
          width="80">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="订单备注"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="下单时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新订单时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="订单评价"
          width="300">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserOrder",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            queryOrder() {
                this.$axios
                    .post('/order/query', {}).then((result) => {
                    this.tableData = result.data.obj;
                })

            }
        },
        mounted() {
            this.queryOrder()
        }
    }
</script>

<style scoped>
  .line {
    display: inline-block;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
