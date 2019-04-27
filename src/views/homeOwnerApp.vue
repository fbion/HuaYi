<template>
    <div class="home-owner-app-wrap">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content" @click="go('shippingFuturePredictionPopup')">
                    <img src="../assets/images/busi/cbyg.png"/>
                    <p>船期预报</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="go('schemeCompilePopup')">
                    <img src="../assets/images/busi/zxfabz.png"/>
                    <p>装卸方案编制</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="go('inspectionImportPopup')">
                    <img src="../assets/images/busi/sjzygl.png"/>
                    <p>第三方作业管理</p>
                </div>
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
        <component :is="currentTabComponent"></component>
    </div>
</template>

<script>
  import HomeOwnerAppOneDialog from './homeOwnerAppOneDialog'
  import HomeOwnerAppTwoDialog from './homeOwnerAppTwoDialog'
  import HomeOwnerAppThreeDialog from './homeOwnerAppThreeDialog'

  export default {
    name: 'homeOwnerApp',
    components: {
      HomeOwnerAppOneDialog,
      HomeOwnerAppTwoDialog,
      HomeOwnerAppThreeDialog
    },
    mixins: [],
    props: {},
    data() {
      return {
        currentTabComponent: ''
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      go: function(component) {
        switch (component) {
          case 'shippingFuturePredictionPopup':
            this.currentTabComponent = 'HomeOwnerAppOneDialog'
            break
          case 'schemeCompilePopup':
            this.currentTabComponent = 'HomeOwnerAppTwoDialog'
            break
          case 'inspectionImportPopup':
            this.currentTabComponent = 'HomeOwnerAppThreeDialog'
            break
        }
      }
    }
  }
</script>

<style lang="less">
    @import '../styles/var/variable';

    .home-owner-app-wrap {
        overflow: hidden;
        cursor: pointer;
        .grid-content {
            text-align: center;
            margin: 5px;
            padding-bottom: 10px;
            background-color: @color-white;
            border: 1px solid @border-color-base;
            border-radius: 4px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
        }
    }
</style>
