<template>
    <div>
         <el-table      @selection-change="handleSelectionChange" ref="multipleTable" class="tb-edit" :data="tableData"  highlight-current-row   @row-click="handleCurrentChange">
             <el-table-column
                     type="selection"
                     width="55">
             </el-table-column>
             <el-table-column label="操作" width="180px">
                 <template slot-scope="scope">
                     <el-button
                             size="mini"
                             type="danger"
                             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                 </template>
             </el-table-column>
             <el-table-column :label="item.label" :width="item.labelWidth"  v-for="item in colModel">

                 <template scope="scope">
                     <el-input   :disabled="item.disabled?item.disabled:false"   v-if="item.opts.type==='input'" size="small" v-model="scope.row[item.prop]" :placeholder="item.disabled?item.disabled==true?'':item.label:''" @change="handleEdit(scope.$index, scope.row)"></el-input>
                    <el-select   v-model="scope.row[item.prop]"   v-if="item.opts.type==='select'">
                        <el-option
                                v-for="option in item.opts.data"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value">
                        </el-option>

                    </el-select>

                     <span>{{getSpanText(scope.row[item.prop],item)}}</span>
                 </template>
             </el-table-column>
         </el-table>
    </div>
</template>

<script>
    import BasePage from "./BasePage";
    export default {
        name: 'BaseEditTable',
        components: {BasePage},
        props:{
            tableData:{
                type:Array
            },
            colModel:{
                type:Array
            }
        }, methods: {
            getSpanText(value,item){

                 if(item.opts.type==='select'){
                     const selectData=item.opts.data;
                     let  text
                     selectData.forEach((data)=>{
                         if(data.value===value)
                             text=data.label
                     })
                     return text

                 }
                 return value
            },
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$emit('ininle-delete',{index,row})
            },
             handleSelectionChange(val){
              this.$emit('checkAll',val)
            }

        },
        created(){
            this.$emit('enlarge-text',this.tableData)
        }
    }
</script>

<style scoped>
    .tb-edit .el-input {
        display: none
    }
    .tb-edit .el-select {
        display: none
    }
    .tb-edit .current-row .el-input {
        display: block
    }
    .tb-edit .current-row .el-select {
        display: block
    }
    .tb-edit .current-row .el-input+span {
        display: none
    }.tb-edit .current-row .el-select+span {
         display: none
     }
</style>