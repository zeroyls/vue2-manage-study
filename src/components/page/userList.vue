<template>
    <div class = "fillcontain">
        <head-top></head-top>
        <div class = "table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type = "index"
                    width = "100">
                </el-table-column>
                <el-table-column
                    property = "registe_time"
                    label = "注册日期"
                    width = "220">
                </el-table-column>
                <el-table-column
                    property = "username"
                    label = "用户姓名"
                    width = "220">
                </el-table-column>
                <el-table-column
                    property = "city"
                    label = "注册地址">
                </el-table-column>
            </el-table>
            <div class = "pagination" style = "text-align: left; margin-top: 10px">
                <el-pagination
                layout="total, prev, pager, next"
                :current-page = "currentPage"
                :page-size="20"
                :total = "count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import headTop from '../headTop'
export default {
    data(){
        return {
            tableData: [{
                registe_time: '2016-05-02',
                username: '王小虎',
                city: '上海市普陀区金沙江路 1518 弄'
            }, {
                registe_time: '2016-05-04',
                username: '王小虎',
                city: '上海市普陀区金沙江路 1517 弄'
            }, {
                registe_time: '2016-05-01',
                username: '王小虎',
                city: '上海市普陀区金沙江路 1519 弄'
            }, {
                registe_time: '2016-05-03',
                username: '王小虎',
                city: '上海市普陀区金沙江路 1516 弄'
            }],
            currentRow: 1,
            offset: 0,
            limit: 20,
            count: 4,
            currentPage: 1
        }
    },

    components: {
        headTop
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/mixin.less';
    .table_container{
        padding: 20px
    }
</style>