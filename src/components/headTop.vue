<template>
    <div class="header_container">
        <el-breadcrumb>
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown>
            <img src = "" alt = "头像" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >首页</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    created(){
        if(!(this.adminInfo && this.adminInfo.id)){
            this.getAdminInfo();
        }  
    },
    computed: {
        ...mapState(['adminInfo'])
    },
    methods: {
        ...mapActions(['getAdminInfo'])
    }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.header_container{
    background-color: #eff2f7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
}


</style>