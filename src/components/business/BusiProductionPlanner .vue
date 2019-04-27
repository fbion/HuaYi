<template>
    <base-card :no-show="queryMode"
               :add-event="onCardAdd">
        <p slot="header">生产调度计划</p>
        <el-table
                :data="productionPlannerArr"
                highlight-current-row
                stripe
                style="width: 100%">
            <el-table-column prop="commandId" label="指令ID"></el-table-column>
            <el-table-column prop="dispatchCommandId" label="调度指令系统中的ID"></el-table-column>
            <el-table-column prop="commandCode" label="指令编码"></el-table-column>
            <el-table-column prop="schedulingTypeCode" label="指令类型编码"></el-table-column>
            <el-table-column prop="schedulingTypeName" label="指令类型名称"></el-table-column>
            <el-table-column prop="schedulingCreateTime" label="指令下达时间"></el-table-column>
            <el-table-column prop="schedulingId" label="调度计划Id"></el-table-column>
            <el-table-column prop="schedulingContent" label="调度内容"></el-table-column>
            <el-table-column prop="schedulingUserId" label="调度员"></el-table-column>
            <el-table-column prop="schedulingUserTel" label="联系方式"></el-table-column>
            <el-table-column prop="schedulingBeginTime" label="调度开始时间"></el-table-column>
            <el-table-column prop="schedulingEndTime" label="调度结束时间"></el-table-column>
            <el-table-column prop="berthCode" label="泊位"></el-table-column>
            <el-table-column prop="materialCode" label="物料"></el-table-column>
            <el-table-column label="操作" width="80" v-if="!queryMode">
                <template slot-scope="scope">
                    <div class="pcitc-icon-btns-wrap">
                        <i class="el-icon-delete pcitc-icon-danger"
                           @click="handleInlineDelete(scope.$index, scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--生产调度作业计划 内部弹窗-->
        <el-dialog
                class="pcitc-customer-dialog large"
                title="生产调度作业计划"
                :visible.sync="innerVisible"
                :close-on-click-modal=false
                @close="handleInlineDialogCancel"
                append-to-body>
            <div class="pcitc-inline-dialog-body">
                <base-operate-panel>
                  <div class="buttons-scope-wrap">
                    <el-button type="primary" @click="handleInnerTableAdd">接收</el-button>
                  </div>
                  <base-generate-search
                          :searchOpts="searchOpts"
                          @on-search="onSearch">
                  </base-generate-search>
                </base-operate-panel>
                <el-card>
                    <el-table
                            :data="ODSProductionPlannerArr"
                            highlight-current-row
                            stripe
                            height="400"
                            style="width: 100%;text-align: left"
                            @selection-change="handleSelectionChange">
                        <el-table-column type="selection" align="center" width="40"></el-table-column>
                        <el-table-column prop="dispatchCommandId" label="调度指令系统中的ID"></el-table-column>
                        <el-table-column prop="commandCode" label="指令编码"></el-table-column>
                        <el-table-column prop="schedulingTypeCode" label="指令类型编码"></el-table-column>
                        <el-table-column prop="schedulingTypeName" label="指令类型名称"></el-table-column>
                        <el-table-column prop="schedulingCreateTime" label="指令下达时间"></el-table-column>
                        <el-table-column prop="schedulingId" label="调度计划Id"></el-table-column>
                        <el-table-column prop="schedulingContent" label="调度内容"></el-table-column>
                        <el-table-column prop="schedulingUserId" label="调度员"></el-table-column>
                        <el-table-column prop="schedulingUserTel" label="联系方式"></el-table-column>
                        <el-table-column prop="schedulingBeginTime" label="调度开始时间" :formatter="formatterDate"></el-table-column>
                        <el-table-column prop="schedulingEndTime" label="调度结束时间" :formatter="formatterDate"></el-table-column>
                        <el-table-column prop="berthCode" label="泊位"></el-table-column>
                        <el-table-column prop="materialCode" label="物料"></el-table-column>
                    </el-table>
                </el-card>
            </div>
            <div slot="footer">
                <el-button @click="handleInlineDialogCancel">关 闭</el-button>
                <el-button type="primary" @click="handleInlineDialogSave">保 存</el-button>
            </div>
        </el-dialog>

        <!--生产调度作业计划 页面新增弹窗-->
        <el-dialog
                class="pcitc-customer-dialog large"
                title="新增生产调度作业计划"
                :visible.sync="innerAddVisible"
                :close-on-click-modal=false
                @close="handleInlineAddDialogCancel"
                append-to-body>
            <div class="pcitc-inline-dialog-body">
                <el-card>
                    <el-table
                            :data="moreODSProductionPlannerArr"
                            highlight-current-row
                            stripe
                            height="300"
                            style="width: 100%;text-align: left"
                            @selection-change="handleAddSelectionChange"
                            >
                        <el-table-column type="selection" align="center" width="40"></el-table-column>
                        <el-table-column prop="dispatchCommandId" label="调度指令系统中的ID"></el-table-column>
                        <el-table-column prop="commandCode" label="指令编码"></el-table-column>
                        <el-table-column prop="schedulingTypeCode" label="指令类型编码"></el-table-column>
                        <el-table-column prop="schedulingTypeName" label="指令类型名称"></el-table-column>
                        <el-table-column prop="schedulingCreateTime" label="指令下达时间"></el-table-column>
                        <el-table-column prop="schedulingId" label="调度计划Id"></el-table-column>
                        <el-table-column prop="schedulingContent" label="调度内容"></el-table-column>
                        <el-table-column prop="schedulingUserId" label="调度员"></el-table-column>
                        <el-table-column prop="schedulingUserTel" label="联系方式"></el-table-column>
                        <el-table-column prop="schedulingBeginTime" label="调度开始时间" :formatter="formatterDate"></el-table-column>
                        <el-table-column prop="schedulingEndTime" label="调度结束时间" :formatter="formatterDate"></el-table-column>
                        <el-table-column prop="berthCode" label="泊位"></el-table-column>
                        <el-table-column prop="materialCode" label="物料"></el-table-column>
                    </el-table>
                </el-card>
            </div>
            <div slot="footer">
                <el-button @click="handleInlineAddDialogCancel">关 闭</el-button>
                <el-button type="primary" @click="handleInlineAddDialogSave">保 存</el-button>
            </div>
        </el-dialog>
    </base-card>
