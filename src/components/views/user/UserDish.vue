<template>
  <div>
    <!--  -->
    <!--    <div>-->
    <!--      <img src="../../../assets/dish/1.jpg">-->
    <!--    </div>-->
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>菜单</span>
      </el-card>
    </div>
    <div class="operate-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="480"
        v-loading="loading"
        element-loading-text="拼命加载中">
        <el-table-column
          label="菜品图片"
          prop="base64Url">
          <template slot-scope="scope">
            <img style="height: 80px; width: 80px" :src="'data:image/jpg;base64,'+scope.row.base64Url">
          </template>
        </el-table-column>
        <el-table-column
          label="菜名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="单价（元）"
          prop="price">
        </el-table-column>
        <el-table-column
          label="销量"
          prop="salesVolume">
        </el-table-column>

        <el-table-column
          align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.whetherInCart">
              <el-input-number size="mini" v-model="scope.row.dishNumber" @change="handleChange(scope)" :min="1"
                               :max="99"
                               label="描述文字"></el-input-number>
              <el-button size="mini" @click="deleteCart(scope)" type="danger">移出购物车</el-button>
            </span>
            <span v-else>
              <el-button size="mini" @click="addCart(scope)" type="primary">加入购物车</el-button>
            </span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div>
      <template v-if="cartData != ''">
        <el-card class="bottom" shadow="never">
          <i class="el-icon-shopping-cart-full"></i>
          <el-button type="primary" @click="goToPay">我要结账</el-button>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
    export default {
        search: '',
        name: "UserDish",
        data() {
            return {
                loading: true,
                search: '',
                dishId: -1,
                tableData: [],
                cartData: [],
            }
        },
        methods: {
            queryDish() {
                this.$axios
                    .post('dish/query', {}).then((result) => {
                    let tableData = result.data.obj;
                    this.$axios
                        .post('cart/query', {}).then((result) => {
                        this.cartData = result.data.obj;
                        tableData.forEach((_) => {
                            _['whetherInCart'] = false;
                            _.dishNumber = 0;
                            let obj = this.cartData.find((a) => {
                                return a.dishId == _.id
                            });
                            if (obj) {
                                _['whetherInCart'] = true;
                                _.dishNumber = obj.dishNumber;
                            }
                        });
                        this.tableData = tableData;
                        this.loading = false;
                    });
                })

            },
            handleChange(scope) {
                this.$axios
                    .post('cart/number/update', {
                        changeNumber: scope.row.dishNumber,
                        dishId: scope.row.id,
                    });
                this.queryCart()
            },
            addCart(scope) {
                this.$axios
                    .post('cart/save', {
                        dishId: scope.row.id,
                        dishNumber: 1,
                        price: 0,
                    }).then(() => {
                    this.queryDish();
                })
            },
            deleteCart(scope) {
                this.$axios
                    .post('cart/one/delete', {
                        dishId: scope.row.id,
                    }).then(() => {
                    this.queryDish()
                });
            },
            goToPay() {
                this.$router.push('/cart')
            },
        },
        mounted() {
            this.queryDish()
        }
    }
</script>

<style scoped>

</style>
