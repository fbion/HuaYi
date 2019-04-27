<template>
  <div @click="handleChange" v-if="showFullScreenBtn" class="full-screen-wrapper">
    <el-tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <el-icon :name="value ? 'my-exit-fullscreen' : 'my-fullscreen'"></el-icon>
    </el-tooltip>
  </div>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    name: 'TheFullScreen',
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      showFullScreenBtn() {
        return window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    methods: {
      handleChange() {
        if (!screenfull.enabled) {
          this.$message({
            message: '浏览器不支持',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      }
    }
  }
</script>

<style lang="less">
  @import "../../styles/var/variable";
  .full-screen-wrapper {
    display: inline-block;
    width: 30px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    color: @color-white;
    i {
      font-size: 23px
    }
  }
</style>
