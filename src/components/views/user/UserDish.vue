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
        style="width: 100%">
        <el-table-column
          label="菜名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="单价/元"
          prop="price">
        </el-table-column>
        <el-table-column
          label="销量"
          prop="salesVolume">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserDish",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            queryDeliveryInfo() {
                this.$axios
                    .post('dish/query', {}).then((result) => {
                    this.tableData = result.data.obj;
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
