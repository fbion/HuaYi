<template>
    <div class="base-btn-download-wrap">
        <a class="el-button el-button--primary el-button--mini"
           :href="filePath"
           :download="fileName">
            <i class="el-icon-download"></i>
            <span>
                <slot>文件下载</slot>
            </span>
        </a>
    </div>

</template>

<script>
  import emitter from '@/utils/MixinEmitter'

  export default {
    name: 'BaseBtnDownloadFile',
    components: {},
    mixins: [emitter],
    props: {
      filePath: {
        type: String,
        default: function() {
          return '#'
        }
      }
    },
    data() {
      return {
        fileName: '',
        isChrome: '',
        isSafari: ''
      }
    },
    computed: {},
    watch: {},
    created() {
      this.isChrome = function() {
        return navigator.userAgent.toLowerCase().indexOf('chrome') > -1
      }
      this.isSafari = function() {
        return navigator.userAgent.toLowerCase().indexOf('safari') > -1
      }
      if (/(iP)/g.test(navigator.userAgent)) {
        this.$T.warning('您的浏览器版本过低，不支持下载文件，请升级浏览器！')
        return false
      }
      if (this.isChrome || this.isSafari) {
        if (this.filePath !== undefined) {
          // Set HTML5 download attribute. This will prevent file from opening if supported.
          this.fileName = this.filePath.substring(this.filePath.lastIndexOf('/') + 1, this.filePath.length)
        }
      }
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="less">
    .base-btn-download-wrap {
        display: inline-block;
        a {
            text-decoration: none;
            span {
                margin-left: 5px;
            }
        }
    }
</style>
