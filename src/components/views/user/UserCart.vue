<template>
  <div>
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-shopping-cart-2"></i>
        <span>购物车</span>
      </el-card>
    </div>
    <div class="operate-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="480">
        <el-table-column
          label="菜品图片"
          prop="dishBase64Url"
          width="100px">
          <template slot-scope="scope"><img style="height: 80px; width: 80px" :src="'data:image/jpg;base64,'+scope.row.dishBase64Url">
          </template>
        </el-table-column>
        <el-table-column
          label="菜名"
          prop="dishName"
          align="center">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="dishDesc">
        </el-table-column>
        <el-table-column
          label="数量（份）"
          prop="dishNumber"
          align="center">
          <template slot-scope="scope">
            <el-input-number size="mini" v-model="scope.row.dishNumber" @change="handleChange(scope)" :min="1" :max="99"
                             label="描述文字"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="价格（元）"
          prop="price"
          align="center">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-button type="danger" size="mini" @click="clearVisible = true">清空购物车</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteCart(scope)">移出购物车
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <template>
        <el-dialog
          title="提示"
          :visible.sync="clearVisible"
          width="30%">
          <span>确定要清空购物车吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="clearVisible = false">取 消</el-button>
            <el-button type="danger" @click="clearCart">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </div>

    <div>
      <el-card class="bottom" shadow="never">
        <i class="el-icon-coin"></i>
        <span>总金额{{sumData}}元</span>
        <template v-if="sumData != 0">
          <el-button type="primary" @click="selectDelivery">下单</el-button>
        </template>
      </el-card>
    </div>

    <div>
      <el-dialog
        title="选择地址"
        :visible.sync="deliveryVisible"
        width="850px">
        <div>
          <el-table :data="deliveryData" height="280px">
            <el-table-column
              width="50"
              height="200px">
              <template slot-scope="scope">
                <el-radio v-model="selectAdressId" :label="scope.row.id"></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="收货人" prop="name" width="100"></el-table-column>
            <el-table-column label="电话" prop="phone" width="100"></el-table-column>
            <el-table-column label="校区" prop="school" width="150"></el-table-column>
            <el-table-column label="配送区域" prop="region" width="100"></el-table-column>
            <el-table-column label="具体地址" prop="address" width="300"></el-table-column>
            <el-divider></el-divider>
          </el-table>
        </div>
        <div>
          <el-form>
            <el-divider></el-divider>
            <el-form-item label="订单备注" v-model="remark">
              <el-input type="textarea" v-model="remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <template>
            <el-form ref="form" label-width="80px">
              <el-form-item align="center">
                <el-button type="primary" @click="createOrder()">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </el-dialog>
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
              <span><el-tag>您需要支付：{{orderPrice}}元</el-tag></span>
            </div>
            <el-divider></el-divider>
            <el-radio-group v-model="radio">
              <el-radio disabled :label="1">支付宝</el-radio>
              <el-radio disabled :label="2">微信</el-radio>
              <span v-if="orderPrice <= userBalance">
                <el-radio :label="3">一卡通（余额）：{{userBalance}}元</el-radio>
              </span>
              <span v-else>
                <el-radio :label="3" disabled>一卡通（余额）：{{userBalance}}元</el-radio>
              </span>
            </el-radio-group>
          </template>
          <span slot="footer" class="dialog-footer" v-if="orderPrice <= userBalance">
            <el-button type="primary" @click="payOrder">付款</el-button>
          </span>
          <span slot="footer" class="dialog-footer" v-else>
            <el-button type="primary" @click="payOrder" disabled>付款</el-button>
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
                orderPrice: 0,
                newOrderId: 0,
                remark: '',
                selectAdressId: -1,
                radio: 3,
                deliveryVisible: false,
                paymentVisible: false,
                clearVisible: false,
                search: '',
                tableData: [],
                deliveryData: [],
                // balance: 0,
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
                return JSON.parse(localStorage.getItem('loginInfo')).balance
            }
        },

        methods: {
            handleClose(done) {
                this.$confirm('确定要取消付款吗')
                    .then(_ => {
                        this.deliveryVisible = false;
                        this.paymentVisible = false;
                        done();
                    })
                    .catch(_ => {
                    });
            },

            queryCart() {
                this.$axios
                    .post('cart/price', {}).then(() => {
                    this.$axios
                        .post('cart/query', {}).then((result) => {
                        this.tableData = result.data.obj;
                    });
                });
            },
            handleChange(scope) {
                this.$axios
                    .post('cart/number/update', {
                        changeNumber: scope.row.dishNumber,
                        dishId: scope.row.dishId,
                    }).then(() => {
                    this.queryCart()
                });
            },
            deleteCart(scope) {
                this.$axios
                    .post('cart/one/delete', {
                        dishId: scope.row.dishId,
                    }).then(() => {
                    this.queryCart()
                });
            },
            clearCart() {
                this.$axios
                    .post('cart/all/delete', {}).then(() => {
                    this.clearVisible = false;
                    this.$message.success('清空购物车成功');
                    this.queryCart()
                })
            },
            createOrder() {
                this.orderPrice = this.sumData;
                this.$axios
                    .post('order/create', {
                        deliveryId: this.selectAdressId,
                        remark: this.remarks
                    }).then((result) => {
                    this.newOrderId = result.data.obj;
                    this.$axios
                        .post('cart/all/delete', {}).then(() => {
                        this.$message.success('下单成功');
                        this.paymentVisible = true;
                        this.deliveryVisible = false;
                        this.queryCart()
                    })
                })
            },
            payOrder() {
                this.$axios
                    .post('order/status/update', {
                        status: 1,
                        id: this.newOrderId
                    }).then(() => {
                    // this.deliveryVisible = false;
                    this.paymentVisible = false;
                  this.$message.success('支付成功');
                    this.$axios
                        .post('user/info/get', {}).then((result) => {
                        localStorage.setItem("loginInfo", JSON.stringify(result.data.obj))
                    })
                })
            },
            selectDelivery() {
                this.deliveryVisible = true;
                this.$axios
                    .post('delivery/info/query', {}).then((result) => {
                    this.deliveryData = result.data.obj;
                })
            },
        },
        mounted() {
            this.queryCart()
        }
    }
</script>

<style scoped>

</style>
