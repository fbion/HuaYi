<template>
    <el-dialog
            class="pcitc-customer-dialog large three-col"
            v-drag-dialog
            v-if="dialogVisible"
            top='10vh'
            :title="title"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :close-on-click-modal="false">
        <div class="dialog-flat-header">
            <base-btn @on-click="handleDialogCancel">关 闭</base-btn>
            <base-btn type="primary" @on-click="handleDialogSave">保 存</base-btn>
        </div>
        <shipping-future-prediction-popup
                ref="$popup"
                :tableOpts="tableOpts"
                :editParams="editParams"
                :popupType="popupType">
        </shipping-future-prediction-popup>
    </el-dialog>
</template>

<script>
  import ShippingFuturePredictionPopup from '@views/dlms/shippingFuturePredictionPopup'

  export default {
    name: 'homeOwnerAppOneDialog',
    components: {
      ShippingFuturePredictionPopup
    },
    mixins: [],
    props: {},
    data() {
      return {
        tableOpts: {
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
              opts: {
                type: 'select',
                searchFilterItem: true,
                checkRules: [
                  { required: true }
                ],
                onlyFillFiledValue: {
                  url: this.$API.DLMS_ALL_SHIPPING,
                  key: 'shipsId',
                  fun: (code) => {
                    this.$refs.$popup.renderHistoryData(code)
                  }
                },
                showMode: 'normal',
                match: {
                  label: 'shipsName',
                  value: 'shipsId'
                },
                url: this.$API.DLMS_GET_SHIPPING_ALL
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
                searchFilterItem: true
              }
            },
            {
              label: '船壳',
              prop: 'shipsHull',
              opts: {
                type: 'input',
                disabled: true
              }
            },
            {
              label: '船型',
              prop: 'shipsTypeName',
              opts: {
                type: 'input',
                disabled: true
              }
            },
            {
              label: '船舶公司',
              prop: 'companyName',
              opts: {
                type: 'input',
                disabled: true
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
              label: '船宽（米）',
              prop: 'shipsWidth',
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
              label: '预到时间',
              prop: 'expectedTime',
              width: '135',
              format: '{y}-{m}-{d} {h}:{i}',
              opts: {
                type: 'datetime',
                searchFilterItem: true,
                format: 'yyyy-MM-dd HH:mm',
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
                checkRules: [
                  { required: true }
                ]
              }
            }
          ]
        },
        title: '船期预报',
        dialogVisible: true,
        popupType: 'add',
        editParams: null
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      closeDialog() {
        this.$parent.currentTabComponent = ''
        this.dialogVisible = false
      },
      handleDialogCancel() {
        this.closeDialog()
      },
      handleDialogSave() {
        this.$refs.$popup.saveDB(() => {
          this.closeDialog()
        })
      }
    }
  }
</script>
