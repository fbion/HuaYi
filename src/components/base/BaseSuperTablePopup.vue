<template>
    <div class="pcitc-dialog-body">
        <base-card>
            <p slot="header">基本信息</p>
            <base-generate-form
                    ref="$baseGenerateForm"
                    :formProps="formProps"
                    :labelWidth="tableOpts.popup.labelWidth"
                    :add-mode="addMode"
                    :edit-mode="editMode"
                    :query-mode="queryMode"
                    :formData="formData">
            </base-generate-form>
        </base-card>
    </div>
</template>

<script>
  import emitter from '@/utils/MixinEmitter'
  import  * as ET from  '@/utils/ETTool'
  export default {
    name: 'BusiSuperTablePopup',
    props: {
      tableOpts: {
        type: Object,
        default: function() {
          return {}
        }
      },
      popupType: String,
      editParams: Object
    },
    mixins: [emitter],
    data() {
      return {
        formData: {}
      }
    },
    computed: {
      formProps: function() {
        return this.tableOpts.colModel
      },
      editMode: function() {
        return this.popupType === 'edit' ? true : false
      },
      addMode: function() {
        return this.popupType === 'add' ? true : false
      },
      queryMode: function() {
        return this.popupType === 'query' ? true : false
      }
    },
    watch: {},
    created() {
      if (this.editMode || this.queryMode) {
        // 编辑和查看的场合
        this.renderFormData(this.editParams)
      }
    },
    methods: {
      renderFormData(data) {
          console.log(data,'formdata')
          this.formData=data.data;
        //   return
        // const loading = F
        // if (this.$T.isInlineParams(data.url)) {
        //   // 严格遵循restful标准的url的场景
        //   let url = this.$T.replaceUrlParams(data.url, data.params)
        //   this.$http.get(url).then(response => {
        //     this.formData = Array.isArray(response.data) ? response.data[0] : response.data
        //     console.log('表单渲染getOne数据::' + JSON.stringify(this.formData))
        //     loading.close()
        //   }).catch(() => {
        //     loading.close()
        //   })
        // } else {
        //   this.$http.get(data.url, data.params).then(response => {
        //     this.formData = Array.isArray(response.data) ? response.data[0] : response.data
        //     console.log('表单渲染getOne数据::' + JSON.stringify(this.formData))
        //     loading.close()
        //   }).catch(() => {
        //     loading.close()
        //   })
        // }
      },
      async saveDB() {
        // 获取form数据
        let isVaild = await this.$refs.$baseGenerateForm.checkRules()
        if (!isVaild) {
          this.$T.warning()
          return false
        }
        let formModel = this.$refs.$baseGenerateForm.formModel
        console.log('保存/更新场合，传入的参数::' + JSON.stringify(formModel))
        // 存数据库
        let url = ''
        if (this.editMode) {
          url = this.tableOpts.inlineBtnOpts.editBtn.url
        }
        if (this.addMode) {
          url = this.tableOpts.operateBtnOpts.addBtn.url
        }
        this.$http.$service({
          url: url,
          method: this.editMode ? 'put' : 'post',
          data: ET.toCollectionJson([formModel])
        }).then(response => {
          this.$T.success()
          this.dispatch('BaseSuperTable', 'init-tableList')
          this.dispatch('BaseSuperTable', 'close-dialog')
        }).catch(() => {
        })
      }
    }
  }
</script>
