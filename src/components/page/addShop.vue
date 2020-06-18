<template>
    <div>
        <head-top></head-top>
        <el-row>
            <el-col :span = "12" :offset = "4">
                <el-form :model = "formData" :rules = "rules">
                    <el-form-item label = "店铺名称" prop = "name">
                        <el-input v-model = "formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label = "详细地址" prop = "address">
                        <el-autocomplete></el-autocomplete>
                    </el-form-item>
                    <el-form-item label = "联系电话" prop = "phone">
                        <el-input v-model.number="formData.phone" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label = "店铺简介" prop = "description">
                        <el-input v-model = "formData.description"></el-input>
                    </el-form-item>
                    <el-form-item v-model = "店铺标语" prop = "promotion_info" >
                        <el-input v-model = "formData.promotion_info"></el-input>
                    </el-form-item>
                    <el-form-item label = "店铺分类">
                        <el-cascader
                            :options="categoryOptions"
                            v-model = "selectedCategory"
                            >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label = "店铺特点" >
                        <span>品牌保证</span>
                        <el-switch on-text = "" off-text = "" v-model = "formData.is_premium"></el-switch>
                        <span>蜂鸟专送</span>
                        <el-switch on-text = "" off-text = "" v-model = "formData.delivery_mode"></el-switch>
                        <span>新开店铺</span>
                        <el-switch on-text="" off-text="" v-model = "formData.new"></el-switch>
                    </el-form-item>
                    <el-form-item style="white-space: nowrap;">
						<span>外卖保</span>
						<el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
						<span>准时达</span>
						<el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
						<span>开发票</span>
						<el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
					</el-form-item>
                    <el-form-item label = "配送费" prop = "float_delivery_fee">
                        <el-input-number v-model = "formData.float_delivery_fee" :min = "0" :max = "20"></el-input-number>
                    </el-form-item>
                    <el-form-item label = "起送价" prop = "float_minimum_order_amount"><el-input-number v-model = "formData.float_minimum_order_amount"  :min = "0" :max = "100"></el-input-number>
                    </el-form-item>
                    <el-form-item label = "营业时间">
                        <el-time-select
                            placeholder="起始时间"
                            v-model = "formData.startTime"
                            :picker-options = "{
                                start: '05:30',
                                step: '00:15',
                                end: '23:30'
                                }">
                        </el-time-select>
                        <el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
                    </el-form-item>
                    <el-form-item label = "上传店铺头像">
                        <el-upload></el-upload>
                    </el-form-item>
                    <el-form-item label = "上传营业执照">
                        <el-upload></el-upload>
                    </el-form-item>
                    <el-form-item label = "上传餐饮服务许可证">
                        <el-upload></el-upload>
                    </el-form-item>
                    <el-form-item label = "优惠活动">
                        <el-select v-model = "activityValue" @change = "selectActivity" :placeholder="activityValue">
                            <el-option
                                v-for = "item in options"
                                :key = "item.value"
                                :label = "item.label"
                                :value = "item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-table
                        :data = "activities"
                        >
                        <el-table-column
                            prop = "icon_name"
                            label = "活动标题"
                            align = "center">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label = "活动名称"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop = "description"
                            align="center"
                            label = "活动详情"
                            >
                        </el-table-column>
                        <el-table-column
                            label = "操作"
                            >
                            <template slot-scope = "props">
                                <el-button size = "small" type = "danger" @click="handleDeleteActivity(props.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item>
                        <el-button type = "primary" @click = "submitForm('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from '../headTop'
export default {
    data(){
        return {
            formData: [],
            rules: {},
            options: [{
                value: '满减优惠',
                label: '满减优惠'
            }, {
                value: '优惠大酬宾',
                label: '优惠大酬宾'
            }, {
                value: '新用户立减',
                label: '新用户立减'
            }, {
                value: '进店领券',
                label: '进店领券'
            }],
            activityValue: '满减优惠',
            activities: [{
                icon_name: '减',
                name: '满减优惠',
                description: '满30减5，满60减8',
            }],
        }
    },
    methods: {
        selectActivity(){
            this.$prompt('请输入活动详情', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',  
            }).then(({value}) =>{
                if(value == null){
                    this.$message({
                        type: info,
                        message: '请输入活动详情'
                    });
                    return;
                }
                let newObj = {};
                switch(this.activityValue){
                    case '满减优惠':
                        newObj= {
                            icon_name: '减',
                            name: '满减优惠',
                            description: value,
                        }
                        break;
                    case '优惠大酬宾':
                        newObj= {
                            icon_name: '特',
                            name: '优惠大酬宾',
                            description: value,
                        }
                        break;
                    case '新用户立减':
                        newObj= {
                            icon_name: '新',
                            name: '新用户立减',
                            description: value,
                        }
                        break;
                    case '进店领券':
                        newObj= {
                            icon_name: '领',
                            name: '进店领券',
                            description: value,
                        }
                        break;
                }
                this.activities.push(newObj);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        handleDeleteActivity(){

        }
    },
    components: {
        headTop
    }
}
</script>