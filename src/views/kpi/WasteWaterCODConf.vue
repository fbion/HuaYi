<template>
    <div class="container">
        <main>
            <div class="searchForm">
                <div class="tool">
                    <el-button
                            type="danger"
                            @click="calculate"
                            :disabled="btnDisabled">
                        计算
                    </el-button>
                </div>
            </div>
            <el-table
                    class="tableList"
                    border="border"
                    :data="tableData"
                    size="small">
                <el-table-column
                        label="罐位号"
                        prop="Tag"></el-table-column>
                <el-table-column
                        label="起始液位">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model.number="scope.row.One_Liquid"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="目标质量"
                        prop="Solute_Theory_Qly"></el-table-column>
                <el-table-column
                        label="可配置质量"
                        prop="Solute_Theory_Qly"></el-table-column>
                <el-table-column
                        label="目标COD">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model.number="scope.row.One_Liquid"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="161T01罐COD">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model.number="scope.row.One_Liquid"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="161T04罐COD">
                    <template
                            scope="scope">
                        <el-input
                                @blur="changeValue($event,scope.row)"
                                type="number"
                                v-model.number="scope.row.One_Liquid"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        label="添加161T01量"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="配置161T01后质量"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="配置161T01后液位"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="添加161T04量"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="配置161T04后质量"
                        prop="Yesterday_Surplus"></el-table-column>
                <el-table-column
                        label="配置161T04后液位"
                        prop="Yesterday_Surplus"></el-table-column>
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
            changeValue(e,curRow) {  //编辑后保存数据
                let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
                if (!boolean) {
                    e.target.value = ''
                }else{
                    curRow.Start_Liquid = e.target.value
                    this.tableData.push(curRow)
                    console.log(this.tableData)
                    this.$http.put(vm.$API.updateInhibitor,this.$ET.toCollectionJson(this.tableData))
                        .then((res)=>{
                            if(res === 'success'){
                                this.getList()
                            }
                        })
                }
            },
            calculate() {  //计算
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
            getList() {  //获取初始化数据
                if (!this.moment(this.searchModel.inhibitorDate).isBefore(this.moment())) {
                    this.$T.warning('所选日期不可大于当前服务器日期');
                    return false
                }
                if (this.submitForm()) {
                    const loading = this.$loading()
                    this.$http.get(vm.$API.findInhibitor + "?inhibitorDate=" + this.searchModel.inhibitorDate).then((data) => {
                        if (data.length == 0)
                            this.inhibitorDate()
                        else {
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
            submitForm() {  //验证所选日期是否超过当前日期
                if (this.searchModel.inhibitorDate == null) {
                    this.$T.warning('请选择时间');
                    return false
                }
                return true
            },
        },
        created() {
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
        float:right;
    }
    .container  .tableList{
        /*width: 100%;*/
        /*overflow:scroll;*/
    }
    /*
    width: 100%;
    overflow-x:scroll;
    */
</style>
