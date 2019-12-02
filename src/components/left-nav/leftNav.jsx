// 侧边导航栏

import React from 'react';

import Header from './leftNavHeader.jsx';

import propTypes from 'prop-types';

import {connect} from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import MenuList from '../../config/MenuConfig';

// import memoryUtils from '../../utils/memoryUtils';

import {setHeadTitle} from '../../redux/actions.js';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends React.Component {

    static propsTypes = {
        setHeadTitle: propTypes.func.isRequired,
        // 当前登陆的用户
        user: propTypes.object.isRequired,
    }

    renderMenuList_map = (MenuList) => {
        return MenuList.map(item => {
            if (this.isJur(item)) {
                if (!item.children) {
                    if(this.props.location.pathname.indexOf(item.key) === 0){
                        this.props.setHeadTitle(item.title)
                    }
                    return (<Menu.Item key={item.key}>
                        <Link to={item.key} onClick={() =>this.props.setHeadTitle(item.title)}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>);
                } else {
                    // 获取子列表中是否有元素的key值与当前路由的 pathname的值相同，若相同将该子元素获取出来
                    const cItem = item.children.find(item => { return this.props.location.pathname.indexOf(item.key) === 0 });
                    // 判断该子元素是否存在，将其父元素的key值进行存储
                    if (cItem) {
                        // 向组件中添加openKey属性
                        this.openKey = item.key;
                    }
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.renderMenuList_map(item.children)}
                        </SubMenu>
                    );
                }
            }else{
                return null;
            }
        });
    }


    // 当前用户的权限是否通过验证
    // userClass: 用户的分类权限
    /**
     * 用户显示权限列表的条件
     * 1.用户为 admin 用户 ；
     * 2.当前权限分类的 isPublic 属性为 true；
     * 3.当前登陆用户 包含 当前权限分类
     * 4.包含当前权限分类的子分类 应显示该子分类的 父分类
     */
    isJur = (userClass) => {
        // const { username ,role:{menus} } = memoryUtils.user;
        const { username ,role:{menus} } = this.props.user;
        if(username === 'admin' || userClass.isPublic || menus.indexOf(userClass.key) !== -1){
            return true;
        } else if(userClass.children){ 
            return !!userClass.children.find(child => menus.indexOf(child.key) !== -1);
        }
        return false;
    }


    // 在第一次执行 render函数执行前执行一次
    componentWillMount() {
        this.renderMenuList_map = this.renderMenuList_map(MenuList);
    }

    render() {
        let path = this.props.location.pathname;
        // 解决在商品详情页无法选中 侧边栏对应 选项的问题
        if (path.indexOf('/product') === 0) {
            path = '/product';
        }
        return <Sider>
            <Header />
            <Menu theme="dark"
                // 选中当前路由对应的列表元素
                selectedKeys={[path]}
                defaultOpenKeys={[this.openKey]}
                mode="inline">
                {/* 使用 map函数渲染菜单列表 */}
                {
                    this.renderMenuList_map
                }
            </Menu>
        </Sider>
    };
}

// 使用withRouter 高阶函数将 LeftNav组件包裹，将 LeftNav组件中传递 history、location、match 对象
const RouterLeftNav = withRouter(LeftNav);

export default connect(
    state => ({user:state.user}),
    {
        // 该方法返回设置头部 标题的 action 对象
        setHeadTitle,
    }
)(RouterLeftNav);