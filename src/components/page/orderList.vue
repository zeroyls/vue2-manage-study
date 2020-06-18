<template>
    <div>
        <head-top></head-top>
        <div class = "table_container">
            <el-table
                :data = "tableData"
                >
                <el-table-column 
                    type = "expand">
                    <template slot-scope = "props">
                        <el-form label-position="left" inline class = "demo-table-expand">
                            <el-form-item label = "用户名">
                                <span>{{props.row.user_name}}</span>
                            </el-form-item>
                        </el-form>
                        <el-form-item label = "店铺名称">
                            <span>{{props.row.restaurant_name}}</span>
                        </el-form-item>
                        <el-form-item label = "收货地址">
                            <span>{{props.row.address}}</span>
                        </el-form-item>
                        <el-form-item label = "店铺ID">
                            <span>{{props.row.restaurant_id}}</span>
                        </el-form-item>
                        <el-form-item label = "店铺地址">
                            <span>{{props.row.restaurant_address}}</span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                    label = "订单ID"
                    prop = "id">
                </el-table-column>
                <el-table-column
                    label = "总价格"
                    prop = "total_amount">
                </el-table-column>
                <el-table-column
                    label = "订单状态"
                    prop = "status">
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

<style lang="less">
	@import '../../style/mixin.less';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>