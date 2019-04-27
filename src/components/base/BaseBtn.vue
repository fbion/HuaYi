<template>
    <el-button
            :class="cls"
            v-if="isShow"
            :size="size"
            :icon="icon"
            :type="type"
            style="width: 70px;height: 34px;"
            :disabled="disabled"
            @click="handleClick">
        <slot>查询</slot>
    </el-button>
</template>

<script>

  export default {
    name: 'BaseBtn',
    props: {
      disabled: Boolean,
      oauth: {
        type: Boolean,
        default: function() {
          return true
        }
      },
      type: {
        type: String,
        default: function() {
          return 'default'
        }
      },
      message: {
        type: String,
        default: function() {
          return this.$CONST.MSG_SYS_DELETE_OPERATION
        }
      },
      icon: {
        type: String,
        default: function() {
          return ''
        }
      },
      size: {
        type: String,
        default: function() {
          return this.$store.state.app.elementUISize
        }
      },
      color: {
        type: String,
        default: function() {
          return ''
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      isShow: function() {
        return this.oauth
      },
      cls: function() {
        return {
          'red-button': this.color === 'red'
        }
      }
    },
    created() {},
    methods: {
      handleClick() {
        if (this.type === 'danger') {
          this.$confirm(this.message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('on-click')
          }).catch(() => {
            this.$T.info()
          })
        } else {
          this.$emit('on-click')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .red-button {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;
        &:hover, &:active, &:focus {
            color: #fff;
            background-color: #fab6b6;
            border-color: #fab6b6;
        }
        &.is-plain.is-disabled, &.is-plain.is-disabled:active, &.is-plain.is-disabled:focus, &.is-plain.is-disabled:hover {
            color: #f9a7a7;
            background-color: #fef0f0;
            border-color: #fde2e2;
        }
        &.is-disabled, &.is-disabled:active, &.is-disabled:focus, &.is-disabled:hover {
            color: #fff;
            background-color: #fab6b6;
            border-color: #fab6b6;
        }
    }
</style>
