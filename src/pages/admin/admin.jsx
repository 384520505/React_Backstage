import React, { Component } from 'react';

// 导入user存储文件
import memoryUtils from '../../utils/memoryUtils.js';
import LeftNav from '../../components/left-nav/leftNav.jsx'

// Redirect 在render方法中实现页面的跳转
import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

// 导入路由组件
import Home from '../home/home';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Category from '../product/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';

import ContentHeader from '../../components/header/content-header';

const {Header, Footer, Sider, Content } = Layout;

class Admin extends Component {

    // 在渲染后台管理心系统界面时，判断内存中是否有用户的登陆信息，若存在渲染后台管理页面
    //  若不存在，表明没有用户登陆, 自动跳转到登陆页面



    render() {
        // 若内存的不存在user登陆信息，跳转到登陆页面
        if (!memoryUtils.user || !memoryUtils.user._id) {
            return <Redirect to='/login' />
        }
        return <div style={{ height: '100%' }}>
            <Layout style={{ minHeight:'100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{height:'80px',backgroundColor:'#ffffff',padding:'0'}}>
                        <ContentHeader />
                    </Header>
                    <Content style={{margin:'20px',backgroundColor:'#ffffff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/bar' component={Bar} />
                            <Route path='/line' component={Line} />
                            <Route path='/pie' component={Pie} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            {/* 当以上路由都没有匹配，默认进入home页面 */}
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', backgroundColor:'#ddd',zIndex:1}}>React 后台管理系统&nbsp;&nbsp;&nbsp;&nbsp;开发者:Taohouqi</Footer>
                </Layout>
            </Layout>
        </div>
    }
}


export default Admin;