<template>
  <transition :name="disableTransitions ? '' : 'el-zoom-in-center'">
    <span
      class="el-tag"
      :class="[
        type ? 'el-tag--' + type : '',
        tagSize && `el-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="el-tag__close el-icon-close"
         v-if="closable"
         @click.stop="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'CoverElTag',
    props: {
      name: String,
      title: String,
      src: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        if (this.title === undefined) {
          this.$emit('close', event)
        } else {
          this.$emit('close', event, this)
        }
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size
      }
    }
  }
</script>
