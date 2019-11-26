// 角色管理组件

import React from 'react';

import { Card, Button, Table, Modal, message } from 'antd';

import { ReqGetRoles, ReqAddRole, ReqUpdateRole } from '../../api/index';

import memoryUntils from '../../utils/memoryUtils'

import { getDate } from '../../utils/dateUtils'

import AddRoleForm from './add-form';
import UpdateRole from './update-form';

class Role extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // 角色列表
            roles: [],
            // 当前选中的角色
            role: {},
            // 添加角色框是否可见
            isShowAdd: false,
            // 数据是否在加载中
            loading: false,
            // 橘色授权框是否可见
            isShowUpdate: false,
        }

        // 创建一个ref 容器
        this.menus = React.createRef();
    }


    getColumns = () => {
        this.columns = [
            {
                title: '角色',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:(create_time) => getDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(auth_time) => auth_time ? getDate(auth_time) : null,
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ];
    }

    // 被点击某一行的事件
    onRow = (role) => {
        return {
            onClick: () => {
                this.setState({
                    role
                });
            }
        }
    }

    // 获取角色数据
    getRoles = async () => {
        // 加载动画
        this.setState({ loading: true });
        const result = await ReqGetRoles();
        if (result && result.status === 0) {
            // 隐藏加载动画
            this.setState({ loading: false });
            this.setState({
                roles: result.data
            });
        }
    }

    // 获取子组件的 form 对象
    // 该方法有子组件调用，将子组件中的 form 对象 传入，父组件即可获取到 子组件的 form 对象
    setForm = (form) => {
        this.form = form;
    }

    // 弹窗取消按钮事件
    handleCancel = () => {
        // 隐藏弹框
        this.setState({ isShowAdd: false, isShowUpdate: false });
    }

    // 添加角色
    handleAddRole = () => {
        const { validateFields } = this.form;

        validateFields(async (err, value) => {
            if (!err) {
                // 加载动画
                this.setState({ loading: true });
                const result = await ReqAddRole(value.roleName);
                // 隐藏加载动画
                this.setState({ loading: false });
                if (result && result.status === 0) {
                    // 隐藏弹出框
                    this.setState({ isShowAdd: false });
                    // 清空form 表单的数据
                    this.form.resetFields();
                    message.success('角色添加成功');

                    // 在此不重新发送ajax请求，来更新列表
                    // 这是 react官方 赞成的 方式 ，基于原本的状态更新数据
                    this.setState(state => ({
                        roles: [...state.roles, result.data]
                    }));
                } else {
                    message.error('角色添加失败');
                }
            }
        });
    }

    // 更新角色权限
    handleUpdateRole = async () => {
        const role = this.state.role;
        role.menus = this.menus.current.getMenus();
        // 获取授权人
        role.auth_name = memoryUntils.user.username;
        // 获取授权时间
        role.auth_time = Date.now();

        // 发送更新请求
        const result = await ReqUpdateRole(role);

        if(result && result.status === 0){
            // 隐藏弹出框
            this.setState({isShowUpdate:false});
            // 刷新当前角色列表
            this.getRoles();
            message.success('角色授权成功');
        }else{
            message.error('角色授权失败');
        }
        
    }

    // 获取当前选中的 角色的权限 列表
    getRoleJur = () => {
        // 显示权限管理弹出框
        this.setState({ isShowUpdate: true });
    }

    componentWillMount() {
        this.getColumns();
    }


    componentDidMount() {
        // 获取角色数据
        this.getRoles();
    }


    render() {
        const { role, loading } = this.state;
        return (
            <div>
                <Card
                    title={<span>
                        <Button type='primary' onClick={() => { this.setState({ isShowAdd: true }) }}>创建角色</Button>&nbsp;&nbsp;
                        <Button type='primary' onClick={this.getRoleJur} disabled={!role._id}>设置角色权限</Button>
                    </span>}
                >
                    <Table
                        rowKey='_id'
                        bordered
                        loading={loading}
                        columns={this.columns}
                        dataSource={this.state.roles}
                        // 选择功能的配置
                        // selectedRowKeys : 被选中的选项
                        rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                        // onRow事件
                        onRow={this.onRow}
                    />
                </Card>
                <Modal
                    title='添加角色'
                    visible={this.state.isShowAdd}
                    onOk={this.handleAddRole}
                    onCancel={this.handleCancel}
                >
                    <AddRoleForm setForm={this.setForm} />
                </Modal>
                <Modal
                    title='角色授权'
                    visible={this.state.isShowUpdate}
                    onOk={this.handleUpdateRole}
                    onCancel={this.handleCancel}
                >
                    <UpdateRole ref={this.menus} role={role} />
                </Modal>
            </div>
        );
    }
};

export default Role;
