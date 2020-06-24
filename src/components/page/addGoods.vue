<template>
    <div>
        <head-top></head-top>
        <el-row>
            <el-col :span = "14" :offset = "4">
                <header>选择食品种类</header>
                <el-form :model = "categoryForm">
                    <el-row >
                        <el-form-item label = "食品种类">
                            <el-select v-model = "categoryForm.categorySelect"
                                :placeholder="selectValue.label">
                                <el-option
                                    v-for = "item in categoryForm.categoryList"
                                    :key = "item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class = "add_category_row" :class="showAddCategory? 'showEdit': ''">
                        <div class = "add_catefory">
                            <el-form-item label = "食品种类" prop = "name">
                                <el-input v-model = "categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label = "种类描述" prop = "description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type = "primary" @click = "submitcategoryForm('categoryForm')">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class = "add_category_button" @click = "addCategoryFun">
                        <i class = "el-icon-caret-top edit_icon"
                            v-if = "showAddCategory"></i>
                        <i class = "el-icon-caret-bottom edit_icon" v-else slot = "icon"></i>
                        <span>添加食品种类</span>
                    </div>
                </el-form>

                <header class = "form_header">添加食品</header>
                <el-form :model = "foodForm" :rules = "foodrules">
                    <el-form-item label = "食品名称" prop = "name">
                        <el-input v-model = "foodForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label = "食品活动" prop = "activity">
                        <el-input v-model = "foodForm.activity"></el-input>
                    </el-form-item>
                    <el-form-item label = "食品详情" prop = "description">
                        <el-input v-model = "foodForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label = "上传食品图片">
                        <el-upload>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label = "食品规格">
                        <el-radio class = "radio" v-model = "foodSpecs" label = "one">单规格</el-radio>
                        <el-radio class = "radio" v-model="foodSpecs" label = "more">多规格</el-radio>
                    </el-form-item>
                    <el-row v-if = "foodSpecs == 'one'">
                        <el-form-item label = "包装费">
                            <el-input-number v-model = "foodForm.specs[0].packing_fee" :min = "0" :max = "100"></el-input-number>
                        </el-form-item>
                        <el-form-item label = "价格">
                            <el-input-number v-model = "foodForm.specs[0].price" :min = "0" :max = "10000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row v-else>
                        <el-button type = "primary" @click  = "dialogFormVisible = true">添加规格</el-button>
                        <el-table
                            :data = "foodForm.specs">
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
                            <el-table-column
                                label = "操作">
                                <template slot-scope="scope">
                                    <el-button
                                        size = "small"
                                        type = "danger"
                                        @click = "handleDelete(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-form-item>
                        <el-button type = "primary" @click = "addFood('foodForm')">确认添加食品</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title = "添加规格" :visible.sync = "dialogFormVisible">
                    <el-form :rules = "specsFormrules" :model = "specsForm">
                        <el-form-item label = "规格">
                            <el-input v-model = "specsForm.specs" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label = "包装费">
                            <el-input-number v-model="specsForm.packing_fee" :min = "0" :max = "100"></el-input-number>
                        </el-form-item>
                        <el-form-item label = "价格">
                            <el-input-number v-model = "specsForm.price" :min = "0" :max = "10000"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div slot = "footer" class = "dialog-footer">
                        <el-button @click = "dialogFormVisible = false">取消</el-button>
                        <el-button type = "primary" @click = "addSpecs">确定</el-button>
                    </div>
                </el-dialog>



            </el-col>
        </el-row>
    </div>
</template>


<script>
import headTop from '../headTop'
export default {
    data(){
        return {
            categoryForm: {
                categoryList: [],
                categorySelect: '',
                name: '',
                description:''
            },
            foodForm: {
                name: '',
                description: '',
                image_path: '',
                activity: '',
                attributes: [],
                specs: [{
                    specs: '默认',
                    packing_fee: 0,
                    price: 20,
                }],
            },
            showAddCategory: false,
            foodSpecs: 'one',
            dialogFormVisible: false,
            specsForm: {
                specs: '',
                packing_fee: 0,
                price: 20
            },
            specsFormrules: {
                specs: [{
                    required: true, message: '请输入规格', trigger: 'blur'
                }],
            }
        }
    },
    computed: {
        selectValue: function (){
            return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
        }
    },
    methods:{
        submitcategoryForm(){

        },

        addCategoryFun(){
            this.showAddCategory = !this.showAddCategory;
        },


        //食品
        addFood(food){

        },


        //规格表格
        //删除规格
        handleDelete(){

        },

        //规格对话框
        addSpecs(){
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
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
    }
    .add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}

</style>