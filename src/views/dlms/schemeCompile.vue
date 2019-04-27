<template>
    <base-page>
        <base-super-table
                :tableOpts="tableOpts"
                :cellClickEvent="handleCellClick">
            <!--自定义弹出框内容-->
            <scheme-compile-popup slot="dialog-content" slot-scope="{ opts }"
                                  ref="$popup"
                                  :tableOpts="opts.tableOptsCopy"
                                  :editParams="opts.editParams"
                                  :popupType="opts.popupType">
            </scheme-compile-popup>
            <template slot="flat-header-button" slot-scope="{ opts }">
                <base-btn @on-click="opts.handler.onDialogCancel">关 闭</base-btn>
                <template v-if="opts.popupType!=='query'">
                    <base-btn v-if="!isSubmitDisabled" type="primary" @on-click="opts.handler.onDialogSave">保 存
                    </base-btn>
                    <base-btn v-if="!isSubmitDisabled" type="primary" slot="flat-button-append" @on-click="onClick">提 交
                    </base-btn>
                    <base-btn v-if="isSubmitDisabled" type="primary" disabled>已保存</base-btn>
                    <base-btn v-if="isSubmitDisabled" type="primary" disabled>已提交</base-btn>
                </template>
            </template>
        </base-super-table>
    </base-page>
</template>

<script>
  import Authority from '@/utils/MixinAuthority'
  import SchemeCompilePopup from './schemeCompilePopup'

  const tableOpts = {
    url: vm.$API.DLMS_GET_SHIPPING_SCHEME_LIST,
    uniqueKey: 'shipsId,shipingDateId',
    colModel: [
      {
        label: '船舶id',
        prop: 'shipsId',
        align: 'center',
        hide: true,
        opts: {
          type: 'input'
        }
      },
      {
        label: '船期id',
        prop: 'shipingDateId',
        align: 'center',
        hide: true,
        opts: {
          type: 'input'
        }
      },
      {
        label: '船舶名称',
        prop: 'shipsName',
        href: true,
        opts: {
          type: 'select',
          searchFilterItem: true,
          disabled: true,
          showMode: 'normal',
          match: {
            label: 'shipsName',
            value: 'shipsId'
          },
          url: vm.$API.DLMS_GET_SHIPPING_ALL
        }
      },
      {
        label: '呼号',
        prop: 'shipsCallSign',
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: 'MMSI',
        prop: 'mmsi',
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '英文简称',
        prop: 'shipsEnglishAbbreviations',
        opts: {
          type: 'input',
          disabled: true,
          noFormItem: true,
          searchFilterItem: true
        }
      },
      {
        label: '满载吃水（米）',
        prop: 'shipsDraught',
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '船长（米）',
        prop: 'shipsLength',
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '船宽（米）',
        prop: 'shipsWidth',
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '国家',
        prop: 'stateName',
        noItem: true,
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '船舶位置',
        prop: 'berthName',
        noItem: true,
        opts: {
          type: 'input',
          disabled: true
        }
      },
      {
        label: '预到时间',
        prop: 'expectedTime',
        width: '135',
        format: '{y}-{m}-{d} {h}:{i}',
        opts: {
          type: 'datetime',
          format: 'yyyy-MM-dd HH:mm',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          searchFilterItem: true,
          searchDateRange: {
            range: true,
            label: '预到'
          },
          disabled: true
        }
      },
      {
        label: '状态',
        prop: 'schemeApproveStatusName',
        opts: {
          type: 'select',
          searchFilterItem: true,
          noFormItem: true,
          showMode: 'normal',
          match: {
            label: 'schemeApproveStatusName',
            value: 'schemeApproveStatus'
          },
          dictionary: {
            label: 'dictionaryName',
            value: 'dictionaryCode'
          },
          url: vm.$API.PUBLIC_GET_DICTIONARIES_SCHEME_TYPE
        },
        tags: {
          type: [
            {
              label: '已登记',
              tagType: ''
            },
            {
              label: '未登记',
              tagType: 'warning'
            },
            {
              label: '审批中',
              tagType: 'success'
            },
            {
              label: '已审批',
              tagType: 'info'
            },
            {
              label: '审批驳回',
              tagType: 'danger'
            }
          ]
        }
      },
      {
        label: '审批信息',
        prop: 'schemeApproveLogs',
//        align: 'center',
        icon: 'el-icon-tickets',
        opts: {
          type: 'input',
          noFormItem: true
        }
      }
    ],
    showOrder: true,
    showHandlerBar: true,
    HandlerColWidth: '80px',
    operateBtnOpts: {},
    inlineBtnOpts: {
      queryBtn: { name: 'query', clsMode: 'text', url: vm.$API.DLMS_GET_SHIPPING_DETAIL },
      editBtn: { name: 'edit', clsMode: 'text', url: vm.$API.DLMS_GET_SHIPPING_DETAIL }
    },
    popup: {
      colCls: 'three-col',
      flat: true
    }
  }

  export default {
    name: 'schemeCompile',
    components: {
      SchemeCompilePopup
    },
    mixins: [Authority],
    props: {},
    data() {
      return {
        tableOpts: tableOpts,
        isSubmitDisabled: false
      }
    },
    computed: {},
    watch: {},
    created() {
      this.$on('setSubmitStatus', this.setSubmitStatus)
    },
    mounted() {},
    methods: {
      handleCellClick(row, column, cell, event) {
        if (column.property === 'schemeApproveLogs') {
          const logArr = row.schemeApproveLogVos
          let arr = []
          logArr.forEach(function(item) {
            let str = item.approveUserId ? `<div>审批人：${item.approveUserId} ; ${item.approveStatus}</div>`
              : `<div>提交人：${item.createId} ; 提交日期：${item.createTime}</div>`
            arr.unshift(str)
          })

          if (!arr.length) {
            arr.unshift('<div>暂无审批信息，请先提交审批申请</div>')
          }
          this.$alert(arr.join(''), '审批信息', {
            dangerouslyUseHTMLString: true
          })
        }
      },
      onClick() {
        this.$confirm(this.$CONST.MSG_SYS_DELETE_SUBMIT, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          // 提交按钮
          this.$refs.$popup.submitDB()
        }).catch(() => {
          this.$T.info()
        })
      },
      setSubmitStatus(status) {
        this.isSubmitDisabled = status
      }
    }
  }
</script>
