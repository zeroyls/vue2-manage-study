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
                <el-pagination
                    @size-change = "handleSizeChange"
                    @current-change = "handleCurrentChange"
                    :current-page = "currentPage"
                    :page-size = "20"
                    layout = "total, prev, pager, next"
                    :total = "count">
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
                            @select = "addressSelect"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
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
                        <el-upload
                            class = "avatar-uploader"
                            :action = "baseUrl + '/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success = "handleServiceAvatarSuccess"
                            :before-upload = "beforeAvatarUpload"
                            >
                            <img v-if = "selectedShop.image_path" :src = "baseImgPath + selectedShop.image_path" class = "avatar">
                            <i v-else class = "el-icon-plus avartar-uploader-icon"></i>
                        </el-upload>
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
import {cityGuess, searchplace, listShopCategory, getShops, getShopsCount, updateShop, deleteShop} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'
import headTop from '../headTop'
export default {
    data(){
        return {
            baseUrl,
            baseImgPath,
            city: {},
            tableData: [],
            limit:20,
            offset: 0,
            currentPage:1,
            count: 0,

            dialogFormVisible: false,
            selectedShop: {},//传入对话框的参数
            selectedCategory: [],//级联
            categoryOptions: []
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
                
                const resCount = await getShopsCount();
                if(resCount.error_code === 0){
                    this.count = resCount.count;
                }
                await this.getShops();
            }catch(err ){
                console.log(err)
            }
        },

        async listShopCategory(){
            const resCategory = await listShopCategory();
            let categories = [];
            if(resCategory.error_code === 0){
                categories = resCategory.categories;
                categories.forEach(item => {
                    if(item.sub_categories.length){
                        const addnew = {
                            value: item.name,
                            label: item.name,
                            children: []
                        }
                        item.sub_categories.forEach((subitem, index) => {
                            if(index == 0){
                                return;
                            }
                            addnew.children.push({
                                value: subitem.name,
                                label: subitem.name
                            })
                        })
                        this.categoryOptions.push(addnew)
                    }
                })
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

        handleSizeChange(val){
            console.log(`每页${val}条`);  
        },

        handleCurrentChange(val){
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getShops();
        },

        // 表格的方法
        handleEdit(index, row){
            this.dialogFormVisible = true;
            this.selectedShop = row;
            this.selectedCategory = row.category.split('/');
            if(!this.categoryOptions.length){
                this.listShopCategory();
            }
        },

        addFood(index, row){

        },

        async handleDelete(index, row){
            try{
                const res = await deleteShop({restaurant_id: row.id});
                if(res.error_code === 0){
                    this.$message({
                        type:'success',
                        message: '删除成功'
                    })
                }else{
                    this.$message({
                        type:'error',
                        message: res.error_type
                    })
                }
            }catch(err ){
                this.$message({
                    type:'error',
                    message: '删除失败'
                })
            }
        },


        //对话框里的方法
        //地址填写
        async querySearchAsync(queryString, cb ){
            if(queryString){
                try{
                    const res = await searchplace(this.city.id, queryString);
                    let cityList = [];
                    if(res.error_code === 0){
                        cityList = res.cityList;
                    }else{
                        throw new Error(res.error_type);
                    }
                    cityList.map(item => {
                        item.value = item.address;
                        return item;
                    })
                    cb(cityList);
                }catch(err ){
                    console.log(err );
                }
            }
        },

        addressSelect(address){
            this.selectedShop.latitude = address.latitude;
            this.selectedShop.longitude = address.longitude;
        },

        handleServiceAvatarSuccess(res, file){
            if(res.error_code === 0){
                this.selectedShop.image_path = res.image_path;
            }else{
                this.$message.error('上传图片失败！')
            }
        },

        beforeAvatarUpload(file){
            const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if(!isRightType){
                this.$message.error('上传头像图片只能是JPG格式或者png格式');
            }
            if(!isLt2M){
                this.$message.error('上传头像图片大小不能超过2MB');
            }
            return isRightType && isLt2M;
        },

        async updateShop(){
            this.dialogFormVisible = false;
            try{
                this.selectedShop.category = this.selectedCategory.join('/');
                const res = await updateShop(this.selectedShop);
                if(res.error_code === 0){
                    this.$message({
                        type: 'success',
                        message: '更新店铺信息成功'
                    })
                    this.getShops();
                }
            }catch(err ){
                this.$message({
                    type: 'error',
                    message: res.error_type
                })
            }
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

    .avatar-uploader .el-upload{
        border:1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidder;
    }

    .avatar-uploader .el-upload:hover{
        border-color: #20a0ff;
    }

    .avatar-uploader-icon{
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar{
        width: 120px;
        height: 120px;
        display: block;
    }


</style>