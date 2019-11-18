// 侧边导航栏

import React from 'react';

import Header from './leftNavHeader.jsx';

import { Link, withRouter } from 'react-router-dom';

import MenuList from '../../config/MenuConfig';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends React.Component {


    renderMenuList_map = (MenuList) => {
        return MenuList.map(item => {
            if (!item.children) {
                return (<Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>);
            } else {
                // 获取子列表中是否有元素的key值与当前路由的 pathname的值相同，若相同将该子元素获取出来
                const cItem = item.children.find(item => {return item.key === this.props.location.pathname});
                // 判断该子元素是否存在，将其父元素的key值进行存储
                if(cItem){
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
        });
    }


    // 在第一次执行 render函数执行前执行一次
    componentWillMount(){
        this.renderMenuList_map = this.renderMenuList_map(MenuList);
    }

    render() {
        return <Sider>
            <Header />
            <Menu theme="dark" 
            // 选中当前路由对应的列表元素
            selectedKeys={[this.props.location.pathname]} 
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

export default RouterLeftNav;