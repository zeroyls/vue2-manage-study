import fetch from '@/config/fetch';


// 登录
export const login = data => fetch('/admin/login', data, 'POST');

// 退出
export const signout = () => fetch('/admin/signout');

// 获取当前登录用户的信息
export const getAdminInfo = () => fetch('/admin/info')