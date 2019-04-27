<template>
    <base-page>
        <div class="OpeIndexMntContainer">
            <base-super-table
                    :tableOpts="tableOpts"
                    :inlineSubmitEvent="inlineSubmitEvent"></base-super-table>
        </div>
    </base-page>
</template>
<!--//提交1 新增0-->
<script>
    import * as ET
        from '@/utils/ETTool'

    const tableOpts = {
        url: vm.$API.findOpeIndexMnt,
        colModel: [
            {
                label: '装置',
                prop: 'Unit_Name',
                align: 'center',
                width: '180px',
                opts: {
                    showType: 'table',
                    type: 'input'
                }
            },
            {
                label: '装置',
                prop: 'Unit_Code',
                href: true,
                opts: {
                    showType: 'form',
                    type: 'select',
                    searchFilterItem: true,
                    showLabel: true,
                    showMode: 'normal',
                    url: vm.$API.initDicUnit,
                    field: 'Unit_Name',
                    initValue: '*全*部*',
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
                label: '单元',
                prop: 'Prdt_Cell_Code',
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    field: 'Prdt_Cell_Name',
                    initValue: '*全*部*',
                    data: [{
                        name: '单元1',
                        code: 'dy1'
                    }, {
                        name: '单元2',
                        code: 'dy2'
                    }],
                    match: {
                        label: 'name',
                        value: 'code'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '单元Code',
                prop: 'Prdt_Cell_Name',
                hide: true,
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '名称',
                prop: 'Index_Name',
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    initValue: '*全*部*',
                    data: [{
                        Index_Name: 'xxx',
                        name: '名称1'
                    }, {
                        Index_Name: 'name2',
                        name: '名称2'
                    }],
                    match: {
                        label: 'name',
                        value: 'Index_Name'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '位号',
                prop: 'tag',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '计量单位',
                prop: 'Meas_Unit',
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
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    url: vm.$API.initDicGrade,
                    initValue: '*全*部*',
                    match: {
                        label: 'Name',
                        value: 'Code'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '上限制',
                prop: 'Up_Limit',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '下限值',
                prop: 'Down_Limit',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '理想值',
                prop: 'Ideal_Value',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '创建时间',
                prop: 'Crt_Time',
                hide: true,
                opts: {
                    type: 'date',
                    initValue: vm.$T.parseTime(new Date()),
                    checkRules: [
                        {required: true}
                    ]
                }
            }, {
                label: '创建人',
                prop: 'Crt_Role_Code',
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
                label: '起效时间',
                width: '100',
                prop: 'Start_Time',
                format: '{y}-{m}-{d}',
                opts: {
                    type: 'date',
                    initValue: vm.$T.parseTime(new Date()),
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '状态',
                width: '100',
                prop: 'Status',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '提交时间',
                width: '100',
                prop: 'Submit_Time',
                format: '{y}-{m}-{d} {h}:{m}:{s}',
                opts: {
                    type: 'datetime',
                    // initValue: vm.$T.parseTime(new Date()),
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '提交人',
                width: '100',
                prop: 'Submit_Role_Code',
                opts: {
                    type: 'input',
                    disabled: true,
                    initValue: 'test001'
                }
            },
            {
                label: '是否启用',
                width: '100',
                prop: 'In_Use',
                opts: {
                    type: 'select',
                    showMode: 'normal',
                    searchFilterItem: true,
                    data: [{
                        In_Use: 1,
                        name: '是'
                    }, {
                        In_Use: 0,
                        name: '否'
                    }],
                    initValue: '*全*部*',
                    match: {
                        label: 'name',
                        value: 'In_Use'
                    },
                    checkRules: [
                        {required: true}
                    ]
                }
            },
            {
                label: '维护人',
                width: '100',
                prop: 'Mnt_Role_Code',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: false}
                    ]
                }
            }, {
                label: '维护时间',
                width: '100',
                prop: 'Mnt_Time',
                hide: true,
                opts: {
                    type: 'input',
                    initValue: vm.$T.parseTime(new Date()),
                    checkRules: [
                        {required: false}
                    ]
                }
            },
            {
                label: '描述',
                width: '100',
                prop: 'Des',
                opts: {
                    type: 'input',
                    checkRules: [
                        {required: true}
                    ]
                }
            }
        ],
        selection: false,
        showOrder: false,
        operateBtnOpts: {
            addBtn: {
                name: 'add',
                clsMode: 'fill',
                url: vm.$API.addOpeIndexMnt
            }
        },
        inlineBtnOpts: {
            editBtn: {
                name: 'edit',
                clsMode: 'text',
                url: vm.$API.updateOpeIndexMnt,
                key: 'berthId'
            },
            deleteBtn: {
                name: 'delete',
                clsMode: 'fill',
                url: vm.$API.delectOpeIndexMnt,
                key: 'tag'
            },
            submitBtn: {
                name: 'submit',
                clsMode: 'text',
                url: vm.$API.updateOpeIndexMnt,
                key: 'tag'
            }
        },
        popup: {
            colCls: ' large four-col'
        }
    }
    export default {
        name: 'OpeIndexMnt',
        data() {
            return {
                tableOpts: tableOpts
            }
        },
        methods: {
            inlineSubmitEvent(i, row) {
                row.In_Use = 1
                this.$http.put(vm.$API.updateOpeIndexMnt, ET.toCollectionJson(row))
            }
        }
    }
</script>

<style lang="less">
   .OpeIndexMntContainer .buttons-scope-wrap button {
        background: rgb(0, 172, 172);
        border-color: rgb(0, 172, 172);
    }
   .OpeIndexMntContainer .has-gutter th div{
       text-align: center;
   }
   .OpeIndexMntContainer .el-table__row  td:nth-child(1) .cell{
       padding-left: 48px;
   }
   .OpeIndexMntContainer .el-table__row  td:nth-child(2) .cell{
       text-align: left;
   }
</style>
