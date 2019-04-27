<template>
    <base-card :no-show="queryMode"
               :add-event="onCardAdd">
        <p slot="header">提货单信息</p>
        <el-table
                :data="OrderArr"
                highlight-current-row
                stripe
                style="width: 100%">
            <el-table-column prop="erpOrderId" label="ERP订单号"></el-table-column>
            <el-table-column prop="deliveryOrderId" label="ERP运单号"></el-table-column>
            <el-table-column prop="deliveryOrderTime" label="ERP运单时间"></el-table-column>
            <el-table-column prop="orderType" label="订单类型"></el-table-column>
            <el-table-column prop="orderCloseTime" label="订单截止日期" :formatter="formatterDate"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
            <el-table-column prop="materielCode" label="产品名称"></el-table-column>
            <el-table-column prop="goodsInfo" label="货物信息"></el-table-column>
            <el-table-column prop="orderCapacity" label="订单量"></el-table-column>
            <el-table-column prop="loadingCapacity" label="提货量" :render-header="handleLoadingCapacityLabel">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.loadingCapacity"
                                  @input="handleInput(scope.$index, scope.row.loadingCapacity)"></el-input>
                    </template>
                    <template v-else>{{ scope.row.loadingCapacity }}</template>
                </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="meteringResult" label="商检计量量" v-if="metering"
                             :render-header="handleMeteringResultLabel">
                <template slot-scope="scope">
                    <template v-if="!scope.row.edit && !meteringQueryMode && !queryMode">
                        <el-input v-model="scope.row.meteringResult"
                                  @input="handleMeteringInput(scope.$index, scope.row.meteringResult)">
                        </el-input>
                    </template>
                    <template v-else>{{ scope.row.meteringResult }}</template>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="订单备注"></el-table-column>
            <el-table-column label="操作" width="80" v-if="!queryMode && !metering">
                <template slot-scope="scope">
                    <div class="pcitc-icon-btns-wrap">
                        <i class="el-icon-delete pcitc-icon-danger"
                           @click="handleInlineDelete(scope.$index, scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--ERP内部弹出框-->
        <el-dialog
                class="pcitc-customer-dialog large"
                title="ERP销售订单信息"
                :visible.sync="innerVisible"
                :close-on-click-modal=false
                @close="handleInlineDialogCancel"
                append-to-body>
            <div class="pcitc-inline-dialog-body">
                <base-operate-panel>
                    <base-generate-search
                            :searchOpts="searchOpts"
                            @on-search="onSearch">
                    </base-generate-search>
                </base-operate-panel>
                <el-card>
                    <el-table
                            :data="ERPOrderArr"
                            highlight-current-row
                            stripe
                            style="width: 100%;text-align: left"
                            @selection-change="handleSelectionChange">
                        <el-table-column type="selection" align="center" width="40"></el-table-column>
                        <el-table-column prop="erpOrderId" label="ERP订单号"></el-table-column>
                        <el-table-column prop="deliveryOrderId" label="ERP运单号"></el-table-column>
                        <el-table-column prop="deliveryOrderTime" label="ERP运单时间"></el-table-column>
                        <el-table-column prop="orderType" label="订单类型"></el-table-column>
                        <el-table-column prop="orderCloseTime" label="订单截止日期"
                                         :formatter="formatterDate"></el-table-column>
                        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
                        <el-table-column prop="materielCode" label="产品名称"></el-table-column>
                        <el-table-column prop="goodsInfo" label="货物信息"></el-table-column>
                        <el-table-column prop="orderCapacity" label="订单量"></el-table-column>
                        <!--<el-table-column prop="loadingCapacity" label="提货量"></el-table-column>-->
                        <el-table-column prop="unit" label="单位"></el-table-column>
                        <el-table-column prop="remark" label="订单备注"></el-table-column>
                    </el-table>
                </el-card>
            </div>
            <div slot="footer">
                <el-button @click="handleInlineDialogCancel">关 闭</el-button>
                <el-button type="primary" @click="handleInlineDialogSave">保 存</el-button>
            </div>
        </el-dialog>
    </base-card>
</template>

<script>

  export default {
    name: 'BusiBillOfLoadingList',
    components: {},
    mixins: [],
    props: {
      addMode: Boolean,
      queryMode: Boolean,
      editMode: Boolean,
      data: Array,
      metering: Boolean,
      meteringQueryMode: Boolean
    },
    data() {
      return {
        searchOpts: [
          {
            label: '订单号',
            prop: 'erpOrderId',
            opts: {
              type: 'input',
              searchFilterItem: true
            }
          },
          {
            label: '供应商名称',
            prop: 'supplierName',
            opts: {
              type: 'input',
              searchFilterItem: true
            }
          },
          {
            label: '产品名称',
            prop: 'materielCode',
            opts: {
              type: 'input',
              searchFilterItem: true
            }
          }
        ],
        innerVisible: false,
        ERPOrderArr: [],
        OrderArr: [],
        multipleSelection: []
      }
    },
    computed: {},
    watch: {
      data: function(newVal) {
        this.OrderArr = newVal.map(o => {
          this.$set(o, 'edit', false)
          return o
        })
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleInput(index, input) {
        if (isNaN(input)) {
          this.$T.warning(this.$CONST.MSG_RULES_NUMBER)
          this.$set(this.OrderArr[index], 'loadingCapacity', '')
        }
      },
      handleMeteringInput(index, input) {
        if (isNaN(input)) {
          this.$T.warning(this.$CONST.MSG_RULES_NUMBER)
          this.$set(this.OrderArr[index], 'meteringResult', '')
        }
      },
      formatterDate(row, column, cellValue, index) {
        return this.$T.parseTime(cellValue, '{y}-{m}-{d} {h}:{i}')
      },
      handleInlineDialogCancel() {
        this.closeInlineDialog()
      },
      handleInlineDialogSave() {
        let multipleSelection = [...this.multipleSelection]
        multipleSelection = multipleSelection.map(o => {
          this.$set(o, 'edit', true)
          return o
        })
        this.OrderArr = [...this.OrderArr, ...multipleSelection]
        this.closeInlineDialog()
      },
      handleInlineDelete(index) {
        this.OrderArr.splice(index, 1)
      },
      handleInlineEdit(index) {
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
        this.getERPData(queryParams)
      },
      onCardAdd() {
        this.openInlineDialog()
        this.getERPData()
      },
      getERPData(params) {
        this.$http.get(this.$API.DLMS_GET_SHIPPING_ERP, params).then(response => {
          this.ERPOrderArr = response.data
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleLoadingCapacityLabel(h, o) {
        return h(
          'span',
          [
            h('span', {
              style: {
                color: 'red',
                fontSize: '14px',
                fontWeight: 800
              }
            }, ' * '),
            h('span', o.column.label)
          ]
        )
      },
      handleMeteringResultLabel(h, o) {
        return h(
          'span',
          [
            h('span', {
              style: {
                color: 'red',
                fontSize: '14px',
                fontWeight: 800
              }
            }, ' * '),
            h('span', o.column.label)
          ]
        )
      }
    }
  }
</script>
