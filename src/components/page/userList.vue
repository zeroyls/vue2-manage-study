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
                    :total = "count"
                    @size-change = "handleSizeChange"
                    @current-change = "handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import headTop from '../headTop'
import {getUserList, getUserCount} from '@/api/getData'
export default {
    data(){
        return {
            tableData: [],
            currentRow: 1,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1
        }
    },

    created(){
        this.initData()
    },

    methods: {
        async initData(){
            try{
                const countRes = await getUserCount();
                if(countRes.error_code === 0){
                    this.count = countRes.count;
                }else{
                    throw new Error('获取数据失败');
                }
                this.getUsers();
            }catch(err ){
                console.log(err)
            }
        },
        async getUsers(){
            const usersRes = await getUserList({offset: this.offset, limit:this.limit});
            this.tableData = [];
            if(usersRes.error_code === 0){
                const users = usersRes.users;
                users.forEach(item => {
                    const user = {};
                    user.username = item.username;
                    user.registe_time = item.registe_time;
                    user.city = item.city;
                    this.tableData.push(user);
                });
                this.tableData = usersRes.users;
            }
        },

        handleSizeChange(val){
            console.log(`每页${val}条`)
        },

        handleCurrentChange(val){
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getUsers();
        }

    },

    components: {
        headTop
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px
    }
</style>