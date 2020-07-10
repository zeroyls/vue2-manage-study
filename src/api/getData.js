import fetch from '@/config/fetch';
import { data } from 'autoprefixer';


// 登录
export const login = data => fetch('/admin/login', data, 'POST');

// 退出
export const signout = () => fetch('/admin/signout');

// 获取当前登录用户的信息
export const getAdminInfo = () => fetch('/admin/info')

//获取店铺分类
export const listShopCategory = () => fetch('/shopping/category/list');

//添加商铺
export const addShop = data => fetch('/shopping/shop/add', data, 'POST');

//获取商铺列表
export const getShops = data => fetch('/shopping/shop/list', data);

//获取商铺列表
export const getShopsCount = () => fetch('/shopping/shop/getCount');

//更新商铺
export const updateShop = (data) => fetch('/shopping/shop/update', data, 'POST');

//删除商铺
export const deleteShop = (data) => fetch('/shopping/shop/delete', data);

//helper function
//获取定位城市
export const cityGuess = () => fetch('/v1/cities', {type: 'guess'});

export const searchplace = (cityid, value ) => fetch('/v1/search', {
    city_id: cityid,
    keyword: value,
})

export const addMenu = (data) => fetch('/shopping/menu/add', data, 'POST');

export const listMenu = (data) => fetch('/shopping/menu/list', data);

export const getMenu = (data) => fetch('/shopping/menu/get', data)

export const addFood = (data) => fetch('/shopping/food/add', data, 'POST')


export const getUserList = data => fetch('/v2/user/list', data);

export const getUserCount = () => fetch('/v2/user/getcount')