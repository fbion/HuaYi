<template>
    <base-page>
        <base-super-table :tableOpts="tableOpts">
            <!--自定义搜索操作区-->
            <base-operate-panel slot="operate-panel" slot-scope="{ opts, handler}">
                <base-generate-buttons
                        :btnOpts="opts.operateBtnOpts"
                        @on-add="handler.onAdd"
                        @on-import="handler.onImport"
                        @on-export="handler.onExport"
                        @on-start="handler.onStart"
                        @on-stop="handler.onStop">
                >
                </base-generate-buttons>
                <base-generate-search
                        :searchOpts="opts.colModel"
                        @on-search="handler.onSearch"
                >
                </base-generate-search>
            </base-operate-panel>
        </base-super-table>
    </base-page>
</template>

<script>
  import xxxx from '@components/xxxx'

  export default {
    name: 'demo2',
    components: {
      xxxx
    },
    mixins: [],
    props: {},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="less">
    /*@import '../styles/var/variable';*/

    .demo-wrap {

    }
</style>
