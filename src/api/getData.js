import fetch from '@/config/fetch';


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


//helper function
//获取定位城市
export const cityGuess = () => fetch('/v1/cities', {type: 'guess'});

export const searchplace = (cityid, value ) => fetch('/v1/search', {
    city_id: cityid,
    keyword: value,
})