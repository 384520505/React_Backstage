// 定义函数 返回对应的 action 对象

import { SET_HEAD_TITLE, SET_LOGIN_USER, LOGOUT_USER } from './action-types.js';

import { ReqLogin } from '../api/index.js';

import storageUtils from '../utils/storageUtils.js';
import { message } from 'antd';

// 设置头部标题的内容
export const setHeadTitle = (title) => ({ type: SET_HEAD_TITLE, title });

// 用户登陆的 action 标识对象
export const setLoginUser = (user) => ({ type: SET_LOGIN_USER, user});

// 退出登陆
export const logout = () => {
    // 将本地的 用户登陆信息删除
    storageUtils.removeUser();

    // 返回退出登陆的标识 action 对象
    return {type:LOGOUT_USER}
};

// 登陆用户
export const login = (username, password) => {
    return async dispatch => {
        const result = await ReqLogin(username, password);
        if (result && result.status === 0) {  // 登陆成功
            const user = result.data;
            // 将user数据保存到本地
            storageUtils.saveUser(user);
            dispatch(setLoginUser(user));
        }else{
            message.error('登陆失败');
        }
    }
}