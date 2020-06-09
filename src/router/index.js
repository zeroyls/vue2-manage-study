import Vue from 'vue';
import Router from 'vue-router'
import login from '../components/page/login';
import manage from '../components/page/manage';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: login
    },{
        path:'/manage',
        component: manage,
        name: '',
        
    }
]


export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production'
})