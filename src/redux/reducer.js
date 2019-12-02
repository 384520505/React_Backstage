// reducer 函数，每一个 reducer 函数 都会转换为，对应的状态值

import {combineReducers} from 'redux'

import {SET_HEAD_TITLE, SET_LOGIN_USER, LOGOUT_USER} from './action-types.js';

import storageUtils from '../utils/storageUtils.js';

// 头部标签的初始值
const initHeadTitle = '首页'
// 用于显示 头部标签名称的状态值
function headTitle (state=initHeadTitle, action) {
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.title;
        default:
            return state;
    }
}

// 用户登陆/退出登陆
const initUser = storageUtils.getUser() ? storageUtils.getUser() : {};
function user (state=initUser, action) {
    switch(action.type){
        case SET_LOGIN_USER:
            return action.user;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    headTitle,
    user
});