<template>
    <base-page>
        <div class="cpkForm">
            <base-super-table :inlineQueryEvent="inlineQueryEvent" :tableOpts="tableOpts"></base-super-table>
            <div>
                <el-dialog  title="指标CPK详细信息" fullscreen="true" width="85%" class="pcitc-customer-dialog " :visible.sync="showDialg"
                           :fullscreen="false"
                           custom-class="container">
                    <div class="container">
                        <div class="form">
                            <el-form :disabled="true" :inline="true" class="demo-form-inline" :model="formData">
                                <el-form-item class="alone-row four-col" label="装置" :label-width="labelWidth">
                                    <el-input v-model="formData.Unit_Name"></el-input>
                                </el-form-item>
                                <el-form-item label="单元" :label-width="labelWidth">
                                    <el-input v-model="formData.Prdt_Cell_Name">></el-input>
                                </el-form-item>
                                <el-form-item label="操作指标" :label-width="labelWidth">
                                    <el-input v-model="formData.Index_Name"></el-input>
                                </el-form-item>
                                <el-form-item label="重要程度" :label-width="labelWidth">
                                    <el-input v-model="formData.Grade"></el-input>
                                </el-form-item>
                                <el-form-item label="开始时间" :label-width="labelWidth">
                                    <el-input v-model="formData.Start_Time"></el-input>
                                </el-form-item>
                                <el-form-item label="结束时间" :label-width="labelWidth">
                                    <el-input v-model="formData.End_Time"></el-input>
                                </el-form-item>
                                <el-form-item label="CPK得分" :label-width="labelWidth">
                                    <el-input v-model="formData.CPK_Score"></el-input>
                                </el-form-item>
                                <el-form-item label="定级" :label-width="labelWidth">
                                    <el-input v-model="formData.Level"></el-input>
                                </el-form-item>
                                <el-form-item label="得分权重" :label-width="labelWidth">
                                    <el-input v-model="formData.Weight"></el-input>
                                </el-form-item>
                                <el-form-item label="创建时间" :label-width="labelWidth">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="更新时间" :label-width="labelWidth">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="分析状态" :label-width="labelWidth">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="table-warpper">
                            <h2>偏差原因分析</h2>
                            <div class="tableTool">
                                <el-button @click="addCPKAnalyze">新增</el-button>
                                <el-button @click="deleteAll">删除</el-button>
                            </div>
                            <div class="table">
                                <base-edit-table v-on:checkAll="checkAll" v-on:ininle-delete="ininleDelete"
                                                 :table-data="tableData"
                                                 :colModel="tableOpts1.colModel"></base-edit-table>
                            </div>
                        </div>
                        <div class="table-warpper">
                            <h2>剔除审批信息</h2>
                            <div class="form" style="padding: 5px">
                                <el-form :disabled="true" :inline="true" class="demo-form-inline" :model="formData">
                                    <el-form-item class="alone-row four-col" label="提交时间" :label-width="labelWidth">
                                        <el-input v-model="formData.Submit_Time"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提交人" :label-width="labelWidth">
                                        <el-input v-model="formData.Submit_Role_Code">></el-input>
                                    </el-form-item>
                                    <el-form-item label="审核时间" :label-width="labelWidth">
                                        <el-input v-model="formData.Apro_Time"></el-input>
                                    </el-form-item>
                                    <el-form-item label="审核人" :label-width="labelWidth">
                                        <el-input v-model="formData.Apro_Time_Code"></el-input>
                                    </el-form-item>
                                    <el-form-item label="剔除状态" :label-width="labelWidth">
                                        <el-input v-model="formData.Del_State"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <footer>
                            <el-button @click="submitInfo">保存</el-button>
                            <el-button @click="closeDialog">关闭</el-button>


                        </footer>
                    </div>
                </el-dialog>
            </div>
        </div>
    </base-page>
</template>

