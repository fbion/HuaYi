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
            <base-btn v-if="!isSubmitDisabled && isChecked" type="primary" @on-click="handleDialogSubmit">提 交</base-btn>
            <base-btn v-if="!isChecked" type="primary" slot="flat-button-append" disabled>提 交</base-btn>
            <base-btn v-if="isSubmitDisabled" type="primary" disabled>已保存</base-btn>
            <base-btn v-if="isSubmitDisabled" type="primary" disabled>已提交</base-btn>
        </div>
        <div class="pcitc-dialog-body home-owner-three-wrap">
            <!--船舶信息-->
            <busi-ship-base-info-list :add-mode="true" :shipsJobsFun="handleShipsJob"></busi-ship-base-info-list>
            <!--商检需求-->
            <busi-inspection-require
                    ref="$inspectionRequire"
                    :query-mode="false"
                    :edit-mode="true"
                    :hasCheckbox="true"
                    :isInspectionImportPage="true"
                    :formData="inspectionRequireObj"
                    @on-check-change="handleCheckStatus">
            </busi-inspection-require>
            <!--提货单信息-->
            <busi-bill-of-loading-list ref="$billOfLoading"
                                       :query-mode="true"
                                       :data="orderArray">
            </busi-bill-of-loading-list>
            <!--方案计划-->
            <busi-scheme-planner ref="$schemePlanner"
                                 :query-mode="true"
                                 :formData="schemePlannerObj">
            </busi-scheme-planner>
            <!--生产调度计划-->
            <busi-production-planner ref="$productionPlanner"
                                     :query-mode="true"
                                     :data="productionPlannerArr">
            </busi-production-planner>
        </div>
    </el-dialog>
</template>

<script>
  import BusiInspectionRequire from '@/components/business/BusiInspectionRequire'
  import BusiShipBaseInfoList from '@/components/business/BusiShipBaseInfoList'
  import BusiBillOfLoadingList from '@/components/business/BusiBillOfLoadingList'
  import BusiSchemePlanner from '@/components/business/BusiSchemePlanner'
  import BusiProductionPlanner from '@/components/business/BusiProductionPlanner '

  export default {
    name: 'homeOwnerAppThreeDialog',
    components: {
      BusiInspectionRequire,
      BusiShipBaseInfoList,
      BusiBillOfLoadingList,
      BusiSchemePlanner,
      BusiProductionPlanner
    },
    mixins: [],
    props: {},
    data() {
      return {
        title: '第三方作业管理',
        dialogVisible: true,
        popupType: 'add',
        editParams: null,
        schemePlannerObj: {},
        inspectionRequireObj: {},
        productionPlannerArr: [],
        orderArray: [],
        isSubmitDisabled: false,
        mode: false,
        isChecked: true
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
        let inspectionRequire = await this.$refs.$inspectionRequire.getBaseGenerateForm()
        if (!inspectionRequire) return
        let params = inspectionRequire
        params.isInspection = this.$refs.$inspectionRequire.getCheckboxStatus()
        params.shipingDateId = this.inspectionRequireObj.shippingFutureDateListVo ? this.inspectionRequireObj.shippingFutureDateListVo.shipingDateId : null
        params.inspectionId = this.inspectionRequireObj.shippingInspectionListVo ? this.inspectionRequireObj.shippingInspectionListVo.inspectionId : null
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
          let shippingInspectionListVo = response.data.shippingInspectionListVo
          let shippingFutureDateListVo = response.data.shippingFutureDateListVo
          // 商检需求信息
          this.inspectionRequireObj = response.data
          // 提货单信息
          this.orderArray = response.data.shippingDateOrderListVos
          // 方案计划
          this.schemePlannerObj = response.data.shippingLoadUnloadSchemeListVo
          // 调度计划
          this.productionPlannerArr = response.data.shippingLoadUnloadSchemeSchedulingListVos
          // 判断提交按钮的状态 更新保存和提交按钮的状态
          if (shippingFutureDateListVo && shippingFutureDateListVo.isInspection === 'YES_NO_1') {
            if (shippingInspectionListVo && (shippingInspectionListVo.inspectionRequirementApproveStatus === 'INSPECTION_STATUS_TYPE_4' || shippingInspectionListVo.inspectionRequirementApproveStatus === 'INSPECTION_STATUS_TYPE_3')) {
              this.isSubmitDisabled = this.isChecked = true
            } else {
              this.isSubmitDisabled = this.isChecked = false
            }
          } else {
            this.isSubmitDisabled = this.isChecked = false
          }
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
      },
      handleCheckStatus(checkStatus) {
        this.isChecked = checkStatus
      }
    }
  }
</script>
<style lang="less">
    .home-owner-three-wrap {
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #fff;
            border-color: #409EFF;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #fff
        }
        .el-checkbox {
            color: #fff;
            .el-checkbox__inner::after {
                border: 1px solid #409EFF;
                border-left: 0;
                border-top: 0;
            }
        }
    }
</style>
