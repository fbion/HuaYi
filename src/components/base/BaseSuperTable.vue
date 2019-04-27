<template>
    <div class="base-super-table-wrap">
        <!-- 操作区-->
        <slot name="operate-panel" :opts="tableOpts" :handler="handler">
            <base-operate-panel>

                <base-generate-search
                        ref="$baseGenerateSearch"
                        :searchOpts="tableOpts.colModel"
                        @on-search="handler.onSearch">
                </base-generate-search>
                <base-generate-buttons
                        :btnOpts="tableOpts.operateBtnOpts"
                        @on-add="handler.onAdd"
                        @on-import="handler.onImport"
                        @on-export="handler.onExport"
                        @on-start="handler.onStart"
                        @on-stop="handler.onStop">
                </base-generate-buttons>
            </base-operate-panel>
        </slot>
        <!-- 表格区-->
        <el-card>
            <el-table
                    ref="$superTable"
                    class="table-wrapper"
                    :data="tableData"
                    v-loading.body="listLoading"
                    highlight-current-row
                    :height="getTableContentHeight()"
                    stripe
                    border="border"
                    @cell-click="handleCellClick"
                    @selection-change="handleSelectionChange">

                 <el-table-column label="操作"
                                 v-if="isShowHandlerBar"
                                 :fixed="tableOpts.fixed"
                                 align="left"
                                 :width="colWidth">
                    <template slot-scope="scope">
                        <base-btn size="mini"
                                  v-if="(tableOpts.inlineBtnOpts) ? tableOpts.inlineBtnOpts.queryBtn : false"
                                  @on-click="handleInlineQuery(scope.$index, scope.row)">
                            {{tableOpts.inlineBtnOpts.queryBtn.text?tableOpts.inlineBtnOpts.queryBtn.text:'查看'}}
                        </base-btn>
                        <span class=" iconfont icon-tijiao-" :oauth="oauth ? oauth.isOauthDelete : true"
                              v-if="tableOpts.inlineBtnOpts ? tableOpts.inlineBtnOpts.submitBtn : false"
                              @on-click="handleInlineSubmitEvent(scope.$index, scope.row)"> </span>
                        <span class="iconfont icon-ic_accepted" :oauth="oauth ? oauth.isOauthEdit : true"
                              v-if="tableOpts.inlineBtnOpts ? tableOpts.inlineBtnOpts.editBtn : false"
                              @click="handleInlineEdit(scope.$index, scope.row)"></span>
                        <span class="iconfont icon-ziyuan" :oauth="oauth ? oauth.isOauthDelete : true"
                              v-if="tableOpts.inlineBtnOpts ? tableOpts.inlineBtnOpts.deleteBtn : false"
                              @click="handleInlineDelete(scope.$index, scope.row)"></span>
                        <slot name="handlerbar-append" :opts="scope"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-if="tableOpts.selection" type="selection" align="center"
                                 width="40"></el-table-column>
                <el-table-column v-if="tableOpts.radio && tableOpts.uniqueKey" align="center" width="50">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.row[tableOpts.uniqueKey]">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column v-if="tableOpts.showOrder" label="#" type="index" align="left"
                                 width="40"></el-table-column>
                <el-table-column
                        v-for="item in tableOpts.colModel"
                        v-if="handleColShow(item)"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :min-width="item.minWidth"
                        :show-overflow-tooltip="item.showOverflowTooltip"
                        :align="item.align ? item.align : 'left'"
                        :header-align="item.headerAlign ? item.headerAlign : 'left'"
                        :key="item.prop">
                    <template slot-scope="scope">
                        <template v-if="item.tags">
                            <el-tag
                                    :color="getTagBackgroundColor(scope, item)"
                                    :type="getTagType(scope, item)"
                                    disable-transitions>
                                {{scope.row[item.prop] | emptyDataFilter(item)}}
                            </el-tag>
                        </template>
                        <template v-else-if="item.href">
                            <template v-if="typeof item.href === 'function'">
                                <a href="javascript:void(0)" @click="item.href(scope)">
                                    <i :class="item.icon"></i>
                                    <span>{{(item.opts.defaultValue ? item.opts.defaultValue : scope.row[item.prop])}}</span>
                                </a>
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" @click="handleHrefLink(scope.$index, scope.row, item)">
                                    <i :class="item.icon"></i>
                                    <span>{{(item.opts.defaultValue ? item.opts.defaultValue : scope.row[item.prop])}}</span>
                                </a>
                            </template>
                        </template>
                        <template v-else>
                            <i :class="item.icon" style="cursor: pointer"></i>
                            <span>{{(item.opts.defaultValue ? item.opts.defaultValue : scope.row[item.prop]) | parseDateFilter(item) | emptyDataFilter(item)}}</span>
                        </template>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!-- 分页区-->
        <div class="pagination-container" v-if="total">
            <el-pagination
                    v-if="tableData.length"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="listQuery.pageIndex"
                    :page-sizes="pageSizes"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            >
            </el-pagination>
        </div>
        <!-- popup区-->
        <slot name="dialog">
            <el-dialog
                    class="pcitc-customer-dialog"
                    v-drag-dialog
                    v-flat-dialog:falt="flat"
                    v-if="dialogVisible"
                    top='10vh'
                    lock-scroll
                    :class="colCls"
                    :title="title"
                    :visible.sync="dialogVisible"
                    :append-to-body="false"
                    :close-on-click-modal="false">
                <div class="dialog-flat-header" v-if="flat">
                    <slot name="flat-header-button" :opts="$data">
                        <base-btn @on-click="handleDialogCancel">关 闭</base-btn>
                        <base-btn v-if="!(popupType==='query')" type="primary" @on-click="handleDialogSave">确 定
                        </base-btn>
                    </slot>
                    <slot name="flat-button-append"></slot>
                </div>
                <slot name="dialog-content" :opts="$data">
                    <base-super-table-popup
                            ref="$popup"
                            :tableOpts="tableOpts"
                            :editParams="editParams"
                            :popupType="popupType">
                    </base-super-table-popup>
                </slot>
                <span slot="footer" class="dialog-footer">
                    <base-btn @on-click="handleDialogCancel">取 消</base-btn>
                    <base-btn v-if="!(popupType==='query')" type="primary" @on-click="handleDialogSave">确 定</base-btn>
                    <slot name="button-append"></slot>
                </span>
            </el-dialog>
        </slot>
    </div>
