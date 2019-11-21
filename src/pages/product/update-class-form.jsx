// 修改类别表单
import React from 'react';

// 数据类型的验证
import PropsType from 'prop-types';

import { Form,Input } from 'antd';

class UpdateClassFrom extends React.Component{

    // 数据类型的验证
    static propTypes = {
        categoryName:PropsType.string.isRequired,
        setForm:PropsType.func.isRequired
    }


    componentWillMount(){
        // 将 form 对象传入 setForm 函数中
        this.props.setForm(this.props.form);
    }

    render(){
        const { getFieldDecorator  } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName',{
                            // 初始值
                            initialValue:this.props.categoryName
                        })(
                            <Input placeholder='请输入的类别名称' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateClassFrom);