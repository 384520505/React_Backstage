import React, { Component } from 'react';

import './login.less'

// 导入图片文件
import Logo from './img/logo.png';

// 导入 Redirect 
import { Redirect } from 'react-router-dom';

// 导入表单组件
import { Form, Icon, Input, Button, message } from 'antd';

// 导入ajax请求文件
import { ReqLogin } from '../../api/index.js';
// 导入user存储文件
import memoryUtils from '../../utils/memoryUtils.js';
import storageUtils from '../../utils/storageUtils';

class Login extends Component {



    handleSubmit = (event) => {
        // 取消表单的默认行为
        event.preventDefault();

        // 对所有表单数据进行验证
        this.props.form.validateFields((err, values) => {
            if(!err){
                // console.log('表单验证成功',values);
                // 发送ajax请求(登陆请求)
                const { username,password } = values;
                ReqLogin(username, password)
                .then(data => {
                    // console.log('成功了',Response.data);
                    // 请求成功
                    if(data.status === 0){
                        message.success('请求成功');
                        // 将user信息在内存中进行存储
                        memoryUtils.user = data.data;
                        // 将user信息在本地磁盘中进行存储
                        storageUtils.saveUser(data.data);
                        // 跳转到后台页面
                        this.props.history.replace('/');
                    } else{
                        // 提示错误信息
                        message.error(data.msg);
                    }
                })
                // .catch(error => {
                //     console.log('失败了',error.message);
                // });
            } else{
                console.log('验证失败');
            }
        });



        // // 获取form对象
        // const form = this.props.form;
        // // 获取表单项的输入数据
        // const values = form.getFieldsValue();
        // console.log(values);
    }


    // 自定义表单的验证
    validPwd = (rules, value, callback) => {
        // rules:验证规则
        // value:表单中的值
        // callback:验证的回调函数
        // 当callback不传参数时，默认表示验证通过
        // 当callback传参数时，根据验证规则是否匹配返回相关的信息
        if(!value){
            callback('密码不能为空');
        } else if(value.length < 4){
            callback('密码长度不能小于4位');
        } else if(value.length > 12){
            callback('密码长不能大于12位');
        } else if(!/^[a-zA-Z0-9]+$/.test(value)){
            callback('用户名必须包含字母/数字/下划线');
        } else {
            callback(); //表示验证通过
        }
    }


    render() {
        const form = this.props.form;
        const { getFieldDecorator } = form;
        
        // 在渲染登陆页面时，判断内存中是否有 user 登陆的信息
        // 多存在 user的登陆信息，跳转到 后台管理界面
        if(memoryUtils.user && memoryUtils.user._id){
            return <Redirect to='/' />
        }
        return (
            <div className='login-page'>
                <header>
                    <img src={Logo} alt="logo" />
                    <h1>React-后台管理系统</h1>
                </header>
                <main>
                    <div className="login-content">
                        <h1>用户登陆</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    // username:获取表单数据的标识符
                                    getFieldDecorator('username', {
                                        // 以下验证方法位声明式验证
                                        // rules是表单的验证规则
                                        rules:[
                                            {required:true , whitespace:true,message:'请输入用户名'},
                                            {min:4,message:'用户名至少为4位'},
                                            {max:12,message:'用户名最多为12位'},
                                            {pattern:/^[a-zA-Z0-9]+$/,message:'用户名必须包含字母/数字/下划线'},
                                        ]
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        // 以下方法为自定义验证
                                        rules:[
                                            {
                                                validator: this.validPwd,
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </main>
            </div>
        );
    }
}

// 高阶函数create
// 通过Form.create方法创建将Login组件包裹起来，并且传入form参数，在form参数中可以实现表单数据的接受
const WrapLogin = Form.create()(Login);

export default WrapLogin;