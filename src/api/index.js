// 对 ajax.js 请求函数进一步封装

import ajax from './ajax.js';


// 登陆请求
export const ReqLogin = (username,password) => ajax( '/login',{ username, password }, 'POST');


// 添加用户请求
export const ReqAddUser = (user) => ajax('/manage/user/add', user , 'POST');