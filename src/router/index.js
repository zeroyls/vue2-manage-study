import Vue from 'vue';
import Router from 'vue-router'
import Login from '../components/page/Login';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Login
    }
]


export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production'
})