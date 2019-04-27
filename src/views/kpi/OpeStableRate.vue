<template>
    <div class="OpeStableRate">
        <main>
            <div class="searchForm">
                <el-form
                        :model="searchModel"
                        :inline="true">
                    <el-form-item
                            label="装置">
                        <el-select
                                clearable
                                v-model="searchModel.unitCode">
                            <el-option
                                    label="丙烯酸装置"
                                    value="qwe">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            label="日期"
                            required>
                        <el-date-picker
                                @change="dateChange"
                                value-format='yyyy-MM-dd'
                                v-model="searchModel.inhibitorDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item
                            label="班次">
                        <el-select
                                clearable
                                v-model="searchModel.Shift">
                            <el-option
                                    label="白班"
                                    value="DayShiftStartTime"
                                   ></el-option>
                            <el-option
                                    label="夜班"
                                    clearable
                                    value="NightShiftStartTime"
                                   ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            label="单元">
                        <el-select
                                clearable
                                v-model="searchModel.Prdt_Cell_Code">
                            <el-option
                                    label="全部"
                                    value="*全*部*"></el-option>
                            <el-option
                                    label="单元一"
                                    value="dy1"></el-option>
                            <el-option
                                    label="单元二"
                                    value="dy2"></el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                                @click="getList">
                            查询
                        </el-button>
                    </el-form-item>
                </el-form>
                <div class="tool">
                    <el-button
                            type="danger"
                            @click="calculate"
                            :disabled="btnDisabled">
                        计算
                    </el-button>
                    <el-button
                            @click="downExInhibitor">
                        导出
                    </el-button>
                </div>
            </div>
            <el-table
                    :data="tableData"
                    border
                    @expand-change="expandTable"
                    style="width: 100%">
                <el-table-column
                        label="装置"
                        prop="unitCode">
                </el-table-column>
                <el-table-column
                        type="expand">
                    <template
                            slot-scope="props">
                        <el-table
                                :data="props.row.Prdt_Cell_Code_arr"
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="操作"
                                    width="180">
                                <template>
                                    <div>
                                        <el-button
                                                type="text"
                                                @click="openCPKdialog()">
                                            指标CPK记录
                                        </el-button>
                                        <el-button
                                                type="text"
                                                @click="openQSdialog()">
                                            趋势
                                        </el-button>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="Index_Name"
                                    label="操作指标"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="Start_Time"
                                    label="开始时间">
                            </el-table-column>
                            <el-table-column
                                    prop="End_Time"
                                    label="结束时间">
                            </el-table-column>

                            <el-table-column
                                    prop="CPK_Score"
                                    label="指标CPK得分">
                            </el-table-column>
                            <el-table-column
                                    prop="Level"
                                    label="指标CPK评级">
                            </el-table-column>
                            <el-table-column
                                    prop="Grade"
                                    label="重要程度">
                            </el-table-column>
                            <el-table-column
                                    prop="Weight"
                                    label="权重">
                            </el-table-column>
                            <el-table-column
                                    prop="Des"
                                    label="描述">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                        label="单元"
                        prop="Prdt_Cell_Name">
                </el-table-column>
                <el-table-column
                        label="日期"
                        prop="Start_Time">
                </el-table-column>
                <el-table-column
                        label="班次"
                        prop="Shift">
                </el-table-column>
                <el-table-column
                        label="班组"
                        prop="Team_Group">
                </el-table-column>
                <el-table-column
                        label="操作平稳率"
                        prop="Stable_Rate">
                </el-table-column>
            </el-table>
            <!--指标CPK记录对话框-->
            <el-dialog
                    title="指标CPK记录"
                    :visible.sync="dialogCPKVisible">
                <div>
                    内容
                </div>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button
                            @click="dialogCPKVisible = false">
                        取消
                    </el-button>
                    <el-button
                            type="primary"
                            @click="dialogCPKVisible = false">
                        确定
                    </el-button>
                </div>
            </el-dialog>

            <!--趋势对话框-->
            <el-dialog
                    title="趋势"
                    :visible.sync="dialogQSVisible">
                <div>
                    内容
                </div>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button
                            @click="dialogQSVisible = false">
                        取消
                    </el-button>
                    <el-button
                            type="primary"
                            @click="dialogQSVisible = false">
                        确定
                    </el-button>
                </div>
            </el-dialog>
        </main>
    </div>
</template>

