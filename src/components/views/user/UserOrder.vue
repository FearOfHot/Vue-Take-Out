<template>
  <div>
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-document-copy"></i>
        <span>订单</span>
      </el-card>
    </div>

    <div class="operate-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="订单编号"
          prop="number">
        </el-table-column>
        <el-table-column
          label="订单备注"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="创建订单时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="金额/元"
          prop="price">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
        </el-table-column>

        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope" class="line">
            <div>
              <el-select v-model="value" size="mini" placeholder="请选择订单状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-row>
                <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
              </el-row>
            </div>
          </template>

          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="queryOrderDetails(scope)">订单详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <span>这是一段信息</span>
        <span v-model="details.name"></span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserOrder",
    data() {
      return {
        value: '',
        options: [{
          value: '选项1',
          label: '无效订单'
        }, {
          value: '选项2',
          label: '未付款'
        }, {
          value: '选项3',
          label: '已付款'
        }, {
          value: '选项4',
          label: '配送中'
        }, {
          value: '选项5',
          label: '已完成'
        }],
        details: {
          name: '',
          phone: '',
          address: '',
        },
        dialogVisible: false,
        tableData: []
      }
    },
    methods: {
      queryOrder() {
        this.$axios
          .post('/order/query', {}).then((result) => {
          this.tableData = result.data.obj;
        })

      },
      queryOrderDetails(scope) {
        this.dialogVisible = true;
        this.details.name = scope.row.name;
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
