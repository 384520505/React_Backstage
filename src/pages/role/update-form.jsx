// 更新角色全权限 

import React, { Component } from 'react';

import { Form, Input, Tree } from 'antd';

import PropTypes from 'prop-types';

import MenuList from '../../config/MenuConfig';

const { TreeNode } = Tree;

class UpdateRole extends Component {

    state = {
        // 当前选中角色的权限
        menu: [],
    }

    // 数据类型验证
    static propsType = {
        role: PropTypes.object
    }

    // 获取树的列表
    getTreeList = (menus) => {
        return menus.map(item => {
            return (
                <TreeNode title={item.title} key={item.key}>
                    {
                        item.children ? this.getTreeList(item.children) : null
                    }
                </TreeNode>
            );
        });
    }

    // 获取选中的 复选框
    getMenus = () => this.state.menu;


    // 点击复选框时触发函数
    onCheck = (checkedKeys) => {
        // 点击复选框时 更新menu 状态
        this.setState({menu:checkedKeys});
    }

    componentWillMount() {
        this.setState({ menu: this.props.role.menus });
    }

    // 该函数在 props 状态发生改变时，触发
    // nextProps 下一次发生改变时的 props 对象
    componentWillReceiveProps(nextProps){
        this.setState({ menu: nextProps.role.menus });
    }


    render() {
        const { role } = this.props;
        const { menu } = this.state;
        return (<div>
            <Form>
                <Form.Item label='角色名称：' labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
                    <Input value={role.name} disabled />
                </Form.Item>
            </Form>
            <Tree
                // 使Tree中带有 复选框
                checkable
                // 默认展开所有tree
                defaultExpandAll
                // 默认选中的树节点
                checkedKeys={menu}
                // 点击复选框时触发函数
                onCheck={this.onCheck}
            >
                <TreeNode title='角色权限' key='all'>
                    {
                        this.getTreeList(MenuList)
                    }
                </TreeNode>
            </Tree>
        </div>);
    }
}

export default UpdateRole;