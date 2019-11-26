// 创建 或 修改 用户 form组件、

import React, { PureComponent } from 'react';

import { Form, Input, Select } from 'antd';

import porpTypes from 'prop-types';

const { Option } = Select;

class CreateOrUpdateForm extends PureComponent {

    static propsType = {
        roles: porpTypes.array.required,
        setForm: porpTypes.func.required,
        user: porpTypes.object,
    }


    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render() {
        const { username, phone, email, role_id } = this.props.user;
        const { getFieldDecorator } = this.props.form;
        return (<Form>
            <Form.Item label='用户名：'>
                {
                    getFieldDecorator('username', {
                        initialValue: username,
                        rules: [
                            { required: true, message: '用户名不能为空' }
                        ]
                    })(
                        <Input placeholder='请输入用户名' />
                    )
                }
            </Form.Item>
            {
                this.props.user._id ? null : (
                    <Form.Item label='登陆密码：'>
                        {
                            getFieldDecorator('password', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '登陆密码不能为空' }
                                ]
                            })(
                                <Input type='password' placeholder='请输入登陆密码' />
                            )
                        }
                    </Form.Item>
                )
            }
            <Form.Item label='手机号：'>
                {
                    getFieldDecorator('phone', {
                        initialValue: phone,
                        rules: [
                            { required: true, message: '手机号不能为空' },
                            { pattern: /[0-9]+/, message: '请输入正确的手机号' },
                            { max: 11, message: '请输入正确的手机号' }
                        ]
                    })(
                        <Input type='tel' placeholder='请输入手机号' />
                    )
                }
            </Form.Item>
            <Form.Item label='邮箱：'>
                {
                    getFieldDecorator('email', {
                        initialValue: email,
                        rules: [
                            { required: true, message: '邮箱不能为空' }
                        ]
                    })(
                        <Input type='email' placeholder='请输入邮箱' />
                    )
                }
            </Form.Item>
            <Form.Item label='角色：'>
                {
                    getFieldDecorator('role_id', {
                        initialValue: role_id,
                        rules: [
                            { required: true, message: '角色不能为空' }
                        ]
                    })(
                        <Select
                            placeholder='请选择角色'
                        >
                            {
                                this.props.roles.map(role => (
                                    <Option key={role._id} value={role._id}>{role.name}</Option>
                                ))
                            }
                        </Select>
                    )
                }

            </Form.Item>
        </Form>);
    }
}

export default Form.create()(CreateOrUpdateForm);