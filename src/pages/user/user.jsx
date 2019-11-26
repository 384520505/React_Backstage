// 用户管理组件

import React from 'react';

import { Card, Table, Modal, message, Button } from 'antd';

import LinkButton from '../../components/link-button/linkButton';

import { ReqGetUsers, ReqDeteleUser, ReqAddOrUpdateUser } from '../../api/index';

import { getDate } from '../../utils/dateUtils';

import CreateOrUpdateForm from './create-update-form';

const { confirm } = Modal;
class User extends React.Component {

    state = {
        // 用户列表数据
        users: [],
        // 角色列表
        roles: [],
        // 是否加载中
        isLoading: false,
        // 创建用户框是否显示
        isShowCreate: false,
        // 是否加载中
        loading:false,
    }



    // 获取表格列信息
    getColumns = () => {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => getDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => (this.state.roles.find(role => role_id === role._id).name)  //此处需要优化
            },
            {
                title: '操作',
                // dataIndex: '',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showCreateOrUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)} >删除</LinkButton>
                    </span>
                )
            }
        ];
        this.columns = columns;
    }

    // 获取用户列表数据
    getUsers = async () => {
        // 显示加载动画
        this.setState({ loading: true });
        // 获取用户列表数据
        const result = await ReqGetUsers();

        if (result && result.status === 0) {
            const { users, roles } = result.data;
            // 隐藏加载动画
            this.setState({ loading: false, users, roles });
        } else {
            message.error('用户列表加载失败');
        }
    }

    // 用户删除弹出框
    deleteUser = (user) => {
        confirm({
            title: `是否删除 ${user.username} 用户`,
            onOk: async () => {
                const result = await ReqDeteleUser(user._id);
                if (result && result.status === 0) {
                    message.success('删除成功');
                    // 刷新用户列表
                    this.getUsers();
                } else {
                    message.error('删除失败');
                }
            },
        });
    }

    // 创建用户或修改用户
    showCreateOrUpdate = (user) => {
        // 显示弹出框
        this.setState({ isShowCreate: true });
        this.user = user || {};
    }

    // 取消按钮
    handleCancel = () => {
        const { resetFields } = this.form;
        this.setState({ isShowCreate: false });
        // 清空输入框中的
        resetFields();
    }

    // 确认按钮
    handleOk = () => {
        const { validateFields, resetFields } = this.form;
        validateFields(async (err, values) => {
            if (!err) {
                values._id = this.user._id;
                const result = await ReqAddOrUpdateUser(values);
                if (result && result.status === 0) {
                    // 清空输入框中的内容
                    resetFields();
                    this.setState({ isShowCreate: false });
                    message.success('添加用户成功');
                    // 刷新用户列表
                    this.getUsers();
                } else {
                    message.success('修改用户成功');
                }
            }
        });
    }

    componentWillMount() {
        this.getColumns();
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (<Card
            title={
                <Button onClick={this.showCreateOrUpdate} type='primary'>创建用户</Button>
            }
        >
            <Table
                rowKey='_id'
                loading={this.state.loading}
                bordered
                columns={this.columns}
                dataSource={this.state.users}
            />
            <Modal
                title='创建用户'
                visible={this.state.isShowCreate}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                <CreateOrUpdateForm
                    setForm={form => this.form = form}
                    user={this.user}
                    roles={this.state.roles}
                />
            </Modal>
        </Card>);
    }
};

export default User;
