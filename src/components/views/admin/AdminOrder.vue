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
        width="600px">
        <div>
          <el-table :data="dishTableData" v-model="form">
            <el-table-column label="菜品" prop="dishName" width="200"></el-table-column>
            <el-table-column label="数量" prop="dishNumber" width="157"></el-table-column>
            <el-table-column label="价格/元" prop="price" width="200"></el-table-column>
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
              <el-input type="textarea" disabled v-model="form.evaluate"></el-input>
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

  </div>
</template>

<script>
    export default {
        name: "UserOrder",
        data() {
            return {
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
                    value: '选项0',
                    label: '全部订单'
                }, {
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
                evaluateVisible: false,
                dialogVisible: false,
                tableData: [],
                dishTableData: [],
                updateIndex: -1,
            }
        },
        methods: {
            queryOrder() {
                this.$axios
                    .post('/order/all/query', {}).then((result) => {
                    this.tableData = result.data.obj;
                })

            },
            queryOrderDetails(scope) {
                this.dishTableData = scope.row.orderDishVoList;
                this.dialogVisible = true;
                this.form.id = scope.row.id;
                this.form.name = scope.row.name;
                this.form.phone = scope.row.phone;
                this.form.address = scope.row.address;
                this.form.evaluate = scope.row.evaluate;
            },
            submitItem(){
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
