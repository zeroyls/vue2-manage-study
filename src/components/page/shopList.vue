<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class = "table_container">
            <el-table 
                :data ="tableData">
                <el-table-column type = "expand" >
                    <template slot-scope = "props">
                        <el-form inline class = "demo-table-expand">
                            <el-form-item label = "店铺名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                            <el-form-item label = "店铺地址">
                                <span>{{props.row.address}} </span>
                            </el-form-item>
                            <el-form-item label = "店铺介绍">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="店铺ID">
                                <span>{{props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span>{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{ props.row.recent_order_num }}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="店铺名称"
                    prop = "name">
                </el-table-column>
                <el-table-column
                    label = "店铺地址"
                    prop="address">
                </el-table-column>
                <el-table-column
                    label="店铺介绍"
                    prop="description">
                </el-table-column>
                <el-table-column
                    label = "操作"
                    >
                    <template slot-scope = "props">
                        <el-button
                            size = "mini"
                            @click = "handleEdit(props.$index, props.row)">编辑</el-button>
                        <el-button
                            size = "mini"
                            type = "success"
                            @click = "addFood(props.$index, props.row)">添加食品</el-button>
                        <el-button
                            size = "mini"
                            type = "danger"
                            @click = "handleDelete(props.$index, props.row)">删除</el-button>  
                    </template>
                </el-table-column>
            </el-table>
            <div class = "Pagination">
                <el-pagination>
                </el-pagination>
            </div>
            <el-dialog title = "修改店铺信息" :visible.sync = "dialogFormVisible">
                <el-form :model = "selectedShop">
                    <el-form-item label = "店铺名称" label-width = "100px">
                        <el-input v-model = "selectedShop.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label = "详细地址" label-width = "100px">
                        <el-autocomplete
                            v-model = "selectedShop.address"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入地址"
                            style="width: 100%"
                            @select = "selectAddress"
                        ></el-autocomplete>
                        <span>当前城市：{{}}</span>
                    </el-form-item>
                    <el-form-item label = "店铺介绍" label-width = "100px">
                        <el-input v-model= "selectedShop.description"></el-input>
                    </el-form-item>
                    <el-form-item label = "联系电话" label-width = "100px">
                        <el-input v-model= "selectedShop.phone"></el-input>
                    </el-form-item>
                    <el-form-item label = "店铺分类" label-width = "100px">
                        <el-cascader
                            :options="categoryOptions"
                            v-model = "selectedCategory"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label = "商铺图片" label-width = "100px">
                        <!-- <el-upload
                            >
                        </el-upload> -->
                    </el-form-item>
                </el-form>
                <div slot = "footer" class = "dialog-footer">
                    <el-button @click = "dialogFormVisible = false"> 取消 </el-button>
                    <el-button type = "primary" @click = "updateShop"> 确定 </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import {cityGuess, getShops} from '@/api/getData'
import headTop from '../headTop'
export default {
    data(){
        return {
            city: {},
            tableData: [],
            limit:20,
            offset: 0,
            dialogFormVisible: false,
            selectedShop: {},//传入对话框的参数
            selectedCategory: {},//级联
            categoryOptions: [
                {
                    label:"一级菜单1",
                    value: "1",
                    children: [{
                        label: "11",
                        value: "11"
                    },{
                        label: "12",
                        value: "12"
                    }]
                },
                                {
                    label:"一级菜单2",
                    value: "2",
                    children: [{
                        label: "21",
                        value: "21"
                    },{
                        label: "22",
                        value: "22"
                    }]
                }
            ]
        }
    },
    created(){
        this.initData();
    },
    methods: {
        async initData(){
            try{
                const res = await cityGuess();
                if(res.error_code === 0){
                    this.city = res.cityInfo;
                }
                await this.getShops();
            }catch(err ){
                console.log(err)
            }
        },
        async getShops(){
            try{
                const {latitude, longitude} = this.city;
                const {limit, offset} = this;
                const res = await getShops({
                    latitude,
                    longitude,
                    limit,
                    offset
                });
                if(res.error_code === 0){
                    this.tableData = res.restaurants;
                }
            }catch(err ){
                this.$message({
                    type:'error',
                    message: '获取店铺列表错误'
                })
            }
        },
        // 表格的方法
        handleEdit(index, row){
            this.dialogFormVisible = true;
            this.selectedShop = row;
        },
        addFood(index, row){

        },
        handleDelete(index, row){

        },


        //对话框里的方法
        querySearchAsync(queryString, cb){
            console.log(queryString);
            cb([
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
            ])
        },

        selectAddress(item){
            console.log(item)
        },

        updateShop(){
            this.dialogFormVisible = false;
        }
    },
    components: {
        headTop
    }
}
</script>

<style lang="less">
    @import '../../style/mixin';
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