<template>
    <el-dialog
            class="pcitc-customer-dialog large three-col"
            v-drag-dialog
            v-if="dialogVisible"
            top='10vh'
            :title="title"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :close-on-click-modal="false">
        <div class="dialog-flat-header">
            <base-btn @on-click="handleDialogCancel">关 闭</base-btn>
            <base-btn v-if="!isSubmitDisabled" type="primary" @on-click="handleDialogSave">保 存</base-btn>
            <base-btn v-if="!isSubmitDisabled" type="primary" @on-click="handleDialogSubmit">提 交</base-btn>
            <base-btn v-if="isSubmitDisabled" type="primary" disabled>已保存</base-btn>
            <base-btn v-if="isSubmitDisabled" type="primary" disabled>已提交</base-btn>
        </div>
        <div class="pcitc-dialog-body">
            <!--船舶信息-->
            <busi-ship-base-info-list :add-mode="true" :shipsJobsFun="handleShipsJob"></busi-ship-base-info-list>
            <!--提货单信息-->
            <busi-bill-of-loading-list ref="$billOfLoading"
                                       :query-mode="true"
                                       :data="orderArray">
            </busi-bill-of-loading-list>
            <!--方案计划-->
            <busi-scheme-planner ref="$schemePlanner"
                                 :query-mode="mode"
                                 :edit-mode="!mode"
                                 :formData="schemePlannerObj">
            </busi-scheme-planner>
            <!--生产调度计划-->
            <busi-production-planner ref="$productionPlanner"
                                     :query-mode="mode"
                                     :edit-mode="!mode"
                                     :data="productionPlannerArr">
            </busi-production-planner>
        </div>
    </el-dialog>
</template>

<script>
  import BusiShipBaseInfoList from '@/components/business/BusiShipBaseInfoList'
  import BusiBillOfLoadingList from '@/components/business/BusiBillOfLoadingList'
  import BusiSchemePlanner from '@/components/business/BusiSchemePlanner'
  import BusiProductionPlanner from '@/components/business/BusiProductionPlanner '

  export default {
    name: 'homeOwnerAppTwoDialog',
    components: {
      BusiShipBaseInfoList,
      BusiBillOfLoadingList,
      BusiSchemePlanner,
      BusiProductionPlanner
    },
    mixins: [],
    props: {},
    data() {
      return {
        title: '装卸方案编制',
        dialogVisible: true,
        popupType: 'add',
        editParams: null,
        schemePlannerObj: {},
        productionPlannerArr: [],
        orderArray: [],
        isSubmitDisabled: false,
        mode: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleShipsJob(shipCode) {
        this.renderFormData(
          {
            url: this.$API.DLMS_GET_SHIPPING_DETAIL,
            params: {
              shipsId: shipCode
            }
          }
        )
      },
      async saveDB(api) { // 保存的场合,可以覆写此段代码
        const schemePlanner = await this.$refs.$schemePlanner.getBaseGenerateForm()
        const productionPlanner = await this.$refs.$productionPlanner.getBaseGenerateForm()
        if (!schemePlanner || !productionPlanner) return
        let params = {
          shipsId: this.shipBaseInfoObj.shipsId,
          shipingDateId: this.shipBaseInfoObj.shippingFutureDateListVo.shipingDateId,
          shippingLoadUnloadSchemeListVo: schemePlanner,
          shippingLoadUnloadSchemeSchedulingListVos: productionPlanner
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
          // 提货单信息
          this.orderArray = response.data.shippingDateOrderListVos
          // 方案计划
          this.schemePlannerObj = this.$T.emptyObjectWrapper(response.data.shippingLoadUnloadSchemeListVo)
          // 判断方案状态，更新保存和提交按钮的状态 ::审批中 审批驳回
          if (this.schemePlannerObj.currApproveStatus !== 'SCHEME_STATUS_TYPE_2') {
            this.mode = this.isSubmitDisabled = true
          } else {
            this.mode = this.isSubmitDisabled = false
          }
          // 调度计划
          this.productionPlannerArr = response.data.shippingLoadUnloadSchemeSchedulingListVos
          loading.close()
        }).catch(() => {
          loading.close()
        })
      },
      closeDialog() {
        this.$parent.currentTabComponent = ''
        this.dialogVisible = false
      },
      handleDialogCancel() {
        this.closeDialog()
      },
      handleDialogSave() {
        this.saveDB()
      },
      handleDialogSubmit() {
        this.submitDB()
      }
    }
  }
</script>
