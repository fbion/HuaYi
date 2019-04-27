<template>
    <base-page>
        <base-super-table :tableOpts="tableOpts">
            <template slot="button-append">
                <base-btn type="primary" @on-click="handleClick">
                    自定义
                </base-btn>
            </template>
        </base-super-table>
    </base-page>
</template>

<script>

  import BaseBtn from '../../src/components/base/BaseBtn.vue'

  const tableOpts = {
    url: vm.$API.BASE_GET_DEMO_LIST,
    uniqueKey: 'id',
    colModel: [
      {
        label: 'id',
        prop: 'id',
        align: 'center',
        hide: 'true',
        opts: {
          type: 'input'
        }
      },
      {
        label: '国家',
        prop: 'countryName',
        align: 'center',
        opts: {
          type: 'select',
          url: vm.$API.BASE_GET_DEMO_COUNTRY,
          searchFilterItem: true,
          showMode: 'normal',
          match: {
            label: 'countryName',
            value: 'country',
            cascadeValue: 'countryValue'
          },
          dictionary: {
            label: 'countryName',
            value: 'countryCode'
          },
          group: {
            id: 'g1',
            level: 1
          }
        }
      },
      {
        label: '城市',
        prop: 'cityName',
        align: 'center',
        opts: {
          type: 'select',
          url: vm.$API.BASE_GET_DEMO_CITY,
          searchFilterItem: true,
          showMode: 'normal',
          match: {
            label: 'cityName',
            value: 'city',
            filterValue: 'filterValue'
          },
          dictionary: {
            label: 'cityName',
            value: 'cityCode'
          },
          group: {
            id: 'g1',
            level: 2
          }
        }
      },
      {
        label: '区',
        prop: 'districtName',
        align: 'center',
        opts: {
          type: 'select',
          url: vm.$API.BASE_GET_DEMO_DISTRICT,
          searchFilterItem: true,
          showMode: 'normal',
          match: {
            label: 'districtName',
            value: 'district'
          },
          dictionary: {
            label: 'districtName',
            value: 'districtCode'
          },
          group: {
            id: 'g1',
            level: 3
          }
        }
      },
      {
        label: '性别',
        prop: 'sexName',
        width: '150',
        align: 'center',
        opts: {
          type: 'select',
          showMode: 'normal',
          match: {
            label: 'sexName',
            value: 'sex'
          },
          data: [{
            sexName: '男',
            sex: '男'
          }, {
            sexName: '女',
            sex: '女'
          }]
        }
      },
      {
        label: '备注',
        prop: 'note',
        align: 'center',
        opts: {
          type: 'textarea',
          searchFilterItem: true,
          formClassName: 'alone-row',
          checkRules: [
            { required: true }
          ]
        }
      }
    ],
    showOrder: true,
    radio: true,
    operateBtnOpts: {
      addBtn: { name: 'add', clsMode: 'fill', url: vm.$API.BASE_ALL_DEMO }
    },
    inlineBtnOpts: {
      queryBtn: { name: 'query', clsMode: 'text', url: vm.$API.BASE_ALL_DEMO, key: 'id' },
      editBtn: { name: 'edit', clsMode: 'text', url: vm.$API.BASE_ALL_DEMO, key: 'id' }
    },
    popup: {
      colCls: 'two-col'
    },
    btnAuthority: true
  }

  export default {
    components: { BaseBtn },
    name: 'demoCascader',
    data() {
      return {
        tableOpts: tableOpts
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleClick() {
      }
    }
  }
</script>

<style lang="less">
</style>
