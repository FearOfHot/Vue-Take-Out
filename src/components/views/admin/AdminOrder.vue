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
        style="width: 100%"
        height="560px"
        v-loading="loading"
        element-loading-text="拼命加载中">
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
          label="金额（元）"
          prop="price">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <span v-if="scope.row.status==-1"><el-tag type="info">已失效</el-tag></span>
            <span v-else-if="scope.row.status==0">
              <el-tag type="danger">提交未支付</el-tag>
            </span>
            <span v-else-if="scope.row.status==1"><el-tag>已付款</el-tag></span>
            <span v-else-if="scope.row.status==2"><el-tag type="warning">配送中</el-tag></span>
            <span v-else-if="scope.row.status==3"><el-tag type="success">已完成</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          width="500">
          <template slot="header" slot-scope="scope">
            <div>
              <el-select v-model="value" size="mini" placeholder="请选择订单状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" size="mini" icon="el-icon-search" @click="searchByStatus">搜索</el-button>
            </div>
          </template>

          <template slot-scope="scope">
            <span v-if="scope.row.status==1">
              <el-button type="warning" plain size="mini" @click="sendOrder(scope)">订单已发出</el-button>
            </span>
            <span v-else>
              <el-button type="warning" plain size="mini" @click="sendOrder(scope)" disabled>订单已发出</el-button>
            </span>

            <span v-if="scope.row.status==2">
              <el-button type="success" plain size="mini" @click="finishOrder(scope)" >订单已完成</el-button>
            </span>
            <span v-else>
              <el-button type="success" plain size="mini" @click="finishOrder(scope)"disabled>订单已完成</el-button>
            </span>

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
        width="600px">
        <div>
          <el-table :data="dishTableData" v-model="form" height="200px">
            <el-table-column label="图片" prop="dishBase64Url" width="200">
              <template slot-scope="scope"><img style="height: 60px; width: 60px" :src="'data:image/jpg;base64,'+scope.row.dishBase64Url"></template>
            </el-table-column>
            <el-table-column label="菜名" prop="dishName" width="150"></el-table-column>
            <el-table-column label="数量" prop="dishNumber" width="100"></el-table-column>
            <el-table-column label="价格（元）" prop="price" width="100"></el-table-column>
          </el-table>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-divider></el-divider>
            <el-form-item label="姓名">
              <el-input style="width: 100px " disabled v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input style="width: 150px " disabled v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="配送地址">
              <el-input style="width: 400px " disabled v-model="form.address"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="订单评价">
              <el-input disabled type="textarea" v-model="form.evaluate"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
    export default {
        name: "UserOrder",
        data() {
            return {
                loading: true,
                form: {
                    id: '',
                    name: '',
                    phone: '',
                    address: '',
                    evaluate: '',
                },
                search: '',
                value: '',
                options: [{
                    value: '99',
                    label: '全部订单'
                }, {
                    value: '-1',
                    label: '已失效'
                }, {
                    value: '0',
                    label: '未付款'
                }, {
                    value: '1',
                    label: '已付款'
                }, {
                    value: '2',
                    label: '配送中'
                }, {
                    value: '3',
                    label: '已完成'
                }],
                oneOrderStatus: '',
                oneOrderEvaluate: '',
                oneOrderPrice: 0,
                oneOrderId: 0,
                radio: 3,
                dialogVisible: false,
                tableData: [],
                dishTableData: [],
                updateIndex: -1,
            }
        },
        methods: {
            searchByStatus() {
                if (this.value === '99' || this.value === '') {
                    this.$axios
                        .post('/order/all/query', {}).then((result) => {
                        this.tableData = result.data.obj;
                    })
                } else {
                    this.value;
                    this.$axios
                        .post('/order/all/query', {
                            status: JSON.parse(this.value),
                        }).then((result) => {
                        this.tableData = result.data.obj;
                    })
                }
            },
            getOrderInfo(scope) {
                this.oneOrderId = scope.row.id;
                this.oneOrderPrice = scope.row.price;
            },
            queryOrder() {
                this.$axios
                    .post('/order/all/query', {}).then((result) => {
                    this.tableData = result.data.obj;
                    this.loading = false;
                })

            },
            queryOrderDetails(scope) {
                this.oneOrderStatus = scope.row.status;
                this.oneOrderEvaluate = scope.row.evaluate;
                this.dishTableData = scope.row.orderDishVoList;
                this.dialogVisible = true;
                this.form.id = scope.row.id;
                this.form.name = scope.row.name;
                this.form.phone = scope.row.phone;
                this.form.address = scope.row.address;
                this.form.evaluate = scope.row.evaluate;
            },
            sendOrder(scope) {
                this.$axios
                    .post('order/status/update', {
                        status: '2',
                        id: scope.row.id,
                    }).then(() => {
                        this.queryOrder()
                })
            },
            finishOrder(scope) {
                this.$axios
                    .post('order/status/update', {
                        status: '3',
                        id: scope.row.id,
                    }).then(() => {
                    this.queryOrder()
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
