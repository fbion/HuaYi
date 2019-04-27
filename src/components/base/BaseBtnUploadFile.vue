<template>
    <div :class="['base-btn-upload-file-wrap',showPlus ? 'show-plus' : 'hide-plus']">
        <el-upload :action="action"
                   :file-list="files"
                   :disabled="isDisabled"
                   style="display:inline-block;margin-right:15px;"
                   multiple
                   :before-upload="onBeforeUpload"
                   :on-success="onSuccess"
                   :on-error="onError"
                   :on-preview="onPreview"
                   :on-remove="onRemove">
            <el-button size="mini" type="primary" plain>点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
        <span v-if="isDisabled && !this.files.length">无</span>
    </div>
</template>

<script>

  export default {
    name: 'BaseBtnUploadFile',
    components: {},
    props: {
      value: [String, Array],
      uploadOpts: Object,
      addMode: Boolean,
      editMode: Boolean,
      queryMode: Boolean,
      disabled: Boolean
    },
    data() {
      return {
        files: [],
        loading: null,
        dialogImageUrl: '',
        dialogVisible: false,
        action: this.uploadOpts.action,
        multipleFile: this.uploadOpts.multipleFile ? this.uploadOpts.multipleFile : true
      }
    },
    computed: {
      showPlus: function() {
        if (this.editMode || this.addMode) {
          return true
        } else {
          return false
        }
      },
      isDisabled: function() {
        if (this.disabled) {
          return true
        } else {
          return this.queryMode
        }
      }
    },
    watch: {
      value: function(newData, oldData) {
        if (!newData) {
          this.files = []
          return
        }
        try {
          if (typeof newData === 'string') {
            newData = JSON.parse(newData)
          }
          this.files = newData
          // console.log(this.files)
        } catch (e) {
          this.files = []
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      onBeforeUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isLt10M) {
          this.$T.warning(this.$CONST.MSG_BUSINESS_UPLOAD_SIZE_10M)
          return false
        }
        if (isLt10M) {
          this.loading = this.$loading(
            {
              lock: true,
              text: this.$CONST.MSG_BUSINESS_UPLOAD
            }
          )
        } else {
          return false
        }
      },
      onSuccess(response, file, fileList) {
        this.loading.close()
        const body = response.body
        if (response.code * 1 === 200) {
          this.files.push({ name: file.name, url: process.env.VUE_APP_PUBLIC_SERVICE + body.data.fileUrl })
          this.$emit('input', this.files)

          this.$T.success(this.$CONST.MSG_BUSINESS_UPLOAD_SUCCESS)
        } else {
          this.$T.success(this.$CONST.MSG_BUSINESS_UPLOAD_FAIL)
        }
      },
      onError() {
        this.files = []
        this.$T.fail()
        this.loading.close()
      },
      onRemove(file, fileList) {
        this.files = this.files.filter(function(item) {
          return item !== file
        })
        this.$emit('input', this.files)
      },
      onPreview(file) {
        document.location.href = file.url
      }
    }
  }
</script>

<style lang="less">
    .base-btn-upload-file-wrap {
        &.hide-plus {
            .el-upload {
                display: none;
            }
        }
        &.show-plus {
            .el-upload {
                display: inline-block;
            }
        }
        .el-upload--picture-card {
            width: 50px;
            height: 50px;
            line-height: 59px;
        }
        .el-upload-list--picture-card {
            .el-upload-list__item-actions {
                font-size: 12px;
            }
            .el-upload-list__item {
                width: 50px;
                height: 50px;
                border: 0;
            }
        }
    }
</style>
