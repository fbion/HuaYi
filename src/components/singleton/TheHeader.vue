<template>
    <section class="header-wrap">
        <div class="header-left"></div>
        <div class="header-right">
            <the-full-screen v-model="isFullScreen"></the-full-screen>
            <the-theme-switcher></the-theme-switcher>
            <el-dropdown style="color: #fff;margin-right: 10px" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="ownerCenter">个人中心</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <the-avator :src="avator"></the-avator>
        </div>
    </section>
</template>

<script>
  import TheThemeSwitcher from './TheThemeSwitcher.vue'
  import TheFullScreen from './TheFullScreen.vue'
  import TheAvator from './TheAvator.vue'

  export default {
    components: { TheThemeSwitcher, TheFullScreen, TheAvator },
    data: function() {
      return {
        isFullScreen: false
      }
    },
    computed: {
      user() {
        return this.$store.state.app.user
      },
      avator() {
        return this.$store.state.app.avator
      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'ownerCenter') {

        } else if (command === 'loginout') {
          this.$store.commit('logout')
          this.$store.commit('clearAllTags')
          this.$router.push({
            name: 'login'
          })
        }
      }
    }
  }
</script>

<style lang="less">
    @import "../../styles/var/variable";

    .header-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: @dark--background-base;
        padding: 0 10px;
        text-align: right;
        /*cursor: pointer;*/

        .el-header {
            color: #fff;
            line-height: 60px;
            padding: 0;
        }

        .header-left {

        }
        .header-right {
            position: absolute;
            right: 10px;
            top: 15px;
            height: 100%;
            width: 300px;
        }
    }
</style>
