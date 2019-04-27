<template>
    <div class="pcitc-dialog-body">
        <!--船舶信息-->
        <busi-ship-base-info-list :query-mode="true" :formData="shipBaseInfoObj"></busi-ship-base-info-list>
        <!--方案计划-->
        <busi-scheme-planner ref="$schemePlanner"
                             :query-mode="queryMode ? queryMode : mode"
                             :edit-mode="!mode"
                             :formData="schemePlannerObj">
        </busi-scheme-planner>
        <!--生产调度计划-->
        <busi-production-planner ref="$productionPlanner"
                                 :query-mode="queryMode ? queryMode : mode"
                                 :edit-mode="!mode"
                                 :data="productionPlannerArr">
        </busi-production-planner>
    </div>
</template>

<script>
  import BusiShipBaseInfoList from '@/components/business/BusiShipBaseInfoList'
  import BusiBillOfLoadingList from '@/components/business/BusiBillOfLoadingList'
  import BusiSchemePlanner from '@/components/business/BusiSchemePlanner'
  import BusiProductionPlanner from '@/components/business/BusiProductionPlanner '
  import superTablePopupMixin from '@/components/base/BaseSuperTablePopupMixin'
  import emitter from '@/utils/MixinEmitter'

  export default {
    components: {
      BusiShipBaseInfoList,
      BusiBillOfLoadingList,
      BusiSchemePlanner,
      BusiProductionPlanner
    },
    name: 'schemeCompilePopup',
    props: {},
    mixins: [emitter, superTablePopupMixin],
    data() {
      return {
        shipBaseInfoObj: null,
        orderArray: [],
        schemePlannerObj: null,
        productionPlannerArr: [],
        mode: false
      }
    },
    computed: {},
    created() {
    },
    methods: {
      async saveDB(api) { // 保存的场合,可以覆写此段代码
        const schemePlanner = await this.$refs.$schemePlanner.getBaseGenerateForm()
        if (!schemePlanner) return
        if (!this.$refs.$productionPlanner.productionPlannerArr.length) {
          this.$T.warning('生产调度计划不能为空')
          return
        }
        let params = {
          shipsId: this.shipBaseInfoObj.shipsId,
          shipingDateId: this.shipBaseInfoObj.shippingFutureDateListVo.shipingDateId,
          shippingLoadUnloadSchemeListVo: schemePlanner,
          shippingLoadUnloadSchemeSchedulingListVos: this.$refs.$productionPlanner.productionPlannerArr
        }
        console.log('保存/更新场合，传入的参数::' + JSON.stringify(params))
        this.$http.$service({
          url: api ? api : this.$API.DLMS_POST_SHIPPING_SCHEME,
          method: 'post',
          data: params
        }).then(response => {
          this.$T.success()
          this.dispatch('BaseSuperTable', 'init-tableList')
          this.dispatch('BaseSuperTable', 'close-dialog')
        }).catch(() => {
        })
      },
      async submitDB() {
        const api = this.$API.DLMS_POST_SHIPPING_SCHEME_APPROVE
        this.saveDB(api)
      },
      renderFormData(data) { // 编辑和查看的场合,可以覆写此段代码
        const loading = this.$loading()
        this.$http.get(data.url, data.params).then(response => {
          // 船舶基本信息
          this.shipBaseInfoObj = this.formData = response.data
          // 提货单信息
          this.orderArray = response.data.shippingDateOrderListVos
          // 方案计划
          this.schemePlannerObj = response.data.shippingLoadUnloadSchemeListVo
          // 判断方案状态，更新保存和提交按钮的状态 ::SCHEME_STATUS_TYPE_2:审批中 SCHEME_STATUS_TYPE_5:审批驳回
          if (this.schemePlannerObj && this.schemePlannerObj.currApproveStatus !== 'SCHEME_STATUS_TYPE_2' && this.schemePlannerObj.currApproveStatus !== 'SCHEME_STATUS_TYPE_5') {
            this.dispatch('schemeCompile', 'setSubmitStatus', true)
            this.mode = true
          } else {
            this.dispatch('schemeCompile', 'setSubmitStatus', false)
            this.mode = false
          }
          // 调度计划
          this.productionPlannerArr = response.data.shippingLoadUnloadSchemeSchedulingListVos
          loading.close()
        }).catch(() => {
          loading.close()
        })
      }
    }
  }
</script>
