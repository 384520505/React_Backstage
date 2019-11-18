import React, { Component } from 'react';

// 导入user存储文件
import memoryUtils from '../../utils/memoryUtils.js';

// Redirect 在render方法中实现页面的跳转
import { Redirect } from 'react-router-dom';

class Admin extends Component {

    // 在渲染后台管理心系统界面时，判断内存中是否有用户的登陆信息，若存在渲染后台管理页面
    //  若不存在，表明没有用户登陆, 自动跳转到登陆页面



    render() {
        // 若内存的不存在user登陆信息，跳转到登陆页面
        if(!memoryUtils.user || !memoryUtils.user._id){
            return <Redirect to='/login' />
        }
        return <div>Admin{memoryUtils.user.username}</div>
    }
}


export default Admin;