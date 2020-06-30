<template>
    <div class="header_container">
        <el-breadcrumb>
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command = "handleCommand">
            <img :src = "baseImgPath + adminInfo.avatar" alt = "头像" class = "avator"/>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command = "home">首页</el-dropdown-item>
                <el-dropdown-item command = "signout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {baseImgPath} from '@/config/env';
import {signout} from '@/api/getData';

export default {
    data(){
        return {
            baseImgPath
        }
    },
    created(){
        if(!(this.adminInfo && this.adminInfo.id)){
            this.getAdminInfo();
        }  
    },
    computed: {
        ...mapState(['adminInfo'])
    },
    methods: {
        ...mapActions(['getAdminInfo']),
        async handleCommand(command){
            if(command == 'home'){
                this.$router.push('/manage');
            }else if(command == 'signout'){
                const res = await signout();
                if(res.error_code == 0){
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    })
                    this.$router.push('/');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.error_type
                    })
                }
            }
        }
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
.avator{
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px
}


</style>