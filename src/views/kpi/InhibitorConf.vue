<template>
    <div class="container">
        <main>
            <div class="searchForm">
                <el-form
                        :model="searchModel"
                        :inline="true">
                    <el-form-item
                            label="装置">
                        <el-select
                                v-model="searchModel.unitCode">
                            <el-option
                                    label="丙烯酸装置"
                                    value="Workshop"
                                    key="Workshop">
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
                    border="border"
                    :data="tableData"
                    size="small"
                    :row-class-name="rowClassName">
                <el-table-column
                        label="位号"
                        prop="Tag"></el-table-column>
                <el-table-column
                        label="起始液位"
                        prop="Start_Liquid">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                min="0"
                                v-model="scope.row.Start_Liquid"
                                v-if="scope.row.Twice_Conf === 1"></el-input>
                        <div v-else>
                            {{scope.row.Start_Liquid}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="终止液位"
                        prop="End_Liquid"></el-table-column>
                <el-table-column
                        label="溶质名称"
                        prop="Solute"></el-table-column>
                <el-table-column
                        label="溶质加入量"
                        prop="Solute_Add_Qly"></el-table-column>
                <el-table-column
                        label="溶质加入包量"
                        prop="Solute_Add_Sum"></el-table-column>
                <el-table-column
                        label="1%液位量">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model.number="scope.row.One_Liquid"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="每包溶质质量">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model="scope.row.Solute_One_Qly"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="理论加入质量"
                        prop="Solute_Theory_Qly"></el-table-column>
                <el-table-column
                        label="昨日结余"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="今日结余"
                        prop="Today__Surplus"></el-table-column>
            </el-table>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'InhibitorConf',
        data() {
            return {
                searchModel: {
                    inhibitorDate: null,
                    unitCode: null
                },
                tableData: [],
                btnDisabled: false,
            }
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
            changeValue(e, curRow) {
                let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
                if (!boolean) {
                    e.target.value = ''
                } else {
                    curRow.Start_Liquid = e.target.value
                    this.tableData.push(curRow)
                    console.log(this.tableData)
                    this.$http.put(vm.$API.updateInhibitor, this.$ET.toCollectionJson(this.tableData))
                        .then((res) => {
                            if (res === 'success') {
                                this.getList()
                            }
                        })
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
            getList() {
                if (!this.moment(this.searchModel.inhibitorDate).isBefore(this.moment())){
                    this.$T.warning('所选日期不可大于当前服务器日期');
                    return false
                }
                if (this.submitForm()) {
                    const loading = this.$loading()
                    this.$http.get(vm.$API.findInhibitor + "?inhibitorDate=" + this.searchModel.inhibitorDate).then((data) => {
                        if (data.length == 0) {
                            this.inhibitorDate()
                            loading.close()
                        } else {
                            data.forEach((item) => {
                                item.One_Liquid = Number(item.One_Liquid).toFixed(2)
                                item.Solute_Add_Sum = Math.round(item.Solute_Add_Sum)
                            })
                            this.tableData = data
                            loading.close()
                        }
                    })
                }
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
                    window.open(vm.$API.downExInhibitor + "?inhibitorDate=" + this.tableData[0].Date_Time)
                }
            },
            rowClassName(row, index) {
                if (row.row.Twice_Conf === 1) {
                    return 'Twice_Conf'
                }
            },
            //零点数据更新
            getUpdataData() {
                const date1 = new Date()
                date1.toLocaleDateString()
                date1.setHours(0)
                date1.setMinutes(0)
                date1.setSeconds(0)
                date1.setDate(date1.getDate() + 1)  //获取的到第二天凌晨的时间
                setTimeout(() => {
                    //   /KPIhy/initInhibitor?inhibitorDate=2019-3-12
                    this.$http.post(vm.$API.initInhibitor + `?inhibitorDate=${this.searchModel.inhibitorDate}`)
                        .then((res) => {
                            if (res === 'success') {
                                this.getList()
                                // this.getUpdataData()   //页面在零点更新完后重新设置更新
                            }
                        })
                }, date1.getTime() - new Date())
            }
        },
        created() {
            this.getUpdataData()
            this.searchModel.inhibitorDate = this.moment().format('YYYY-MM-DD')
            this.getList()
        }
    }
</script>
<style>
    .container {
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
</style>
