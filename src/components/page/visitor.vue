<template>
    <div>
        <head-top></head-top>
        <visitor-pie :pieData = "pieData" ></visitor-pie>
    </div>
</template>


<script>
import headTop from '../headTop'
import visitorPie from '../visitorPie'

export default {
    data(){
        return {
            pieData: {
                beijing: 100,
                shanghai: 200,
                shenzhen: 300,
                hangzhou: 200,
                qita: 700
            }
        }
    },
    components: {
        headTop,
        visitorPie
    }
}
</script>


<style lang="less">
	@import '../../style/mixin';
	
</style>