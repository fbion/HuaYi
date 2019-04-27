<template>
    <div class="base-operate-panel-wrap">
        <slot></slot>
    </div>
</template>

<script>

  export default {
    name: 'BaseOperatePanel'
  }
</script>

<style lang="less">
    .base-operate-panel-wrap {
        position: relative;
        overflow: hidden;
        /*padding-bottom: 10px;*/
        .buttons-scope-wrap {
            float: right;
        }
        //todo 查询
        .search-scope-wrap {
            float: left;
        }

        .el-form-item--small.el-form-item {
            margin-bottom: 0;
        }
    }
</style>
