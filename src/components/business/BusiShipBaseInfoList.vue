<template>
    <base-card>
        <p slot="header">船舶信息</p>
        <base-generate-form
                ref="$shipBaseInfo"
                :formProps="formFiled"
                :add-mode="addMode"
                :query-mode="queryMode"
                :edit-mode="editMode"
                :formData="formData">
        </base-generate-form>
    </base-card>
</template>

<script>

  export default {
    name: 'BusiShipBaseInfo',
    components: {},
    mixins: [],
    props: {
      addMode: Boolean,
      queryMode: Boolean,
      editMode: Boolean,
      formProps: Array,
      formData: Object,
      shipsJobsFun: Function
    },
    data() {
      return {
        defaultFormFiled: [
//          {
//            label: '船舶名称',
//            prop: 'shipsName',
//            opts: {
//              type: 'input'
//            }
//          },
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
                  if (typeof this.shipsJobsFun === 'function') {
                    this.shipsJobsFun(code)
                  }
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
            label: '国家',
            prop: 'stateName',
            noItem: true,
            opts: {
              type: 'input',
              noFormItem: true,
              disabled: true
            }
          },
          {
            label: '英文简称',
            prop: 'shipsEnglishAbbreviations',
            opts: {
              type: 'input',
              disabled: true
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
            label: '船舶位置',
            prop: 'berthName',
            noItem: true,
            opts: {
              type: 'input',
              noFormItem: true,
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
              noFormItem: true,
              disabled: true
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
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>
