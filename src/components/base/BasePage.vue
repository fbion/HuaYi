<template>
    <div class="page">
        <slot></slot>
    </div>
</template>

<script>
    import * as $T from '@/utils/tools'
    import $store from '@/store'
  export default {
    name: 'BasePage'
  }
</script>

<style lang="less">
    .page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 5px 10px 10px;
        overflow: auto;
    }
</style>
