// 添加角色form 组件
import React, { Component } from 'react';

import { Form, Input } from 'antd';

import propTypes from 'prop-types';

class AddRoleFrom extends Component {

    // 进行数据类型的验证
    static propsTypes = {
        setForm: propTypes.func.required,
    }

    componentWillMount(){
        // 将该组件中的 form 对象传递给 父组件中
        this.props.setForm(this.props.form);
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <Form.Item label='角色名称：' labelCol={{ span: 4, offset: 2 }} wrapperCol={{ span: 15 }}>
                    {
                        getFieldDecorator('roleName', {
                            rules: [
                                { required: true, message: '角色名不能为空' }
                            ]
                        })(
                            <Input placeholder='请输入角色名' />
                        )
                    }
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(AddRoleFrom)