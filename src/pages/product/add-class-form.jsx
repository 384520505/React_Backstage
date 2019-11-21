// 添加分类 Form 表单组件

import React from 'react';

import PropTypes from 'prop-types';

import { Form, Select, Input } from 'antd';

const { Option } = Select;

class AddClassFrom extends React.Component {

    // 进行数据的类型的验证
    static propsType = {
        categoryFirstData: PropTypes.array.isRequired,
        setForm: PropTypes.func.isrequired,
        parentId: PropTypes.string.isrequired
    }


    componentWillMount() {
        this.props.setForm(this.props.form);
    }


    render() {
        // 获取getFieldDecorator方法 验证表单
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: this.props.parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    this.props.categoryFirstData.map(item => <Option key={item._id} value={item._id}>{ item.name }</Option>)
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }
                </Form.Item>
            </Form>
        );
    }
}

// 使用高阶函数实现表单验证
export default Form.create()(AddClassFrom);