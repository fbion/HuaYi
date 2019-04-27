<template>
    <base-card>
        <p slot="header">方案计划</p>
        <base-generate-form
                ref="$schemePlanner"
                :formProps="formFiled"
                :add-mode="addMode"
                :query-mode="queryMode"
                :edit-mode="editMode"
                :formData="schemePlannerObj">
        </base-generate-form>
    </base-card>
</template>

<script>
  export default {
    name: 'schemePlanner',
    components: {},
    mixins: [],
    props: {
      addMode: Boolean,
      queryMode: Boolean,
      editMode: Boolean,
      formProps: Array,
      formData: Object
    },
    data() {
      return {
        schemePlannerObj: {},
        defaultFormFiled: [
          {
            label: '方案ID',
            prop: 'schemeId',
            hide: true,
            opts: {
              type: 'input'
            }
          },
          {
            label: '装卸单位',
            prop: 'loadUnit',
            opts: {
              type: 'input',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '装卸负责人',
            prop: 'loadUser',
            opts: {
              type: 'input',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '装卸开始时间',
            prop: 'loadBeginTime',
            opts: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm',
              valueFormat: 'yyyy-MM-dd HH:mm:ss',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '装卸结束时间',
            prop: 'loadEndTime',
            opts: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm',
              valueFormat: 'yyyy-MM-dd HH:mm:ss',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '方案编制人',
            prop: 'planUser',
            opts: {
              type: 'input',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '联系方式',
            prop: 'planUserTel',
            opts: {
              type: 'input',
              checkRules: [
                { required: true }
              ]
            }
          },
          {
            label: '装卸要求',
            prop: 'loadRequirement',
            opts: {
              type: 'textarea',
              checkRules: [
                { required: true }
              ],
              formClassName: 'half-row'
            }
          },
          {
            label: '附件',
            prop: 'attachment',
            opts: {
              type: 'upload',
              upload: {
                mode: 'text',
                action: this.$API.PUBLIC_POST_DLMS_FILE_UPLOAD
              }
            }
          }
        ]
      }
    },
    computed: {
      formFiled: function() {
        if (this.formProps) {
          return this.formProps
        } else {
          return this.defaultFormFiled
        }
      }
    },
    watch: {
      formData: function(newVal) {
        if (!newVal) return
        this.schemePlannerObj = newVal
      }
    },
    created() {},
    mounted() {},
    methods: {
      async getBaseGenerateForm() {
        // 获取表单中的数据
        let isVaild = await this.$refs.$schemePlanner.checkRules()
        if (!isVaild) {
          this.$T.warning()
          return false
        } else {
          return this.$refs.$schemePlanner.formModel
        }
      }
    }
  }
</script>