<script>
    import * as ET from '@/utils/ETTool'
    import BaseGenerateForm from "../../../components/base/BaseGenerateForm";
    import BaseSuperTable from "../../../components/base/BaseSuperTable";
    import BaseEditTable from "../../../components/base/BaseEditTable";
  const  gradeData=[{label: '一级', value: 1}, {label: '二级', value: 2}]
    const  anlyState= [{value: 1, label: '启用'}, {value: 2, label: '禁用'}]
    const  delState=[{value: 0, label: '未剔除'}, {value: 1, label: '已剔除'}]
    const tableOpts = {
        url: vm.$API.findCPKCheck,
        colModel: [
            {
                label: '装置',
                prop: 'Unit_Code',
                hide: true,
                opts: {
                    showType: 'form',
                    type: 'select',
                    searchFilterItem: true,
                    showMode: 'normal',
                    url: vm.$API.initDicUnit,
                    field: 'Unit_Name',
                    initValue:'Workshop',
                    match: {
                        label: 'Unit_Name',
                        value: 'Unit_Code'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '日期',
                prop: 'nowdate',
                hide: true,
                opts: {
                    type: 'datetime',
                    searchFilterItem: true,
                    initValue:'2019-03-08',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '班次',
                prop: 'Shift',
                hide: true,
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    initValue: 'DayShiftStartTime',
                    data: [{name: '白班', value: 'DayShiftStartTime'}, {name: '夜班', value: 'NightShiftStartTime'}],
                    match: {
                        label: 'name',
                        value: 'value'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            }, {
                label: '控制级别',
                prop: 'Grade',
                hide: true,
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    initValue:1,
                    data:gradeData ,
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '状态',
                prop: 'Anly_State',
                hide: true,
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    initValue: 1,
                    data: anlyState,
                    checkRules: [
                        {required: true}
                    ]
                }
            }, {
                label: '剔除状态',
                prop: 'Del_State',
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    initValue: 1,
                    data: delState,
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '分析状态',
                prop: 'Anly_State',
                opts: {
                    type: 'select',
                    data: [{value: 0, name: '未分析'}, {value: 1, name: '已分析'}],
                    initValue:1,
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '装置',
                prop: 'Unit_Name',
                opts: {
                    type: 'input',
                    showType: 'table',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '单元',
                prop: 'Prdt_Cell_Name',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '操作指标',
                prop: 'Index_Name',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '重要程度',
                prop: 'Grade',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            }, {
                label: '开始时间',
                prop: 'Start_Time',
                hide: true,
                opts: {
                    type: 'date',
                    initValue: vm.$T.parseTime(new Date()),
                    checkRules: [
                        {required: true}
                    ]
                }
            }, {
                label: '结束时间',
                prop: 'End_Time',
                hide: true,
                opts: {
                    type: 'date',
                    initValue: 'test001',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: 'CPK得分',
                prop: 'CPK_Score',
                opts: {
                    type: 'input',
                    disabled: true,
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '定级',
                prop: 'Level',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '得分权重',
                prop: 'Weight',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '提交时间',
                prop: 'Submit_Time',
                opts: {
                    type: 'input',
                    disabled: true,
                    initValue: 'test001'
                }
            }
        ],
        selection: false,
        showOrder: false,
        operateBtnOpts: {
            addBtn: {name: 'add', clsMode: 'fill', url: vm.$API.addOpeIndexMnt}
        },
        inlineBtnOpts: {
            editBtn: {name: 'edit', clsMode: 'text', url: vm.$API.updateOpeIndexMnt, key: 'berthId', text: '趋势图'},
            queryBtn: {name: 'query', clsMode: 'text', url: vm.$API.findOpeIndexMnt, key: 'Unit_Code', text: '分析'}
        },
        popup: {
            colCls: ' large four-col'
        }
    }
    const tableOpts1 = {
        url: vm.$API.findCPKCheck,
        colModel: [
            {
                label: '原因类型',
                prop: 'Reason_Type',
                labelWidth: '110',
                opts: {
                    type: 'select',
                    data: [{
                        label: '设备',
                        value: "1"
                    }, {
                        label: '工艺',
                        value: "2"
                    }, {
                        label: '计量',
                        value: "3"
                    }, {
                        label: '操作',
                        value: "4"
                    }]
                }
            }, {
                label: '原因',
                prop: 'Reason',
                labelWidth: '100',
                opts: {
                    type: 'input'
                }
            }, {
                label: '百分比',
                prop: 'Percentage',
                labelWidth: '100',
                opts: {
                    type: 'input'
                }
            }, {
                label: '创建时间',
                prop: 'Crt_Time',
                labelWidth: '160',
                disabled: true,
                opts: {
                    type: 'input'
                }
            }, {
                label: '创建人',
                prop: 'Crt_Role_Code',
                labelWidth: '100',
                disabled: true,
                opts: {
                    type: 'input'
                }
            }, {
                label: '维护时间',
                prop: 'Mnt_Time',
                labelWidth: '160',
                disabled: true,
                opts: {
                    type: 'input'
                }
            }, {
                label: '维护人',
                prop: 'Mnt_Role_Code',
                labelWidth: '100',
                disabled: true,
                opts: {
                    type: 'input'
                }
            }, {
                label: '描述',
                labelWidth: '100',
                disabled: true,
                prop: 'Des',
                opts: {
                    type: 'input'
                }
            }
        ],
        selection: true,
        showOrder: false,
        inlineBtnOpts: {
            queryBtn: {name: 'query', clsMode: 'text', url: vm.$API.findCPKCheck, key: 'Unit_Code'},
            editBtn: {name: 'edit', clsMode: 'text', url: vm.$API.updateOpeIndexMnt, key: 'berthId', text: '分析'},
            deleteBtn: {name: 'delete', clsMode: 'fill', url: vm.$API.delectOpeIndexMnt, key: 'tag'},
            submitBtn: {name: 'submit', clsMode: 'text', url: vm.$API.updateOpeIndexMnt, key: 'tag'}
        },
        popup: {
            colCls: ' large four-col'
        }
    }
    export default {
        name: 'CPKCheck',
        components: {BaseEditTable, BaseSuperTable, BaseGenerateForm},
        data() {
            return {
                tableOpts: tableOpts,
                showDialg: false,
                labelWidth: '80px',
                tableOpts1: tableOpts1,
                tableData: [],
                formData: {},
                saveData: [],
                putData: [],
                deleteData: '',
                isCheckAll:false,
                deleteArray:[]

            }
        },
        methods: {
            findCPKAnalyze(id) {

                this.$http.get(vm.$API.findCPKAnalyze + "?Index_CPK_ID=" + id).then((data) => {
                    this.tableData = data
                })
            },
            inlineQueryEvent(i, row) {
                console.log(row)
                this.showDialg = true
                this.formData = row
                this.findCPKAnalyze(row.Index_CPK_ID)

            },
            closeDialog(){
                this.showDialg=false
            },
            addCPKAnalyze() {
                this.tableData.push({
                    Index_CPK_ID: this.formData.Index_CPK_ID,
                    Reason_Type: null,
                    Reason: null,
                    Percentage: null
                })
            },
            saveInfo() {

            },
            submitInfo() {
                const loading = this.$loading()
                this.tableData.forEach((item) => {
                    if (item.hasOwnProperty('CPK_Anom_ID')) {
                        this.putData.push(item)
                    } else
                        this.saveData.push(item)
                })
                let saveResult = new Promise((resolve, reject) => {
                    if (this.saveData.length > 0) {
                        this.$http.post(vm.$API.addCPKAnalyze, this.$ET.toCollectionJson(this.saveData)).then((res) => {
                            if (res === 'success')
                                resolve(res)
                            else
                                reject()
                        })
                    } else
                        resolve('')

                })
                let putResult = new Promise((resolve, reject) => {
                    if (this.putData.length > 0) {
                        this.$http.put(vm.$API.updateCPKAnalyze, this.$ET.toCollectionJson(this.putData)).then((res) => {
                                resolve(res)
                        })
                    }else{
                        resolve('')
                    }
                })
                let deleteResult = new Promise((resolve, reject) => {
                    if (this.deleteData!='') {
                        this.$http.delete(vm.$API.delectCPKAnalyze+ "?CPK_Anom_ID="+this.deleteData, {}).then((res) => {
                            if (res === 'delectsuccess')
                                resolve(res)
                            else
                                reject()
                        })
                    }else{
                        resolve('')
                    }
                })
                Promise.all([saveResult, putResult,deleteResult]).then((res) => {
                    this.$T.success('操作成功')
                    loading.close()
                    this.findCPKAnalyze(this.formData.Index_CPK_ID)
                }).catch(err => {
                    loading.close()
                    // this.findCPKAnalyze(this.formData.Index_CPK_ID)
                });
            },
            ininleDelete(data) {
                if (data.row.hasOwnProperty('CPK_Anom_ID')) {
                    if (this.deleteData === '')
                        this.deleteData = data.row.CPK_Anom_ID
                    else
                        this.deleteData += ',' + data.row.CPK_Anom_ID
                }
                    this.tableData.splice(data.index, 1);
            },
            checkAll(selection) {
                 if(selection.length<=0)return
                this.deleteData = ''
                console.log(selection,'selectArray')
                selection.forEach((item) => {
                    if (this.deleteData === '')
                        this.deleteData = item.CPK_Anom_ID
                    else
                        this.deleteData += ',' + item.CPK_Anom_ID
                })
                this.deleteArray=selection
            },
            deleteAll(){
                  this.deleteArray.forEach((item)=>{
                      this.tableData.remove(item)
                  })
            }
        }
    }
</script>

<style>
    .container {
        background: #D3D3D7;
        display: flex;
        flex-direction: column
    }

    .form {
        background: white;
        padding: 30px;
        margin: 20px;
    }

    .cpkForm .el-dialog .el-dialog__body {
        overflow: auto;
        padding: 0;
        background-color: #D3D3D7 !important;
    }

    .container .search-btns-wrap {
        display: none
    }

    .table-warpper {
        padding: 1px 20px;
        background: white;
        margin: 10px 20px;
    }

    .table-warpper .header {
        color: #1E4088;
        padding: 10px;
        padding-bottom: 20px;
        border-bottom: none;
        background: white;
    }

    .table-warpper h2 {
        margin-top: 10px;
        color: #1E4088;
        font-size: 14px;
    }

    .table-warpper .tableTool {
        float: right;
    }

    .table-warpper .table {
        margin-top: 40px;
    }

    footer {
        display: flex;
        justify-content: center
    }
    .cpkForm  .el-dialog__header  .el-dialog__title{
        color:#1E4088 ;
    }

</style>