</template>

<script>
  export default {
    name: 'BusiProductionPlanner',
    components: {},
    mixins: [],
    props: {
      addMode: Boolean,
      queryMode: Boolean,
      editMode: Boolean,
      data: Array
    },
    data() {
      return {
        searchOpts: [
          {
            label: '调度计划ID',
            prop: 'schedulingId',
            hide: true,
            opts: {
              type: 'input'
            }
          },
          {
            label: '方案ID',
            prop: 'schemeId',
            hide: true,
            opts: {
              type: 'input'
            }
          },
          {
            label: '调度内容',
            prop: 'schedulingContent',
            opts: {
              type: 'input',
              searchFilterItem: true
            }
          },
          {
            label: '调度时间',
            prop: 'schedulingBeginTime',
            width: '135',
            format: '{y}-{m}-{d} {h}:{i}',
            opts: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm',
              valueFormat: 'yyyy-MM-dd HH:mm:ss',
              searchFilterItem: true
            }
          }
        ],
        innerVisible: false,
        ODSProductionPlannerArr: [],
        productionPlannerArr: [],
        innerAddVisible: false,
        moreODSProductionPlannerArr: [],
        moreSelectionArr: []
      }
    },
    computed: {
    },
    watch: {
      data: function(newVal) {
        this.productionPlannerArr = newVal
      }
    },
    created() {},
    mounted() {},
    methods: {
      formatterDate(row, column, cellValue, index) {
        return this.$T.parseTime(cellValue, '{y}-{m}-{d} {h}:{i}')
      },
      handleInlineDialogCancel() {
        this.closeInlineDialog()
      },
      handleInlineDialogSave() {
        let multipleSelection = [...this.multipleSelection]
        this.productionPlannerArr = multipleSelection
        this.closeInlineDialog()
      },
      openInlineDialog() {
        this.innerVisible = true
      },
      closeInlineDialog() {
        this.multipleSelection = []
        setTimeout(() => {
          this.innerVisible = false
        }, 50)
      },
      onSearch(queryParams) {
        this.getODSData(queryParams)
      },
      onCardAdd() {
        this.openInlineDialog()
        this.getODSData()
      },
      getODSData(params) {
        this.$http.get(this.$API.DLMS_GET_SHIPPING_SCHEDULING_LIST, params).then(response => {
          this.ODSProductionPlannerArr = response.data
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleInlineDelete(index) {
        this.productionPlannerArr.splice(index, 1)
      },
      handleInnerTableAdd() {
        this.innerAddVisible = true
        this.getMoreODSData()
      },
      getMoreODSData(params) {
        this.$http.get(this.$API.DLMS_GET_SHIPPING_SCHEME_ODS_LIST, params).then(response => {
          this.moreODSProductionPlannerArr = response.data
        })
      },
      handleAddSelectionChange(val) {
        this.moreSelectionArr = val
      },
      handleInlineAddDialogCancel() {
        this.moreSelectionArr = []
        setTimeout(() => {
          this.innerAddVisible = false
        }, 50)
      },
      handleInlineAddDialogSave() {
        let moreSelection = [...this.moreSelectionArr]
        moreSelection.forEach((item, index) => {
          item.schedulingId = null
        })
        this.$http.$service({
          url: this.$API.DLMS_POST_SHIPPING_SCHEDULING,
          method: 'post',
          data: moreSelection
        }).then(response => {
          this.$T.success()
          this.getODSData()
        }).catch(() => {
        })
        this.handleInlineAddDialogCancel()
      }

    }
  }
</script>
