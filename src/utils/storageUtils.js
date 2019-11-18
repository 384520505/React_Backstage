// 在本地存储用户的登陆信息

// 导入 store 包
import store from 'store';

const USER_KEY = 'user_key';

export default {

    // 本地存储
    saveUser(user){
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY,user);
    },

    // 读取本地的user存储
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY);
    },

    // 删除user存储
    removeUser(){
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    },
};