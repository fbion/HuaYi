<template>
    <base-page>
        <base-super-table :tableOpts="tableOpts"></base-super-table>
    </base-page>
</template>

<script>

  const tableOpts = {
    url: vm.$API.DMMS_GET_BERTH_LIST,
    colModel: [
      {
        label: '泊位id',
        prop: 'berthId',
        align: 'center',
        hide: true,
        opts: {
          type: 'input'
        }
      },
      {
        label: '泊位名称',
        prop: 'berthName',
        href: true,
        opts: {
          type: 'input',
          searchFilterItem: true,
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '结构型式编码',
        prop: 'structureTypeCode',
        opts: {
          type: 'input',
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '泊位长度（米）',
        prop: 'berthLength',
        opts: {
          type: 'input',
          checkRules: [
            { required: true },
            { type: 'number', message: vm.$CONST.MSG_RULES_NUMBER }
          ]
        }
      },
      {
        label: '设计停泊能力（吨）',
        prop: 'designMooringAbility',
        opts: {
          type: 'input',
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '主要用途',
        prop: 'mainUses',
        opts: {
          type: 'input',
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '数据来源',
        prop: 'datasource',
        opts: {
          type: 'input',
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '登记部门',
        prop: 'createDept',
        opts: {
          type: 'input',
          disabled: true,
          initValue: vm.$T.getUserInfo().orgUnitName,
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '登记部门code',
        prop: 'createDeptCode',
        hide: true,
        opts: {
          type: 'input',
          disabled: true,
          initValue: vm.$T.getUserInfo().orgUnitCode,
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '登记人',
        prop: 'createId',
        opts: {
          type: 'input',
          disabled: true,
          initValue: vm.$T.getUserInfo().userName,
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '登记日期',
        width: '100',
        prop: 'createTime',
        format: '{y}-{m}-{d}',
        opts: {
          type: 'date',
          disabled: true,
          initValue: vm.$T.parseTime(new Date()),
          checkRules: [
            { required: true }
          ]
        }
      },
      {
        label: '状态',
        prop: 'statusName',
        tags: {
          type: [
            {
              label: '启用',
              tagType: 'success'
            },
            {
              label: '停用',
              tagType: 'info'
            }
          ]
        },
        opts: {
          type: 'select',
          checkRules: [
            { required: true }
          ],
          searchFilterItem: true,
          showMode: 'normal',
          match: {
            label: 'statusName',
            value: 'status'
          },
          dictionary: {
            label: 'dictionaryName',
            value: 'dictionaryCode'
          },
          url: vm.$API.PUBLIC_GET_DICTIONARIES_DATA_STATUS_TYPE
        }
      }
    ],
    selection: true,
    showOrder: true,
    operateBtnOpts: {
      addBtn: { name: 'add', clsMode: 'fill', url: vm.$API.DMMS_ALL_BERTH },
      startBtn: { name: 'start', clsMode: 'fill', url: vm.$API.DMMS_PUT_BERTH_STATUS, key: 'berthId' },
      stopBtn: { name: 'stop', clsMode: 'fill', url: vm.$API.DMMS_PUT_BERTH_STATUS, key: 'berthId' },
      importBtn: { name: 'import', clsMode: 'fill', url: vm.$API.DMMS_POST_BERTH_IMPORT },
      exportBtn: { name: 'export', clsMode: 'fill', url: vm.$API.DMMS_GET_BERTH_EXPORT }
    },
    inlineBtnOpts: {
      queryBtn: { name: 'query', clsMode: 'text', url: vm.$API.DMMS_ALL_BERTH, key: 'berthId' },
      editBtn: { name: 'edit', clsMode: 'text', url: vm.$API.DMMS_ALL_BERTH, key: 'berthId' },
      deleteBtn: { name: 'delete', clsMode: 'fill', url: vm.$API.DMMS_ALL_BERTH, key: 'berthId' }
    },
    popup: {
      colCls: 'two-col'
    }
  }

  export default {
    name: 'berth',
    components: {},
    data() {
      return {
        tableOpts: tableOpts
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="less">
</style>
