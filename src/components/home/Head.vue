<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">杭电协同点餐系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        Hi，{{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <span v-if="!isAdmin">
              <el-dropdown-item divided command="userBalance">余额</el-dropdown-item>
            </span>
            <el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
    import bus from './bus';

    export default {
        name: "Head",
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '用户',
                message: 2,
                isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
            };
        },
        computed: {
            username() {
                let username = JSON.parse(localStorage.getItem('loginInfo')).name;
                return username ? username : this.name;
            },
            userBalance() {
                return JSON.parse(localStorage.getItem('loginInfo')).balance
            }
        },
        methods: {
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command == 'logout') {
                    localStorage.removeItem('username');
                    localStorage.removeItem('loginInfo');
                    if (JSON.parse(localStorage.getItem('isAdmin'))) {
                        this.$axios
                            .post('/admin/logout', {})
                    } else {
                        this.$axios
                            .post('/user/logout', {})
                    }
                    this.$router.push('/login');
                } else if (command == 'changePassword') {
                    this.$prompt('请输入新密码', '修改密码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({value}) => {
                        if (JSON.parse(localStorage.getItem('isAdmin'))) {
                            this.$axios
                                .post('/admin/password/change', {
                                    password : value
                                })
                        } else {
                            this.$axios
                                .post('/user/password/change', {
                                    password : value
                                })
                        }
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消修改'
                        });
                    });
                } else if (command == 'userBalance') {
                    this.$confirm('您的一卡通余额为：' + this.userBalance + '元', '提示', {
                        confirmButtonText: '确定',
                    })
                }
            },
        },

        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    };
</script>
<style scoped>


  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
</style>

