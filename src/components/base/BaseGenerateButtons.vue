<template>
    <div class="buttons-scope-wrap">
        <base-btn type="primary"
                  :oauth="oauth ? oauth.isOauthAdd : true"
                  @on-click="handleAdd"
                  v-if="btnOpts.addBtn">新增
        </base-btn>
        <base-btn type="danger"
                  :oauth="oauth ? oauth.isOauthDelete : true"
                  @on-click="handleDelete"
                  v-if="btnOpts.deleteBtn">删除
        </base-btn>
        <base-btn type="success"
                  :oauth="oauth ? oauth.isOauthStart : true"
                  @on-click="handleStart"
                  v-if="btnOpts.startBtn">启用
        </base-btn>
        <base-btn type="info"
                  :oauth="oauth ? oauth.isOauthStop : true"
                  @on-click="handleStop"
                  v-if="btnOpts.stopBtn">停用
        </base-btn>
        <base-btn-import v-if="isShowImport"
                         :action="btnOpts.importBtn.url">导入
        </base-btn-import>
        <base-btn :oauth="oauth ? oauth.isOauthExport : true"
                  @on-click="handleExport"
                  v-if="btnOpts.exportBtn">导出
        </base-btn>
    </div>
</template>

<script>

  export default {
    name: 'BaseGenerateButtons',
    inject: {
      oauth: {
        default: {
          isOauthAdd: true,
          isOauthEdit: true,
          isOauthDelete: true,
          isOauthExport: true,
          isOauthImport: true,
          isOauthStart: true,
          isOauthStop: true
        }
      }
    },
    props: {
      btnOpts: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data: function() {
      return {}
    },
    computed: {
      isShowImport: function() {
        if (this.btnOpts.importBtn) {
          return this.oauth ? this.oauth.isOauthImport : true
        } else {
          return false
        }
      }
    },
    methods: {
      handleAdd() {
        this.$emit('on-add')
      },
      handleImport() {
        this.$emit('on-import')
      },
      handleExport() {
        this.$emit('on-export')
      },
      handleDelete() {
        this.$emit('on-delete')
      },
      handleStart() {
        this.$emit('on-start')
      },
      handleStop() {
        this.$emit('on-stop')
      }
    }
  }
</script>

<style lang="less">
    .buttons-scope-wrap {
        float: right;
        padding-top: 12px;
        padding-bottom: 10px;
        .upload {
            display: inline-block;
            margin: 0 10px;
        }
    }
</style>
