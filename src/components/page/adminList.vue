<template>
    <div>
        <head-top></head-top>
        <div>
            <el-table
                :data = "tableData">
                <el-table-column
                    label = "姓名"
                    prop = "user_name">
                </el-table-column>
                <el-table-column
                    label = "注册日期"
                    prop = "create_time">
                </el-table-column>
                <el-table-column
                    label = "地址"
                    prop = "city">
                </el-table-column>
                <el-table-column
                    label = "权限"
                    prop = "admin">
                </el-table-column>
            </el-table>
            <div>
                <el-pagination>
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
            tableData: []
        }
    },
    components: {
        headTop
    }
}
</script>