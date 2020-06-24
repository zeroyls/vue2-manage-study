<template>
    <div>
        <head-top></head-top>
        <header class = "admin_title">管理员信息</header>
        <div class = "admin_set">
            <ul>
                <li>
                    <span>姓名：</span><span>{{adminInfo.user_name}}</span>
                </li>
                <li>
                    <span>注册时间：</span><span>{{adminInfo.create_time}}</span>
                </li>
                <li>
                    <span>管理员权限：</span><span>{{adminInfo.admin}}</span>
                </li>
                <li>
                    <span>管理员ID：</span><span>{{adminInfo.id}}</span>
                </li>
                <li>
                    <span>更换头像：</span>
                    <!-- <el-upload>

                    </el-upload> -->
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import headTop from '../headTop'
export default {
    data(){
        return {
            adminInfo: {

            }
        }
    },
    components: {
        headTop
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/mixin';
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li {
            padding: 20px;
            span{
                color: #666;
            }
        }
    }

    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
</style>