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
              <el-button size="mini" type="primary" @click="getOrderInfo(scope)">支付</el-button>
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
                <el-input :disabled="oneOrderEvaluate != null" type="textarea" v-model="form.evaluate"></el-input>
              </el-form-item>
            <el-form-item>
              <span v-if="oneOrderStatus === '3'">
                <span v-if="oneOrderEvaluate === null">
                  <el-button type="primary" @click="submitItem">提交评价</el-button>
                </span>
                <span v-else>
                  <el-button disabled type="primary">已评价</el-button>
                </span>
              </span>

              <span v-else>
                <span><el-tag type="warning">订单完成后才能评价哦</el-tag></span>
                <el-button disabled type="primary">提交评价</el-button>
              </span>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <div>
      <template>
        <el-dialog
          title="提示"
          :visible.sync="evaluateVisible"
          width="30%">
          <span>一经提交无法修改，确定要提交吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="evaluateVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEvaluate">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </div>

    <div>
      <template>
        <el-dialog
          title="请选择支付方式"
          :visible.sync="paymentVisible"
          width="30%"
          :before-close="handleClose">
          <template>
            <div>
              <span><el-tag>您需要支付：{{oneOrderPrice}}元</el-tag></span>
            </div>
            <el-divider></el-divider>
            <el-radio-group v-model="radio">
              <!--<el-radio disabled :label="1">支付宝</el-radio>-->
              <!--<el-radio disabled :label="2">微信</el-radio>-->
              <span v-if="oneOrderPrice <= userBalance">
                <el-radio :label="3">一卡通（余额）：{{userBalance}}元</el-radio>
              </span>
              <span v-else>
                <el-radio :label="3" disabled>一卡通（余额）：{{userBalance}}元</el-radio>
              </span>
            </el-radio-group>
          </template>
          <el-divider></el-divider>
          <span>
            <el-button type="primary" @click="alipayOrder">支付宝付款</el-button>
          </span>
          <span v-if="oneOrderPrice <= userBalance">
            <el-button type="primary" @click="payOrder">付款</el-button>
          </span>
          <span v-else>
            <el-button type="primary" disabled>付款</el-button>
            <el-tag type="danger">饭卡余额不足请充值</el-tag>
          </span>
        </el-dialog>
      </template>
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
                paymentVisible: false,
                evaluateVisible: false,
                dialogVisible: false,
                tableData: [],
                dishTableData: [],
                updateIndex: -1,
                loginInfo:JSON.parse(localStorage.getItem('loginInfo'))
            }
        },
        computed: {
            sumData() {
                let sum = 0;
                this.tableData.forEach((_) => {
                    sum += _.price;
                })
                return sum
            },
            userBalance() {
                return this.loginInfo.balance
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确定要取消付款吗')
                    .then(_ => {
                        this.paymentVisible = false;
                        done();
                    })
                    .catch(_ => {
                    });
            },
            searchByStatus() {
                if (this.value === '99' || this.value === '') {
                    this.$axios
                        .post('/order/query',{}).then((result) => {
                        this.tableData = result.data.obj;
                    })
                } else {
                    debugger
                    this.value;
                    this.$axios
                        .post('/order/query',{
                            status: JSON.parse(this.value),
                        }).then((result) => {
                        this.tableData = result.data.obj;
                    })
                }
            },
            getOrderInfo(scope) {
                // this.userBalance;
                this.paymentVisible = true;
                this.oneOrderId = scope.row.id;
                this.oneOrderPrice = scope.row.price;
            },
            payOrder() {
                this.$axios
                    .post('order/status/update', {
                        status: 1,
                        id: this.oneOrderId,
                    }).then(() => {
                    this.paymentVisible = false;
                    this.$message.success('支付成功');
                    this.$axios
                        .post('user/info/get',{}).then((result) => {
                        localStorage.setItem("loginInfo", JSON.stringify(result.data.obj));
                        // this.userBalance;
                        this.loginInfo=result.data.obj;
                        this.queryOrder();
                    })
                })
            },
            alipayOrder() {
                this.$axios
                    .post('alipay/payment', {
                        out_trade_no: this.oneOrderId + '',
                        subject: '食堂外卖',
                        total_amount: this.oneOrderPrice + '',
                        body: '',
                    }).then((resp) => {

                        // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
                        const divForm = document.getElementsByTagName('div')
                        if (divForm.length) {
                          document.body.removeChild(divForm[0])
                        }
                        const div = document.createElement('div')
                        div.innerHTML = resp.data // data就是接口返回的form 表单字符串
                        document.body.appendChild(div)
                        document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
                        document.forms[0].submit()
                        this.$axios
                            .post('order/status/update', {
                              status: 1,
                              id: this.oneOrderId,
                            })
                  })
            },
            queryOrder() {
                this.$axios
                    .post('/order/query', {}).then((result) => {
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
            submitItem() {
                this.updateIndex = this.form.id;
                this.evaluateVisible = true;
            },
            submitEvaluate() {
                this.evaluateVisible = false;
                this.dialogVisible = false;
                this.$axios
                    .post('order/evaluate/update', {
                        evaluate: this.form.evaluate,
                        id: JSON.parse(this.updateIndex)
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
