<template>
  <div>
    <div>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-truck"></i>
        <span>配送信息</span>
      </el-card>
    </div>

    <div class="operate-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="收货人姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="收货人电话"
          prop="phone">
        </el-table-column>
        <el-table-column
          label="收货地址"
          prop="address">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-button size="mini" @click="addItem()">新增配送地址</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteItem(scope)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <template>
        <el-dialog title="新增配送信息" :visible.sync="addVisible" custom-class="dialog">
          <el-form :model="form">
            <el-form-item label="收货人姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item label="校区" :label-width="formLabelWidth">
              <el-select v-model="form.school" placeholder="请选择活动区域">
                <el-option label="杭电下沙主校区" value="杭电下沙主校区"></el-option>
                <el-option label="杭电青山湖校区" value="杭电青山湖校区"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配送区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="教学区" value="教学区"></el-option>
                <el-option label="生活区" value="生活区"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="具体地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDeliveryInfo">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </div>

    <div>
      <template>
        <el-dialog
          title="提示"
          :visible.sync="deleteVisible"
          width="30%">
          <span>确定要删除这个配送地址吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="danger" @click="deleteDeliveryInfo">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </div>


  </div>
</template>

<script>
    export default {
        name: "UserDeliveryInfo",
        data() {
            return {
                search:'',
                form: {
                    name: '',
                    phone: '',
                    school: '',
                    region: '',
                    address: '',
                },
                formLabelWidth: '120px',
                addVisible: false,
                deleteVisible: false,
                tableData: [],
                deleteIndex: -1
            }
        },
        methods: {
            addItem() {
              this.addVisible = true;
            },
            deleteItem(scope) {
                debugger
                this.deleteIndex = scope.row.id;
                this.deleteVisible = true;
            },
            queryDeliveryInfo() {
                this.$axios
                    .post('delivery/info/query', {
                        userId: JSON.parse(localStorage.getItem('loginInfo')).id
                    }).then((result) => {
                    this.tableData = result.data.obj;
                })

            },
            addDeliveryInfo() {
                this.addVisible = false;
                this.$axios
                    .post('/delivery/info/save', {
                        name: this.form.name,
                        address: this.form.school + this.form.region + this.form.address,
                        phone: this.form.phone
                    }).then(() => {
                        this.queryDeliveryInfo()
                })
            },
            editDeliveryInfo() {

            },
            deleteDeliveryInfo() {
                this.deleteVisible = false;
                this.$axios
                    .post('delivery/info/delete', {
                        id: JSON.parse(this.deleteIndex)
                    }).then(() => {
                    this.queryDeliveryInfo()
                })

            }
        },
        mounted() {
            this.queryDeliveryInfo()
        }
    }
</script>

<style scoped>
  /deep/ .dialog{
      width: 30%;
      height: 53%;
    }
</style>
