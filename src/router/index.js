import Vue from 'vue';
import Router from 'vue-router'
import login from '../components/page/login';
import manage from '../components/page/manage';
import home from '../components/page/home'
import addShop from '../components/page/addShop'

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: login
    },{
        path:'/manage',
        component: manage,
        name: '',
        children:[
            {
                path: '',
                component: home,
                meta: []
            },
            {
                path: '/addshop',
                component: addShop,
                meta: ['添加数据', '添加商铺']
            }
        ]

    }
]


export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production'
})