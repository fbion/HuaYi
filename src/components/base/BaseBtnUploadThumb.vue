<template>
    <div :class="['base-btn-upload-thumb-wrap',showPlus ? 'show-plus' : 'hide-plus']">
        <el-upload :action="action"
                   :list-type="listType"
                   :file-list="files"
                   :disabled="queryMode"
                   :before-upload="onBeforeUpload"
                   :on-success="onSuccess"
                   :on-error="onError"
                   :on-preview="onPreview"
                   :on-remove="onRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog class="pcitc-customer-dialog"
                   title="预览"
                   v-if="dialogVisible"
                   :modal="false"
                   :append-to-body="true"
                   :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>

  export default {
    name: 'BaseBtnUploadThumb',
    components: {},
    props: {
      value: [String, Array],
      uploadOpts: Object,
      addMode: Boolean,
      editMode: Boolean,
      queryMode: Boolean
    },
    data() {
      return {
        files: [],
        loading: null,
        dialogImageUrl: '',
        dialogVisible: false,
        action: this.uploadOpts.action,
        multiple: this.uploadOpts.multiple,
        listType: 'picture-card'
      }
    },
    computed: {
      showPlus: function() {
        if (!this.multiple && this.files.length < 1) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      value: function(newData, oldData) {
        if (newData) {
          const o = {
            url: newData
          }
          if (!this.files.length || !this.files.find(o)) {
            // 为了避免重复上传
            this.files.push(o)
          }
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      onBeforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPNG) {
          this.$T.warning(this.$CONST.MSG_BUSINESS_UPLOAD_IMG)
          return false
        }
        if (!isLt2M) {
          this.$T.warning(this.$CONST.MSG_BUSINESS_UPLOAD_SIZE_2M)
          return false
        }

        if ((isJPG || isPNG) && isLt2M) {
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
          this.files.push({ url: process.env.VUE_APP_PUBLIC_SERVICE + body.data.fileUrl })
          this.$emit('input', this.multiple ? this.files : this.files[0].url)
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
        this.$emit('input', this.multiple ? this.files : '')
      },
      onPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="less">
    .base-btn-upload-thumb-wrap {
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
