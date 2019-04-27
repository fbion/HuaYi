<template>
    <base-page class="demo-wrap">
        <el-table
                :data="tableData3"
                style="width: 100%"
                height="250">
            <el-table-column label="#" type="index" align="left" width="40"></el-table-column>
            <el-table-column
                    fixed
                    prop="date"
                    label="日期"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="province"
                    :formatter="formatDate"
                    label="省份">

            </el-table-column>
            <el-table-column
                    prop="city"
                    label="市区">

            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">

            </el-table-column>
            <el-table-column
                    prop="zip"
                    label="邮编">

            </el-table-column>
        </el-table>
        <el-form :model="ruleForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                    label="年龄"
                    prop="value5"
                    :rules="[
                          { required: true, message: '年龄不能为空'}
                        ]"
            >
                <el-select v-model="ruleForm.value5" multiple placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </base-page>
</template>

<script>

  export default {
    name: 'test',
    mixins: [],
    props: {},
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        ruleForm: {
          value5: []
        }
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
//      formatDate(row, column, cellValue) {
//        //return row.date == "2016-05-04" ? '男' : row.sex == 0 ? '女' : '未知';
//        //格式化是针对表格内容即使data数据
//        var newDate = row.date == '' ? '-' : row.date.replace(/-/g, '/')
//        let html = '<a>' + newDate + '</a>'
//        return html
//      }
      formatDate(row, column, cellValue, index) {
      }
    }
  }
</script>

<style lang="less">
    /*@import '../styles/var/variable';*/

    .demo-wrap {

    }
</style>