</template>

<script>
    import emitter from '@/utils/MixinEmitter'
    import superTableMixin from './BaseSuperTableMixin'
    export default {
        name: 'BaseSuperTable',
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
            tableOpts: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            addEvent: Function,
            deleteEvent: Function,
            importEvent: Function,
            exportEvent: Function,
            inlineQueryEvent: Function,
            inlineEditEvent: Function,
            inlineDeleteEvent: Function,
            inlineSubmitEvent: Function,
            dialogSaveEvent: Function,
            cellClickEvent: Function,
            selectionEvent: Function
        },
        components: {},
        mixins: [emitter, superTableMixin],
        data() {
            return {
                radio: '',
                title: '',
                handler: {
                    onSearch: this.handleSearch,
                    onAdd: this.handleAdd,
                    onDelete: this.handleDelete,
                    onImport: this.handleImport,
                    onExport: this.handleExport,
                    onStart: this.handleStart,
                    onStop: this.handleStop,
                    onDialogCancel: this.handleDialogCancel,
                    onDialogSave: this.handleDialogSave
                },
                tableOptsCopy: Object.assign({}, this.tableOpts),
                multipleSelection: [],
                numberValidateForm: {},
                dialogVisible: false,
                popupType: '',
                editParams: null,
                searchForm: {},
                disableds: {},
                colModel: [],
                tableData: [],
                total: null,
                listLoading: false,
                pageSizes: [10, 20, 30, 50],
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }
        },
        computed: {
            flat: function () {
                if (this.tableOpts.popup) {
                    return this.tableOpts.popup.flat
                }
            },
            isShowHandlerBar: function () {
                // 仅有查询权限(因查询按钮都变成了link模式)
                if (this.oauth.isOnlyQuery) {
                    return false
                }

                if (this.tableOpts.hasOwnProperty('showHandlerBar')) {
                    if (this.tableOpts.showHandlerBar) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (!this.tableOpts.inlineBtnOpts) return false
                    return !this.$T.isEmptyObject(this.tableOpts.inlineBtnOpts)
                }
            },
            colWidth: function () {
                let HandlerColWidth = this.tableOpts.HandlerColWidth ? this.tableOpts.HandlerColWidth : '190'
                if (this.oauth && this.tableOpts) {
                    // 有编辑按钮&没有编辑权限
                    if (this.tableOpts.inlineBtnOpts.editBtn && !this.oauth.isOauthEdit) {
                        HandlerColWidth = HandlerColWidth - 50
                    }
                    // 有编辑按钮&没有编辑权限
                    if (this.tableOpts.inlineBtnOpts.deleteBtn && !this.oauth.isOauthDelete) {
                        HandlerColWidth = HandlerColWidth - 50
                    }
                }
                return HandlerColWidth
            },
            colCls: function () {
                // 默认dialog宽度是50%
                return this.tableOpts.popup ? this.tableOpts.popup.colCls : 'two-col'
            }
        },
        created() {
            this.$on('close-dialog', this.closeDialog)
            this.$on('init-tableList', this.loadTableList)
        },
        mounted() {
            this.$nextTick(function () {
                this.initTableList(this.$refs.$baseGenerateSearch.getQueryParams())
                // Code that will run only after the
                // entire view has been rendered
            })
        },
        methods: {
            loadTableList() {
                let queryParams = this.$refs.$baseGenerateSearch.getQueryParams()
                this.initTableList(queryParams)
            },
            getTableContentHeight() {
                if (this.tableOpts.height) return this.tableOpts.height
                let dom = this.$parent.$el
                if (dom && dom.className === 'page') {
                    const operateHeight = 80
                    const pagination = 40
                    const pageWrapperheight = dom.offsetHeight
                    const tableContentHeight = pageWrapperheight - operateHeight - pagination
                    return tableContentHeight
                }
                return -1
            },
            getTagBackgroundColor: function (scope, item) {
                const type = item.tags.type
                if (Array.isArray(type)) {
                    const text = scope.row[item.prop]
                    const obj = type.find((item) => {
                        return item.label === text
                    })
                    return obj ? obj.bgColor : ''
                }
            },
            getTagType: function (scope, item) {
                const type = item.tags.type
                if (typeof type === 'string') {
                    return item.tags.type
                }
                if (Array.isArray(type)) {
                    const text = scope.row[item.prop]
                    const obj = type.find((item) => {
                        return item.label === text
                    })
                    return obj ? obj.tagType : ''
                }
            },
            getFilterQueryCond() {
                let params = {}
                const baseGenerateSearchHandler = this.findComponentHandler('BaseGenerateSearch')
                params = baseGenerateSearchHandler.getQueryParams()
                return params
            },
            handleColShow(item) {
                if (item.opts.hasOwnProperty('showType')) {
                    if (item.opts.showType === 'table') {
                        return true
                    }
                    return false
                }
                if (item.hasOwnProperty('hide')) {
                    return !item.hide
                }
                if (item.hasOwnProperty('noItem')) {
                    return !item.noItem
                }
                return true
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.initTableList(this.getFilterQueryCond())
            },
            handleCurrentChange(val) {
                this.listQuery.pageIndex = val
                this.initTableList(this.getFilterQueryCond())
            },
            initSelectData() {
                if (!this.tableOpts.showSearchBar) return
                this.init(this.tableOptsCopy.colModel)
            },
            initTableList(params = {}) {
                this.$http.get(this.tableOpts.url, Object.assign(params, this.listQuery))
                    .then(response => {
                        this.tableData = response
                        this.total = 10
                        this.listLoading = false
                    }).catch(() => {
                    this.listLoading = false
                })
            },
            getKeysArr(rows, key) {
                if (key && typeof key === 'string') {
                    let params = {}
                    let valArr = []
                    rows.forEach(function (obj) {
                        valArr.push(obj[key])
                    })
                    params[key] = valArr
                    return params
                }
            },
            getDelParams(rows, operateBtnOpts) {
                let url = ''
                if (operateBtnOpts) {
                    url = operateBtnOpts.deleteBtn.url ? operateBtnOpts.deleteBtn.url : this.tableOpts.url
                    let params = {}
                    let deleteStr = ''
                    let key = operateBtnOpts.deleteBtn.key ? operateBtnOpts.deleteBtn.key : this.tableOpts.uniqueKey
                    if (key && typeof key === 'string') {
                        let valArr = []
                        rows.forEach(function (obj) {
                            valArr.push(obj[key])
                            if (deleteStr === '') {
                                deleteStr = '?' + key + '=' + obj[key]
                            } else {
                                deleteStr += '&' + key + '=' + obj[key]
                            }
                        })
                        params[key] = valArr
                    }
                    return {
                        url: url + deleteStr,
                        params: deleteStr
                    }
                }
            },
            getInlineEditParams(row) {
                let inlineBtnOpts = this.tableOpts.inlineBtnOpts
                let url = ''
                if (inlineBtnOpts) {
                    url = inlineBtnOpts.editBtn.url ? inlineBtnOpts.editBtn.url : this.tableOpts.url
                    let params = {}
                    let key = inlineBtnOpts.editBtn.key ? inlineBtnOpts.editBtn.key : this.tableOpts.uniqueKey
                    if (!key || typeof key !== 'string') {
                        console.warn('BaseSuperTable::getInlineEditParams::key配置问题::请输入正确的格式')
                        return
                    }
                    const keyArr = key.split(',')
                    keyArr.forEach(function (itme) {
                        params[itme] = row[itme]
                    })
                    return {
                        url: url,
                        params: params
                    }
                }
            },
            getInlineQueryParams(row) {
                let inlineBtnOpts = this.tableOpts.inlineBtnOpts
                let url = ''
                if (inlineBtnOpts) {
                    url = inlineBtnOpts.queryBtn.url ? inlineBtnOpts.queryBtn.url : this.tableOpts.url
                    let params = {}
                    let key = inlineBtnOpts.queryBtn.key ? inlineBtnOpts.queryBtn.key : this.tableOpts.uniqueKey
                    if (!key || typeof key !== 'string') {
                        console.warn('BaseSuperTable::getInlineEditParams::key配置问题::请输入正确的格式')
                        return
                    }
                    const keyArr = key.split(',')
                    keyArr.forEach(function (itme) {
                        params[itme] = row[itme]
                    })
                    return {
                        url: url,
                        params: params
                    }
                }
            },
            handleSelectionChange(val) {
                if (typeof this.selectionEvent === 'function') {
                    this.selectionEvent(val)
                } else {
                    this.multipleSelection = val
                }
            },
            handleCellClick(row, column, cell, event) {
                if (typeof this.cellClickEvent === 'function') {
                    this.cellClickEvent(row, column, cell, event)
                }
            },
            handleSearch(params) {
                this.listQuery.pageIndex = 1
                this.initTableList(params)
            },
            handleAdd() {
                this.title = '新增'
                this.popupType = 'add'
                if (typeof this.addEvent === 'function') {
                    this.addEvent()
                } else {
                    this.editParams = null
                    this.dialogVisible = true
                }
            },
            handleDelete() {
                if (typeof this.deleteEvent === 'function') {
                    this.deleteEvent()
                } else {
                    let rows = this.multipleSelection
                    let operateBtnOpts = this.tableOpts.operateBtnOpts
                    if (!rows.length) {
                        this.$T.warning(this.$CONST.MSG_BUSINESS_SELECTED)
                        return
                    }
                    let obj = this.getDelParams(rows, operateBtnOpts)
                    const loading = this.$loading()
                    this.$http.delete(obj.url, obj.params)
                        .then(response => {
                            loading.close()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.loadTableList()
                        }).catch(() => {
                        loading.close()
                    })
                }
            },
            handleImport() {
                if (typeof this.importEvent === 'function') {
                    this.importEvent()
                } else {

                }
            },
            handleExport() {
                if (typeof this.exportEvent === 'function') {
                    this.exportEvent()
                } else {
                    let queryParams = this.$refs.$baseGenerateSearch.getQueryParams()
                    let url = this.$T.joinQueryUrl(this.tableOpts.operateBtnOpts.exportBtn.url, Object.assign(queryParams, this.listQuery))
                    document.location.href = url
                }
            },
            handleStart() {
                let rows = this.multipleSelection
                if (!rows.length) {
                    this.$T.warning(this.$CONST.MSG_BUSINESS_SELECTED)
                    return
                }
                this.$confirm(this.$CONST.MSG_BUSINESS_START, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let key = this.tableOpts.operateBtnOpts.startBtn ? this.tableOpts.operateBtnOpts.startBtn.key : ''
                    key = key ? key : this.tableOpts.uniqueKey
                    let params = this.getKeysArr(rows, key)
                    let data = Object.assign({action: 'DATA_STATUS_TYPE_1'}, params)
                    let url = this.tableOpts.operateBtnOpts.startBtn.url
                    console.log('启用场合，传入的参数::' + JSON.stringify(data))
                    this.$http.put(url, data).then(response => {
                        this.$T.success()
                        this.initTableList()
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$T.info()
                })
            },
            handleStop() {
                let rows = this.multipleSelection
                if (!rows.length) {
                    this.$T.warning(this.$CONST.MSG_BUSINESS_SELECTED)
                    return
                }
                this.$confirm(this.$CONST.MSG_BUSINESS_STOP, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let key = this.tableOpts.operateBtnOpts.stopBtn ? this.tableOpts.operateBtnOpts.stopBtn.key : ''
                    key = key ? key : this.tableOpts.uniqueKey
                    let params = this.getKeysArr(rows, key)
                    let data = Object.assign({action: 'DATA_STATUS_TYPE_2'}, params)
                    let url = this.tableOpts.operateBtnOpts.startBtn.url
                    console.log('停用场合，传入的参数::' + JSON.stringify(data))
                    this.$http.put(url, data).then(response => {
                        this.$T.success()
                        this.initTableList()
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$T.info()
                })
            },
            handleHrefLink(i, row, item) {
                if (item.hrefMode === 'edit') {
                    this.handleInlineEdit(i, row)
                } else if (item.hrefMode === 'add') {
                    this.handleAdd()
                } else {
                    this.handleInlineQuery(i, row)
                }
            },
            handleInlineQuery(i, row) {
                this.title = '查看'
                this.popupType = 'query'
                if (typeof this.inlineQueryEvent === 'function') {
                    this.inlineQueryEvent(i, row)
                } else {
                    let obj = this.getInlineQueryParams(row)
                    this.editParams = {
                        url: obj.url,
                        params: obj.params,
                        data: row
                    }
                    this.dialogVisible = true
                }
            },
            handleInlineEdit(i, row) {
                this.title = '编辑'
                this.popupType = 'edit'
                if (typeof this.inlineEditEvent === 'function') {
                    this.inlineEditEvent(i, row)
                } else {
                    let obj = this.getInlineEditParams(row)
                    this.editParams = {
                        url: obj.url,
                        params: obj.params,
                        data: row
                    }
                    this.dialogVisible = true
                }
            },
            handleInlineSubmitEvent(i, row) {
                if (typeof this.inlineSubmitEvent === 'function') {
                    this.inlineSubmitEvent(i, row)
                }
            },
            handleInlineDelete(i, row) {
                if (typeof this.inlineDeleteEvent === 'function') {
                    this.inlineDeleteEvent(i, row)
                } else {
                    let operateBtnOpts = this.tableOpts.inlineBtnOpts
                    let obj = this.getDelParams([row], operateBtnOpts)
                    const loading = this.$loading()
                    const $this = this
                    this.$http.delete(obj.url, obj.params)
                        .then(response => {
                            loading.close()
                            $this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.loadTableList()
                        }).catch(() => {
                        loading.close()
                    })
                }
            },
            handleResetForm() {
                // todo
                // this.$refs.popup.resetForm()
            },
            handleDialogCancel() {
                this.closeDialog()
            },
            handleDialogSave() {
                if (typeof this.dialogSaveEvent === 'function') {
                    this.dialogSaveEvent()
                } else {
                    // 自定义dialog弹出内容的场景，点击确定按钮，寻找$popup组件
                    if (!this.$refs.$popup) {
                        let parent = this.$parent
                        let $popup = null
                        while (parent) {
                            if (parent.$refs && parent.$refs.$popup) {
                                $popup = parent.$refs.$popup
                            }
                            parent = parent.$parent
                        }
                        if ($popup) {
                            $popup.saveDB()
                        } else {
                            console.warn('BaseSuperTable::handleDialogSave::配置问题::弹出框组件的ref配置出错')
                        }
                    } else {
                        // this.$refs.$popup.saveDB() 返回的是一个promise对象
                       this.$refs.$popup.saveDB()
                           .then((res)=>{
                               // 验证不通过返回false  验证通过 什么都不返回（undefined） 需要处理返回值
                             if(res === undefined){
                                 this.dialogVisible = false
                             }
                           })
                    }
                }
            },
            closeDialog() {
                this.dialogVisible = false
            }
        }
    }
</script>

<style lang="less">
    .base-super-table-wrap {
        position: relative;
        height: 100%;
        .search-wrapper {
            .btns-wrapper {
                float: left;
            }
            .cond-wrapper {
                float: right;
            }
        }
        .btns-wrapper {
            padding-bottom: 10px;
        }
        .cond-wrapper {
            text-align: right;

        }
        .table-wrapper {
            width: 100%;
        }
        .pagination-container {
            text-align: right;
            margin-top: 5px;
        }
        .el-cascader {
            width: 100%;
        }
        .el-select {
            width: 100%;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>
