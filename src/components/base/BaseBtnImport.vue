<template>
    <el-upload class="base-btn-import-wrap"
               :action="action"
               :show-file-list="false"
               :before-upload="onBeforeUpload"
               :on-success="onSuccess"
               :on-error="onError">
        <slot name="trigger-btn">
            <base-btn>
                <slot></slot>
            </base-btn>
        </slot>
    </el-upload>
</template>

<script>
  import emitter from '@/utils/MixinEmitter'

  export default {
    name: 'BaseBtnImPortBtn',
    components: {},
    mixins: [emitter],
    props: {
      action: {
        type: String,
        default: function() {
          return ''
        }
      },
      successCallback: Function
    },
    data() {
      return {
        loading: null
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onBeforeUpload() {
        this.loading = this.$loading(
          {
            lock: true,
            text: this.$CONST.MSG_BUSINESS_IMPORT
          }
        )
      },
      onSuccess(response, file, fileList) {
        this.loading.close()
        if (typeof this.successCallback === 'function') {
          this.successCallback.call(null, response, file, fileList)
        } else {
          if (response.code * 1 === 200) {
            this.$T.success(response.body.data)
            this.dispatch('BaseSuperTable', 'init-tableList')
          } else {
            this.$T.success(response.msg)
          }
        }
      },
      onError() {
        this.$T.fail()
        this.loading.close()
      }
    }
  }
</script>

<style lang="less">
    .base-btn-import-wrap {
        display: inline-block;
        margin: 0 10px;
    }
</style>
