<template>
    <base-page>
        <base-super-table :tableOpts="tableOpts"></base-super-table>
    </base-page>
</template>

<script>
  const tableOpts = {
    url: vm.$API.BASE_GET_DEMO_LIST,
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
        label: '附件',
        prop: 'filePath',
        align: 'center',
        opts: {
          type: 'upload',
          upload: {
            mode: 'thumb',
            action: 'https://jsonplaceholder.typicode.com/posts/'
          }
        }
      },
      {
        label: '备注',
        prop: 'note',
        align: 'center',
        opts: {
          type: 'textarea',
          searchFilterItem: true,
          checkRules: [
            { required: true }
          ]
        }
      }
    ],
    showOrder: true,
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
    name: 'demoCascader',
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
