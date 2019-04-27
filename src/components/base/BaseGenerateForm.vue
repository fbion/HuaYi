<template>
    <el-form :class="['base-generate-form',{'query-mode':queryMode}]"
             ref="$popupForm"
             :validate-on-rule-change="validateOnRuleChange"
             :rules="rulesObj"
             :model="formModel"
             :label-width="labelWidth">
        <template v-for="(item, index) in formPropsClone">
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='input' && isShowItem(item.opts)"
                    :class="item.opts.formClassName"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <template v-if="isHasNumberCheck(item.opts)">
                    <el-input v-model.number="formModel[item.prop]"
                              :placeholder="addMode ? item.label : ''"
                              clearable
                              :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled"
                              @input="handleInputChange(item,formModel[item.prop])">
                    </el-input>
                </template>
                <template v-else>
                    <el-input v-model="formModel[item.prop]"
                              :placeholder="addMode ? item.label : ''"
                              clearable
                              :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled"
                              @input="handleInputChange(item,formModel[item.prop])">
                    </el-input>
                </template>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='select' && item.opts.showMode==='cascader'"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-cascader
                        :placeholder="addMode ? item.label : ''"
                        :show-all-levels="false"
                        filterable
                        clearable
                        :disabled="allFormDisabled ? allFormDisabled : (item.opts.disabled ? item.opts.disabled :disabledObj[item.prop])"
                        :options="item.opts.data"
                        :props="changeProps(item.opts)"
                        v-model="formModel[item.prop]"
                        @change="handleSelectChange">
                </el-cascader>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='select' && item.opts.showMode==='normal'"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-select v-model="formModel[item.prop]"
                           filterable
                           clearable
                           :multiple="item.opts.multiple"
                           :disabled="allFormDisabled ? allFormDisabled : (item.opts.disabled ? item.opts.disabled : disabledObj[item.prop])"
                           :placeholder="addMode ? item.label : ''"
                           @change="handleSelectChange(item,formModel[item.prop],item.opts.data,item.opts.dictionaryData)">
                    <el-option
                            v-for="obj in item.opts.data"
                            :key="item.opts.match ? obj[item.opts.match.value] : obj.value"
                            :label="item.opts.match ? obj[item.opts.match.label] : obj.label"
                            :value="item.opts.match ? obj[item.opts.match.value] : obj.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='date'"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-date-picker v-model="formModel[item.prop]"
                                :placeholder="addMode ? '选择日期' : ''"
                                style="width: 100%;"
                                value-format="yyyy-MM-dd"
                                :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled">
                </el-date-picker>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='datetime'"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-date-picker type="datetime"
                                v-model="formModel[item.prop]"
                                :placeholder="addMode ? '选择时间' : ''"
                                style="width: 100%;"
                                :format="item.opts.format ? item.opts.format : 'yyyy-MM-dd HH:mm:ss'"
                                :value-format="item.opts.valueFormat ? item.opts.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                                :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled">
                </el-date-picker>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='textarea'"
                    :class="item.opts.formClassName"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-input type="textarea"
                          v-model="formModel[item.prop]"
                          :placeholder="addMode ? item.label : ''"
                          :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled"></el-input>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='upload'"
                    :class="item.opts.formClassName"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <base-btn-upload-thumb v-if="item.opts.upload.mode==='thumb'"
                                       v-model="formModel[item.prop]"
                                       :addMode="addMode"
                                       :editMode="editMode"
                                       :queryMode="queryMode"
                                       :uploadOpts="item.opts.upload">
                </base-btn-upload-thumb>
                <base-btn-upload-file v-if="item.opts.upload.mode==='text'"
                                      v-model="formModel[item.prop]"
                                      :addMode="addMode"
                                      :editMode="editMode"
                                      :queryMode="queryMode"
                                      :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled"
                                      :uploadOpts="item.opts.upload">
                </base-btn-upload-file>
            </el-form-item>
            <el-form-item
                    v-if="!item.hide && item.opts && !item.opts.noFormItem && item.opts.type==='radio'"
                    :class="item.opts.formClassName"
                    :label="item.label"
                    :prop="item.prop"
                    :key="index">
                <el-radio-group v-model="formModel[item.prop]"
                                @change="handleRadioChange(item,formModel[item.prop])">
                    <el-radio v-for="obj in item.opts.data"
                              :key="obj.label"
                              :label="obj.label"
                              :disabled="allFormDisabled ? allFormDisabled : item.opts.disabled">
                        {{obj.showText}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
  import superTableMixin from './BaseSuperTableMixin'

  export default {
    components: {},
    name: 'BaseGenerateForm',
    props: {
      labelWidth: {
        type: String,
        default: function() {
          return '120px'
        }
      },
      formProps: {
        type: Array,
        default: function() {
          return []
        }
      },
      formData: {
        type: Object,
        default: function() {
          return {}
        }
      },
      editMode: Boolean,
      addMode: Boolean,
      queryMode: Boolean
    },
    mixins: [superTableMixin],
    data() {
      let formInitData = {}
      this.formProps.forEach((obj) => {
        // 下拉框多选模式的初始化是 []
        if (obj.opts.type === 'select' && obj.opts.multiple) {
           // match 应该只用作显示，绑定字段始终应该是prop
            //formInitData[obj.opts.match ? obj.opts.match.value : obj.prop] = []
            formInitData[obj.prop] = []
        }
        // radio
        if (obj.opts.type === 'radio') {
          formInitData[obj.prop] = false
        }
      })

      return {
        tableOptsCopy: Object.assign({}, this.tableOpts),
        formPropsClone: [...this.formProps],
        formModel: formInitData,
        disabledObj: {},
        allFormDisabled: false,
        validateOnRuleChange: true,
        rulesObj: {},
        files: []
      }
    },
    computed: {},
    watch: {
      formData: function(newData, oldData) {
        // 注意::当数据是unll 或是 ‘’的场合，不能够监听到
        // 编辑的场合,数据异步传入，需要监听数据变化后，才能渲染
        this.initData(newData)
      },
      queryMode: function(newData) {
        if (newData) {
          // 查看的场合
          this.setAllFormDisabled()
          this.clearRules()
        } else {
          this.setAllFormEnabled()
          this.initRules()
        }
      }
    },
    created() {
      if (this.addMode) {
        // 添加的场合
        this.initRules()
      }
      this.initSelectData()
      this.initData(this.formData)
      this.setDefaultValue()
      this.setInitValue()
    },
    beforeDestroy() {
      this.formModel = null
      this.disabledObj = null
      this.rulesObj = null
    },
    methods: {
      initData(obj) {
          this.showEditContent(obj)
          if (this.editMode) {
          // 编辑的场合
          this.initRules()
          this.showEditContent(obj)
        }
        if (this.queryMode) {
          // 查看的场合
          this.setAllFormDisabled()
          this.showEditContent(obj)
        }
      },
      remakeRulesContent(obj) {
        const rArr = obj.opts.checkRules
        const type = obj.opts.type
        const label = obj.label
        const newRules = rArr.map((item) => {
          if (!item.message && !item.validatorFun) {
            item.message = label + this.$CONST.MSG_RULES_REQUIRED
          } else {
            // todo 此行存在bug
            // item.message = label + item.message
          }
          if (!item.trigger) {
            if (type === 'select' || type === 'date' || type === 'datetime') {
              item.trigger = 'change'
            } else {
              item.trigger = 'blur'
            }
          }
          // 自定义规则场合
          if (typeof item.validatorFun === 'function') {
            item.validator = item.validatorFun(this.formModel)
          }
          return item
        })
        return newRules
      },
      initRules() {
        let rulesObj = {}
        this.formProps.forEach((obj) => {
          let opts = obj.opts
          if (opts && opts.checkRules) {
            if (opts.match && opts.match.value) {
              rulesObj[opts.match.value] = this.remakeRulesContent(obj)
            } else {
              rulesObj[obj.prop] = this.remakeRulesContent(obj)
            }
          }
        })
        this.rulesObj = rulesObj
      },
      initSelectDisabled() {
        this.formProps.forEach((obj) => {
          let opts = obj.opts
          if (opts && opts.type === 'select') {
            if (opts.group && opts.group.level !== 1) {
              // 级联的场合，下级默认禁止点开
              this.setDisabled(obj)
            }
          }
        })
      },
      getGroupApi() {
        let showedValObj = this.formModel
        let arr = []
        let apiArr = []
        this.formProps.forEach(item => {
          let opts = item.opts
          // 表单不显示该字段的场景,跳过处理步骤
          if (opts.noFormItem) return true
          if (opts && opts.type === 'select') {
            // 获取form属性
            let propCode = this.getMatchForm(item)
            // 有组关系的
            if (opts.group) {
              // 级别是level 1的场景
              if (opts.group.level === 1) {
                apiArr.push({
                  url: opts.url,
                  params: {},
                  prop: item.prop,
                  level: opts.group.level,
                  propCode: propCode
                })
              }
              // 其他级别的场景，需要组织传入的参数
              if (opts.type.showMode === 'cascader') {
                propCode = propCode + '_code'
              }
              // 将必要的参数信息缓存待用
              let tempObj = {}
              // 有自定义的级联value的场景则替换成自定的value
              propCode = this.replaceCascadeKey(opts, propCode)
              tempObj[propCode] = showedValObj[propCode]
              arr.push({
                groupid: opts.group.id,
                level: opts.group.level,
                prop: item.prop,
                childParams: tempObj
              })
              // 命中上级
              let selectedObj = arr.find(function(obj) {
                return obj.groupid === opts.group.id && (obj.level = opts.group.level - 1)
              })
              if (selectedObj) {
                apiArr.push({
                  url: opts.url,
                  params: selectedObj.childParams,
                  level: opts.group.level,
                  prop: item.prop,
                  propCode: propCode
                })
              }
            } else {
              // 无组关系的
              apiArr.push({
                url: opts.url,
                params: {},
                level: 0,
                prop: item.prop,
                propCode: propCode
              })
            }
          }
        })
        return apiArr
      },
      runGroupApi(apiArr) {
          console.log(apiArr,'api')
        apiArr.forEach(obj => {
          let prop = obj.prop
          // 得到属性对应的 model 的 opts
          let opts = {}
          for (let o of this.formProps) {
            if (o.prop === prop) {
              opts = o.opts
              break
            }
          }
          if (!opts.data || !opts.data.length || obj.level > 0) {
            // 异步执行api并把对象的opts data 存储到 model中
            if (this.$T.isInlineParams(obj.url)) {
              // 严格遵循restful标准的url的场景
              let url = this.$T.replaceUrlParams(obj.url, obj.params)
              this.$http.get(url).then(response => {
                // 判读如果有match项，将数据字段替换成match项
                let data = this.replaceMatchProps(opts, response.data)
                this.$set(opts, 'data', data)
              })
            } else {
              this.$http.get(obj.url, obj.params).then(response => {
                // 判读如果有match项，将数据字段替换成match项
                  console.log(response,'group')
                let data = this.replaceMatchProps(opts, response)
                this.$set(opts, 'data', data)
                // todo 如果延迟不回显的情况，需要再次给form赋值一次
              })
            }
          }
        })
      },
      initSelectGroup() {
        // 抽取出所有级联的api
        let apiArr = this.getGroupApi()
        // 执行所有 api
        this.runGroupApi(apiArr)
        // 回显
      },
      initSelectData() {
        this.init(this.formProps, this.editMode)
      },
      clearSelectDisabled() {
        // 级联的场合，清楚下级默认禁止点开
        this.formProps.forEach((obj) => {
          let opts = obj.opts
          if (opts && opts.type === 'select') {
            if (opts.group && opts.group.level !== 1) {
              this.disabledObj[obj.prop] = false
            }
          }
        })
      },
      cleanDisabledByProp(prop) {
        // todo 方法慎用有bug
        let tempOptsClone = [...this.formProps]
        let newFormProps = []
        tempOptsClone.forEach((obj) => {
          let objClone = Object.assign({}, obj)
          if (objClone.prop === prop) {
            objClone.opts.disabled = false
          }
          newFormProps.push(objClone)
        })
        this.FormPropsClone = newFormProps
      },
      setDisabledByProp(prop) {
        // todo 方法慎用有bug
        let tempOptsClone = [...this.formProps]
        let newFormProps = []
        tempOptsClone.forEach((obj) => {
          let objClone = Object.assign({}, obj)
          if (objClone.prop === prop) {
            objClone.opts.disabled = true
          }
          newFormProps.push(objClone)
        })
        this.FormPropsClone = newFormProps
      },
      setAllFormDisabled() {
        this.allFormDisabled = true
      },
      setAllFormEnabled() {
        this.allFormDisabled = false
      },
      resetForm() {
        this.$refs.$popupForm.resetFields()
      },
      clearRules() {
        this.rulesObj = null
        this.$refs.$popupForm.clearValidate()
      },
      setDisabled() {
        // 级联的场合，设置下级默认禁止点开
        this.formProps.forEach((obj) => {
          let opts = obj.opts
          if (opts && opts.type === 'select') {
            if (opts.group && opts.group.level !== 1) {
              this.disabledObj[obj.prop] = true
            }
          }
        })
      },
      clearDisabled(obj) {
        // 清楚form表单中级联
        this.disabledObj[obj.prop] = false
      },
      setDefaultValue() {
        this.formProps.forEach((obj) => {
          if (obj.opts.defaultValue) {
            this.formModel[obj.prop] = obj.opts.defaultValue
          }
        })
      },
      setInitValue() {
        if (this.addMode) {
          this.formProps.forEach((obj) => {
            if (obj.opts.initValue) {
              this.formModel[obj.prop] = obj.opts.initValue
            }
          })
        }
      },
      setValueByProp(prop, value) {
        this.formModel[prop] = value
      },
      handleSelectChange(currentSelect, code, optsData, dictionaryData) {
          console.log(currentSelect)
          console.log(code)
          console.log(optsData,'data')
        this.change(this.formProps, currentSelect.opts, code)
        /**
         * 特定业务补充方法,通过下拉带出所有字段默认值
         */
        let onlyField = currentSelect.opts.onlyFillFieldValue
        if (onlyField) {
          this.onlySetAllFieldValue(currentSelect.opts, code)
          // 回调
          if (typeof onlyField.fun === 'function') {
            onlyField.fun.call(null, code)
          }
        }
        if (typeof currentSelect.opts.fun === 'function') {
          currentSelect.opts.fun.call(null, code, optsData, dictionaryData)
        }
        if(currentSelect.opts.field){
            optsData.forEach((item)=>{
                if(item[currentSelect.opts.match.value] === code){
                    this.formModel[currentSelect.opts.field]=item[currentSelect.opts.match.label]
                }

            })
        }
      },
      handleRadioChange(currentSelect, label) {
        let fun = currentSelect.opts.fun
        // 回调
        if (typeof fun === 'function') {
          fun(label)
        }
      },
      handleInputChange(currentSelect, val) {
        let fun = currentSelect.opts.fun
        // 回调
        if (typeof fun === 'function') {
          fun(val)
        }
      },
      showEditContent(res) {
        // 当res 是‘’或是null的场景返回
        if (!res) return
        this.clearSelectDisabled()
        let tempForm = {}
        this.formProps.forEach((obj) => {
          let prop = obj.prop
          let opts = obj.opts
          if (opts.type === 'select') {
            if (opts.showMode === 'cascader') {
              // 如果是级联的树，要组织数组结构的回显code
              tempForm[prop] = this.getCascaderDefault(prop, res[prop])
              // 同时也保留当前级联的值，并将属性字段 拼个唯一的标识符
              tempForm[prop + '_code'] = res[prop]
            }

            if (opts.showMode === 'normal' && !opts.multiple) {
              // 判断是否有match
              let tempProp = this.getMatchForm(obj)
              tempForm[tempProp] = res[tempProp] === 0 ? null : res[tempProp] // 特殊处理，当下拉框返回值是0的场景，意味空
            } else { // select支持多选的场合
              // 判断是否有match
              let tempProp = this.getMatchForm(obj)
              if (typeof res[tempProp] === 'string') {
                tempForm[tempProp] = res[tempProp].split(',')
              }
              if (this.$T._.isArray(res[tempProp])) {
                tempForm[tempProp] = res[tempProp]
              }
            }
          } else {
            tempForm[prop] = opts.defaultValue ? opts.defaultValue : res[prop]
          }
        })
        this.formModel = tempForm
        this.initSelectGroup()
      },
      getMatchForm(item) {
        let opts = item.opts
        if (opts.match) {
          return item.prop
        } else {
          return item.prop
        }
      },
      isCascaderProp(val) {
        let bool = false
        for (let item of this.formProps) {
          let opts = item.opts
          if (!opts) {
            bool = false
            break
          }
          if (opts.type === 'select' && opts.showMode === 'cascader' && val === this.getMatchForm(item)) {
            bool = true
            break
          }
        }
        return bool
      },
      getCascaderDefault(prop, val) {
        // 得到级联树的数据
        let treeArr = []
        let valueKey = 'value'
        for (let item of this.formProps) {
          let vk = this.getMatchForm(item)
          if (prop === vk) {
            treeArr = item.opts.data.slice(0)
            valueKey = vk
            break
          }
        }
        let arr = []
        let result = []

        function handelCascaderOpts(tree) {
          tree.forEach(function(item) {
            arr.push(item[valueKey])
            if (item.children && Array.isArray(item.children) && item.children.length) {
              if (item[valueKey] !== val) {
                // 递归
                handelCascaderOpts(item.children)
              } else {
                result = arr.slice(0)
              }
            } else {
              if (item[valueKey] === val) {
                result = arr.slice(0)
              } else {
                arr = []
              }
            }
          })
          return result
        }

        return handelCascaderOpts(treeArr)
      },
      checkRules() {
        return this.$refs.$popupForm.validate().catch(() => {
          return false
        })
      },
      onlySetAllFieldValue(currOpts, val) {
        if (!val) {
          console.warn('onlySetAllFieldValue::下拉选择不能为空')
          return
        }
        // 设置所有字段的值
        const key = currOpts.onlyFillFieldValue.key
        const excludeFields = currOpts.onlyFillFieldValue.excludeFields
        let params = {}
        params[key] = val
        this.$http.get(currOpts.onlyFillFieldValue.url, params).then(response => {
          if (excludeFields) {
            excludeFields.forEach(function(key) {
              delete response.data[key]
            })
          }
          this.formModel = response.data
        })
      },
      isHasNumberCheck(opts) {
        if (opts.checkRules) {
          return opts.checkRules.some((obj) => {
            return obj.type === 'number'
          })
        }
        return false
      },
      isShowItem(opt) {
          if(opt.showType){
              if(opt.showType === 'form'){
                  if (opt.showFormItemAlways) {
                      if (this.editMode) {
                          if (opt.showFormItemAlways === 1) {
                              return true
                          }
                          return false
                      }
                      if (this.addMode) {
                          if (opt.showFormItemAlways === 2) {
                              return true
                          }
                          return false
                      }
                      return true
                  }
                  return true
              }else{
                  return false
              }
          }else{
              return true
          }
      }
    }
  }
</script>

<style lang="less">
    .base-generate-form {
        .el-select {
            width: 100%;
        }
        &.query-mode {
            .el-form-item.is-required {
                .el-form-item__label:before {
                    content: '*';
                    color: transparent;
                    margin-right: 4px;
                }
            }
        }
    }
</style>
