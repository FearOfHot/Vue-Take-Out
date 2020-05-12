<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px" :model="loginForm" :rules="rules" ref="login">
    <h3 class="login_title">杭电协同点餐系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"  @keyup.enter.native="userLogin"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="userLogin" @keyup.enter.native="userLogin">登录</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="adminLogin" @keyup.enter.native="adminLogin">管理员账号登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
                responseResult: []
            }
        },
        methods: {
            userLogin () {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$axios
                            .post('user/login', {
                                number: this.loginForm.username,
                                password: this.loginForm.password
                            })
                            .then(successResponse => {
                                if (successResponse.data.code === 200) {
                                    // this.$store.commit('userLogin', this.loginForm)
                                    localStorage.setItem('username', this.loginForm.username);
                                    this.$message.success('登录成功');
                                    this.$router.push('/user/index')
                                    // var path = this.$route.query.redirect
                                    // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                                } else {
                                    this.$message.error('账号或密码错误');
                                }
                            })
                            .catch(failResponse => {
                            })
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            adminLogin () {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$axios
                            .post('/admin/login', {
                                username: this.loginForm.username,
                                password: this.loginForm.password
                            })
                            .then(successResponse => {
                                debugger
                                if (successResponse.data.code === 200) {
                                    // this.$store.commit('adminLogin', this.loginForm)
                                    localStorage.setItem('username', this.loginForm.username);
                                    localStorage.setItem('userinfo', JSON.stringify(successResponse.data.obj));
                                    this.$message.success('登录成功');
                                    this.$router.push('/admin/index')
                                    // var path = this.$route.query.redirect
                                    // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                                } else {
                                    this.$message.error('管理员账号或密码错误');
                                }
                            })
                            .catch(failResponse => {
                            })
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
  #poster {
    background:url("../../assets/index.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 240px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>

