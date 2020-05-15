<template>
  <div>

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
          <template slot-scope="scope"><img style="height: 80px; width: 80px" :src="scope.row.url">
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
          <template slot="header" slot-scope="scope">
            <el-button type="primary" size="mini" @click="addItem()">新增菜品</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editItem(scope)">编辑
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
        <el-dialog title="新增菜品" :visible.sync="addVisible" :before-close="handleClose" width="600px">
          <el-form :model="form" :rules="rules">
<!--            <el-form-item>-->
<!--              <div>-->
<!--                <template>-->
<!--                  <el-upload-->
<!--                    class="upload-demo"-->
<!--                    :on-success="handleAvatarSuccess"-->
<!--                    action="image/upload"-->
<!--                    :on-preview="handlePreview"-->
<!--                    :on-remove="handleRemove"-->
<!--                    :file-list="fileList"-->
<!--                    list-type="picture">-->
<!--                    <el-button size="small" type="primary">点击上传菜品图片</el-button>-->
<!--                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                    <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                  </el-upload>-->

<!--                </template>-->
<!--              </div>-->
<!--            </el-form-item>-->
            <el-form-item prop="name" label="菜名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="菜品单价" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item prop="desc" label="菜品描述" :label-width="formLabelWidth">
              <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="clearForm">取 消</el-button>
            <el-button type="primary" @click="addDish">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </div>

    <div>
      <template>
        <el-dialog title="编辑菜品信息" :visible.sync="editVisible" :before-close="handleClose">
          <el-form :model="form" :rules="rules">
            <el-form-item prop="name" label="菜名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="菜品单价" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item prop="desc" label="菜品描述" :label-width="formLabelWidth">
              <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="clearForm">取 消</el-button>
            <el-button type="primary" @click="editDish">确 定</el-button>
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
          <span>确定要删除这个菜品吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="clearForm">取 消</el-button>
            <el-button type="danger" @click="deleteDish">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </div>

  </div>
</template>

<script>
    export default {
        search: '',
        name: "AdminDish",
        imageUrl: '',
        data() {
            return {
                fileList: [{}],
                search: '',
                form: {
                    name: '',
                    price: 0,
                    desc: null,
                },
                dishId: -1,
                tableData: [],
                formLabelWidth: '120px',
                addVisible: false,
                editVisible: false,
                deleteVisible: false,
                deleteIndex: -1,
                editIndex: -1,
                rules: {
                    name: [{required: true, message: '请输入菜名', trigger: 'blur'}],
                    price: [{required: true, message: '请输入菜品单价', trigger: 'blur'}],
                },
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(res)
                console.log(file)
            },

            handleClose(done) {
                this.$confirm('关闭后修改的内容不做保存,确认关闭？')
                    .then(_ => {
                        this.clearForm();
                        done();
                    })
                    .catch(_ => {
                    });

            },
            addItem() {
                this.addVisible = true;
            },
            editItem(scope) {
                this.editIndex = scope.row.id;
                this.editVisible = true;
                this.form.name = scope.row.name;
                this.form.price = scope.row.price;
                this.form.desc = scope.row.desc;
            },
            deleteItem(scope) {
                this.deleteIndex = scope.row.id;
                this.deleteVisible = true;
            },
            queryDish() {
                this.$axios
                    .post('dish/query', {}).then((result) => {
                    this.tableData = result.data.obj;
                })

            },
            addDish() {
                this.addVisible = false;
                this.$axios
                    .post('dish/save', {
                        name: this.form.name,
                        price: this.form.price,
                        desc: this.form.desc,
                    }).then(() => {
                    this.$message.success('新增菜品信息成功');
                    this.queryDish();
                    this.clearForm();
                })
            },
            editDish() {
                this.editVisible = false;
                this.$axios
                    .post('dish/save', {
                        id: JSON.parse(this.editIndex),
                        name: this.form.name,
                        price: this.form.price,
                        desc: this.form.desc,
                    }).then(() => {
                    this.$message.success('编辑菜品信息成功');
                    this.queryDish();
                    this.clearForm();
                })
            },
            deleteDish() {
                this.deleteVisible = false;
                this.$axios
                    .post('dish/delete', {
                        id: JSON.parse(this.deleteIndex)
                    }).then(() => {
                    this.$message.success('删除菜品信息成功');
                    this.queryDish();
                    this.clearForm();
                })

            },
            clearForm() {
                this.deleteVisible = false;
                this.addVisible = false;
                this.editVisible = false;
                this.form.name = '';
                this.form.price = 0;
                this.form.desc = null;
            }
        },
        mounted() {
            this.queryDish()
        }
    }
</script>

<style scoped>

</style>
