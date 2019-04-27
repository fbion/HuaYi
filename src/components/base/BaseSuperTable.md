### superTable配置参数说明

tableOpts.url
tableOpts.height
tableOpts.selection 多选框 默认:false 
tableOpts.radio 单选框 默认:false 
tableOpts.showOrder 序号 默认:false 
tableOpts.showHandlerBar 控制[操作]列显隐 默认:true 
tableOpts.showInlineQueryButton  默认:false
tableOpts.HandlerColWidth 操作列的宽度， 默认是180px，放3个按钮的宽度.50px一个按钮宽度
tableOpts.uniqueKey 列的唯一id 可以用于删除和getone接口参数。注意：如果各个功能处定义key了则覆盖此uniqueKey,支持多个参数例如 prop1,prop2

tableOpts.fixed 固定操作列,同ele 

tableOpts.colModel.href 默认false , true的场合，默认弹出查看页面。 可自定义function($scope)
tableOpts.colModel.hrefMode  三种模式，query edit add ,默认是 query 
tableOpts.colModel.align 同ele
tableOpts.colModel.minWidth 同ele
tableOpts.colModel.width 同ele
tableOpts.colModel.hide 隐藏列（列表和表单都没有）
tableOpts.colModel.noItem 该字段不出现在列表中 默认：false
tableOpts.colModel.format 格式化表格日期 '{y}-{m}-{d} {h}:{i}:{s}'
tableOpts.colModel.tags 字段加标签 type是字符串的场景:同ele success info warning danger ''
 type是数组的场景 type : [
     {
         label : tag显示的名称
         tagType ：tag类型 同ele success info warning danger ''
         bgColor ：tag背景色 同ele 例如 #ddd
     }
 ]

tableOpts.colModel.opts.label 可自定义表单中的label名称，目前只支持搜索区域表单
tableOpts.colModel.opts.onlyFillFiledValue 独特的业务，不建议使用
tableOpts.colModel.opts.valueFormat 同ele日期组件
tableOpts.colModel.opts.checkRules 字段验证,同ele
tableOpts.colModel.opts.searchFilterItem  该字段是否作为搜索框出现  默认：false
tableOpts.colModel.opts.searchDateRange{
range:  true:开启范围 false：关闭范围
label ：给placeholder配前缀文字
startPlaceholder: 同ele
endPlaceholder: 同ele
paramProps ：[] 默认是数组，拼接的自定义属性。默认是在原prop上 追加 Start 和End，
defaultValue:[]
}改字段是否开启范围搜索,


tableOpts.colModel.opts.noFormItem 该字段是否出现在form表单中 默认：false
tableOpts.colModel.opts.showFormItemAlways  1：编辑模式下显示；2:新增模式下显示 ; 默认都显示
tableOpts.colModel.opts.defaultValue 输入表单中的默认值[添加 编辑 查看 列表的值都一样]
tableOpts.colModel.opts.initValue 输入表单中的初始值[仅添加的场合初始默认值]
tableOpts.colModel.opts.disabled 默认 false 
tableOpts.colModel.opts.fun 回调函数  支持 select:返回code值和optsData， radio：返回label值 
tableOpts.colModel.opts.formClassName 表单自定义样式  'alone-row':占整行 ;'half-row'：占半行。只支持 input textarea


tableOpts.colModel.opts.match 业务中的字段
tableOpts.colModel.opts.match.code 因为下拉框存储的是nama字段，label和value绑定的都是name，需要指定code对应的值
tableOpts.colModel.filed 下拉框对应的code字段，如果字段需要存储code和name，下拉框绑定name字段，此属性指向code字段
```
key   
value
filterValue 仅查询的场景使用
cascadeValue 在分组级联的场景生效，自定义级联用的条件,注意要写在上级的match里
```
tableOpts.colModel.opts.dictionary 字典表中的字段
```
key
value
```
tableOpts.colModel.opts.data 可自定义下拉列表的值
tableOpts.colModel.opts.showMode 当type=select场景，normal(普通下拉框) cascader(下拉框是级联模式)
tableOpts.colModel.opts.multiple 当type=select场景，同ele,开启多选支持
tableOpts.colModel.opts.upload.mode 当type=upload场景，thumb(缩略图--目前支持单个文件上传，图片最大2M) text(文档附件--支持多个文档上传，最大10M)
tableOpts.colModel.opts.upload.action 上传路径


### table的自定义方法
dialog-save   弹出的dialog保存按钮的方法回调





操作区插槽名称 slot ='operate-panel'

###搜索操作区的自定义方法：
:on-add
:on-delete
:on-search

###表格里的内联的按钮
:on-inline-edit
:on-inline-query
:on-inline-delete

###弹出框表格的配置
tableOpts.popup.colCls
```
弹出的表单展示的列数
one-col
two-col
three-col

```

```
弹出的表单宽度
small
medium
large
宽度和列数可以组合 例如 medium two-col
```
tableOpts.popup.flat  弹出框平铺模式 默认是false

tableOpts.popup.labelWidth 默认120px
###搜索区域查询条件过多的场景，自动折行





###Slots
button-append  普通弹出框 追加自定义按钮
flat-button-append  平铺模式弹出框 追加自定义按钮
footer 弹出框底部footer区域
operate-panel 操作搜索区


###dialog的保存按钮
1.dialog插槽内容的ref名称必须是$popup，组件内部可以覆写下面两个方法
renderFormData // getone 接口回调
saveDB //保存和编辑的场合回调

2. 表格组件 添加 dialogSaveEvent 方法，手动 覆写 saveDB方法
this.$refs.$popup.saveDB()
