<template>
    <div class = "login_page fillcontain">
        <transition name = "form-fade" mode = "in-out">
            <section class = "form_container">
                <div class ="manage_tip">
                    <p>elm后台管理系统</p>
                </div>
                <el-form>
                    <el-form-item>
                        <el-input placeholder="用户名">
                            <span>dsfsd</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type = "password" placeholder = "密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type = "primary" class ="submit_btn">登录</el-button>
                    </el-form-item>
                </el-form>
                <p class ="tip">温馨提示：</p>
                <p class ="tip">未登陆过的新用户，自动注册</p>
                <p class ="tip">注册过的用户可凭账号密码登录</p>
            </section>
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang = "less" scoped>
    @import '../../style/mixin.less';
    .login_page{
        background-color: #325057;
    }

    .form_container{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }

	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p {
			font-size: 34px;
			color: #fff;
		}
    }

    .tip{
		font-size: 12px;
		color: red;
	}
    
    .form-fade-enter-active, .form-fade-leave-active{
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active{
        transform: translate3d(0, -50px, 0);
        opacity: 50;
    }
</style>