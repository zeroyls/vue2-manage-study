<template>
    <div>
        <head-top></head-top>
        <div class = "table_container">
            <el-table
                :data = "tableData"
                >
                <el-table-column type = "expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class = "demo-table-expand">
                            <el-form-item label = "食品名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                            <el-form-item label = "餐馆名称">
                                <span>{{props.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label = "食品ID">
                                <span>{{props.row.item_id}}</span>
                            </el-form-item>
                            <el-form-item label = "餐馆ID">
                                <span>{{props.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label = "食品介绍">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                            <el-form-item label = "食品评分">
                                <span>{{props.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label = "食品分类">
                                <span>{{props.row.category_name}}</span>
                            </el-form-item>
                            <el-form-item label = "月销量">
                                <span>{{props.row.month_sales}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label = "食品名称"
                    prop = "name">
                </el-table-column>
                <el-table-column
                    label = "食品介绍"
                    prop = "description">
                </el-table-column>
                <el-table-column
                    label = "评分"
                    prop = "rating">
                </el-table-column>
                <el-table-column
                    label = "操作">
                    <template slot-scope="props">
                        <el-button 
                            size = "small"
                            @click = "handleEdit(props.row)">编辑
                        </el-button>
                        <el-button
                            size = "small"
                            type = "danger"
                            @click = "handleDelete(props.$index, props.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class = "Pagination">
                <el-pagination>
                </el-pagination>
            </div>
            <!-- 对话框 -->
            <el-dialog title = "修改食品信息"  :visible.sync = "dialogFormVisible">
                <el-form :model = "selectedFood">
                    <el-form-item label = "食品名称"  label-width = "100px">
                        <el-input v-model = "selectedFood.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label = "食品介绍" label-width = "100px">
                        <el-input v-model = "selectedFood.description" ></el-input>
                    </el-form-item>
                    <el-form-item label = "食品分类" label-width="100px">
                    </el-form-item>
                    <el-form-item label = "食品图片" label-width="100px">
                    </el-form-item>
                </el-form>
                <el-row >
                    <el-table
                        :data = "specs"
                        >
                        <el-table-column
                            prop = "specs"
                            label = "规格">
                        </el-table-column>
                        <el-table-column
                            prop = "packing_fee"
                            label = "包装费">
                        </el-table-column>
                        <el-table-column
                            prop = "price"
                            label = "价格">
                        </el-table-column>
                        <el-table-column label = "操作">
                            <template slot-scope = "props">
                                <el-button
                                    type = "danger"
                                    size = "small"
                                    @click = "deleteSpecs(props.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type = "primary" @click = "specsFormVisible = true">
                        添加规格
                    </el-button>
                    
                </el-row>
                <div slot = "footer" class = "dialog-footer">
                    <el-button @click = "dialogFormVisible = false">取消</el-button>
                    <el-button type = "primary" @click = "updateFood">确定</el-button>
                </div>
            </el-dialog>

            <el-dialog title = "添加规格" :visible.sync = "specsFormVisible">
                <el-form :model = "specsForm" :rules = "specsFormrules">
                    <el-form-item label = "规格" label-width = "100px" prop = "specs">
                        <el-input v-model = "specsForm.specs" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label = "包装费" label-width = "100px">
                        <el-input-number v-model = "specsForm.packing_fee" :min = "0" :max = "100"></el-input-number>
                    </el-form-item>
                    <el-form-item label = "价格" label-width = "100px">
                        <el-input-number v-model = "specsForm.price" :min = "0" :max = "10000"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot = "footer" class = "dialog-footer">
                    <el-button @click = "specsFormVisible = false">取消</el-button>
                    <el-button type = "primary" @click = "addspecs">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import headTop from '../headTop'
export default {
    data(){
        return {
            tableData: [{
                name: "食品1",
                restaurant_name: "餐馆1",
                item_id: 1,
                restaurant_id: 1,
                description: "介绍",
                restaurant_address: "xxx路",
                rating: 5,
                category_name: "川菜",
                month_sales: 100
            }],
            dialogFormVisible: false,
            selectedFood: {},

            specs: [{
                specs: "",
                packing_fee: 10,
                price: 3

            }],

            specsForm: {
                specs: "",
                packing_fee: 10,
                price: 3

            },
            specsFormrules: {
                specs: [{required: true, message: '请输入规格', trigger: 'blur'}]
            },
            specsFormVisible: false
        }
    },
    methods: {
        handleEdit(index){
            this.dialogFormVisible = true;
        },
        handleDelete(index, row){

        },
        updateFood(){

        },
        deleteSpecs(){

        },
        addspecs(){
            this.specsFormVisible = false
        }
    },
    components: {
        headTop
    }
}
</script>

<style lang="less" scoped>
    @import '../../style/mixin.less';
    .demo-table-expand{
        font-size: 0;
        label{
            width: 90px;
            color: #99a9bf;
        }
        .el-form-item{
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

    }
</style>