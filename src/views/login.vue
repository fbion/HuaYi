<template>
    <div class="login-wrap" @keydown.enter="handleSubmit">
        <div class="content">
            <el-card class="box-card">

                <div slot="header" class="login-title clearfix">
                    <el-icon name="star-on"></el-icon>
                    <span>欢迎登录</span>
                </div>

                <div class="form-content">
                    <el-form :model="form" :rules="formRules" ref="loginForm" class="demo-ruleForm">
                        <el-form-item prop="userName">
                            <el-input size="small" v-model="form.userName" placeholder="请输入用户名">
                                <el-button slot="prepend" icon="el-icon-search" style="padding: 12px 10px;"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input size="small" type="password" v-model="form.password" auto-complete="off"
                                      placeholder="请输入密码">
                                <el-button slot="prepend" icon="el-icon-search" style="padding: 12px 10px;"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="handleSubmit" style="width: 100%">登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <p class="login-tip">输入任意用户名和密码即可</p>
            </el-card>
        </div>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        form: {
          userName: 'admin',
          password: 'admin'
        },
        formRules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            Cookies.set('user', this.form.userName)
            Cookies.set('password', this.form.password)
//            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
            if (this.form.userName === 'admin') {
              Cookies.set('access', 0)
            } else {
              Cookies.set('access', 1)
            }
            this.$router.push({
              name: 'main'
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
    .login-wrap {
        position: relative;
        background-image: url('../assets/images/login-page/page1.jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .content {
            position: absolute;
            right: 160px;
            top: 25%;
        }
        .box-card {
            width: 300px;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
        .form-content {
            padding: 10px 0 0;
        }
        .login-title {
            width: 100%;
            font-size: 14px;
            color: #1c2438;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .login-tip {
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
</style>
