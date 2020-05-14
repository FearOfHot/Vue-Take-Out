<template>
  <div>
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
        height="560px">
        <el-table-column
          label="菜品图片"
          prop="url">
          <template slot-scope="scope"><img style="height: 80px; width: 80px" :src="scope.row.url">{{scope.row.url}} </template>
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
            <el-button
              size="mini"
              @click="addCart(scope)"
              type="primary">加入购物车
            </el-button>

            <el-input-number size="mini" v-model="scope.row.dishNumber" @change="handleChange(scope)" :min="1" :max="99"
                             label="描述文字"></el-input-number>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        search: '',
        name: "UserDish",
        data() {
            return {
                search: '',
                dishId: -1,
                tableData: [],
                cartData: [],
            }
        },
        methods: {
            queryDeliveryInfo() {
                this.$axios
                    .post('dish/query', {}).then((result) => {
                    this.tableData = result.data.obj;
                })

                this.$axios
                    .post('cart/query', {}).then((result) => {
                    this.cartData = result.data.obj;
                });

            },
            handleChange(scope) {
                this.$axios
                    .post('cart/number/update', {
                        changeNumber: scope.row.dishNumber,
                        dishId: scope.row.dishId,
                    });
                this.queryCart()
            },
            addCart(scope) {
                this.$axios
                    .post('cart/save', {
                        dishId: scope.row.id,
                        dishNumber: 1,
                        price: 0,
                    })
            }
        },
        mounted() {
            this.queryDeliveryInfo()
        }
    }
</script>

<style scoped>

</style>