<script>
    export default {
        name: "OpeStableRate",
        data() {
            return {
                tableData: [
                    {
                        unitCode: '丙烯酸装置',
                        Prdt_Cell_Name: '单元名称',
                        Prdt_Cell_Code:'',
                        Prdt_Cell_Code_arr: [],
                        Start_Time: '日期',
                        Shift: '班次',
                        Team_Group: '班组',
                        Stable_Rate: '平稳率'
                    }
                ],
                searchModel: {
                    unitCode: '',
                    inhibitorDate: '',
                    Shift: 'NightShiftStartTime',
                    Prdt_Cell_Code: '*全*部*'

                },
                btnDisabled: false,
                dialogCPKVisible: false,
                dialogQSVisible: false,
            }
        },
        created() {
            this.$http.get(vm.$API.findOpeStableRate+`?Prdt_Cell_Code=${this.searchModel.Prdt_Cell_Code}&findTime=${this.searchModel.inhibitorDate}&shiftCode=${this.searchModel.Shift}`)
                .then((res) => {
                    console.log(res)
                    res.forEach((item) => {
                        item.unitCode = '丙烯酸装置'
                        item.Prdt_Cell_Code_arr = []
                    })
                    this.tableData = res
                })
            this.searchModel.inhibitorDate = this.moment().format('YYYY-MM-DD')

        },
        methods: {
            dateChange(val) {
                let nowDate = this.moment().format('YYYY-MM-DD')
                var selectDate = this.moment(val).format('YYYY-MM-DD')
                if (this.moment(selectDate).isBefore(this.moment(nowDate))) {
                    this.btnDisabled = true
                } else {
                    this.btnDisabled = false
                }
            },
            changeValue(e) {
                let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
                if (!boolean) {
                    e.target.value = ''
                }
            },
            getList() {
                if (!this.moment(this.searchModel.inhibitorDate).isBefore(this.moment())) {
                    this.$T.warning('所选日期不可大于当前服务器日期');
                    return false
                }
                this.$http.get(vm.$API.findOpeStableRate + `?Prdt_Cell_Code=${this.searchModel.Prdt_Cell_Code}&findTime=${this.searchModel.inhibitorDate}&shiftCode=${this.searchModel.Shift}`)
                    .then((res) => {
                        console.log(res)
                        res.forEach((item) => {
                            item.unitCode = '丙烯酸装置'
                        })
                        this.tableData = res
                    })
            },
            submitForm() {
                if (this.searchModel.inhibitorDate == null) {
                    this.$T.warning('请选择时间');
                    return false
                }
                return true
            },
            downExInhibitor() {
                if (this.submitForm()) {
                    window.open(vm.$API.downOpeStableRate + `?Prdt_Cell_Code=${this.searchModel.Prdt_Cell_Code}&findTime=${this.searchModel.inhibitorDate}&shiftCode=${this.searchModel.Shift}`)
                }
            },
            calculate() {
                if (this.submitForm()) {
                    const loading = this.$loading()
                    this.$http.put(vm.$API.calculateInhibitor + `?inhibitorDate=${this.searchModel.inhibitorDate}`)
                        .then((res) => {
                            if (res === 'success') {
                                this.getList()
                                loading.close()
                                this.$T.success('计算成功')
                            }
                        })
                }
            },
            rowClassName(row, index) {
                if (row.row.Twice_Conf === 1) {
                    return 'Twice_Conf'
                }
            },
            openCPKdialog() {//打开指标CPK记录对话框
                this.dialogCPKVisible = true
            },
            openQSdialog() {//打开趋势话框
                this.dialogQSVisible = true
            },
            expandTable(row,expandedRows){ //展开或者关闭的表格展开行
                // console.log(row, expandedRows)
                console.log(this.searchModel.Prdt_Cell_Code)
                console.log(this.searchModel.inhibitorDate)
                console.log(this.searchModel.Shift)
                console.log(row)

                row.Start_Time = this.moment(row.Start_Time).format('YYYY-MM-DD')
                this.$http.get(vm.$API.findOpeStableRateCPK + `?Prdt_Cell_Code=${this.searchModel.Prdt_Cell_Code}&findTime=${this.searchModel.inhibitorDate}&Shift=${this.searchModel.Shift}`)
                    .then((res) => {
                        res.forEach((item)=>{
                            item.End_Time = this.moment(item.End_Time).format('YYYY-MM-DD')
                            item.Start_Time = this.moment(item.Start_Time).format('YYYY-MM-DD')
                        })
                        row.Prdt_Cell_Code_arr = res
                    })
                if(expandedRows.length>1){
                    expandedRows.shift();
                }
            }
        }
    }
</script>

<style>
    .OpeStableRate {
        background: #E9E9EC;
        /*height: 100vh;*/
        width: 100%;
        padding: 10px;

    }

    main {
        background: white;
        margin: 10px;
        padding: 10px;
    }

    .searchForm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    tbody .Twice_Conf {
        background: #FEF9DE;
    }

    .OpeStableRate .el-table__expanded-cell[class*=cell] {
        padding: 0;
    }

</style>
