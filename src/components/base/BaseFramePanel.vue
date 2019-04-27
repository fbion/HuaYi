<template>
  <base-page class="" v-show="active" :name="name">
    <iframe class="ifa" :src="src" frameborder="0" scrolling="no"></iframe>
  </base-page>
</template>

<script>
  export default {
    components: {},
    props: {
      title: String,
      name: String,
      src: String
    },
    data() {
      return {}
    },
    computed: {
      active() {
        return this.$store.state.app.currentTagName === this.name
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less">
  .ifa {
    width: 100%;
    height: calc(100vh - 16);
  }
</style>
