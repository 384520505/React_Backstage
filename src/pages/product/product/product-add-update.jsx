// 添加/更新商品 页面

import React from 'react';

import { Card, Icon, Button, Input, Form, Cascader, message } from 'antd';

import { ReqCategoryData, ReqAddOrUpdateProduct } from '../../../api/index';

import PictureWall from '../../../components/picture/picture-wall'

import RichTextEditor from './rich-text-editor';

const { TextArea } = Input;

class ProductAddUpdate extends React.Component {

    constructor(props) {
        super(props);
        // 创建一个 ref 的容器，将他保存在 组件的 getImgs 属性中
        this.getImgs = React.createRef();
        this.getDetail = React.createRef();
    }



    state = {
        // 数据加载中
        loading: false,
        // 级联选择列表的数据
        options: [],
        // 商品对象
        product: {},
    };


    // 动态加载数据
    // selectedOptions  被选中的那些选项 ，可以有多个，  selectedOptions 是一个数组 
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        // 显示加载动画
        targetOption.loading = true;

        // 获取当前分类下的 子分类数据
        const result = await this.getCategorydata(targetOption.value);

        // 获取到数据后，隐藏加载动画
        targetOption.loading = false;

        if (result && result.status === 0) { // 成功获取数据
            // 如果该分类下有数据，添加子分类列表，若没有数据则不添加子列表
            if (result.data.length > 0) {
                const data = result.data.map(item => ({
                    label: item.name,
                    value: item._id,
                    isLeaf: true,
                }));
                // 添加子类表
                targetOption.children = data;
            } else {
                // 若该分类下没有子分类，将该选项设置为叶子选项
                targetOption.isLeaf = true
            }
            // 刷新数据
            this.setState({ options: this.state.options });
        }
    }


    // 验证 商品的价格 的表单
    verifyPrice = (rules, value, callback) => {
        // value * 1  是将 value的值转换为 number 类型
        if (value * 1 < 0) {
            callback('商品的价格不能小于零');
        } else {
            callback();  //验证通过
        }
    }

    // 获取分类列表的数据
    getCategorydata = async (categoryId) => {

        // 显示数据加载动画
        this.setState({ loading: true });
        // 获取分类数据
        const result = await ReqCategoryData(categoryId);

        // 隐藏加载动画
        this.setState({ loading: false });
        // 数据获取成功
        if (result && result.status === 0) {
            // 表示获取的是一级分类列表
            if (categoryId === '0') {
                const data = result.data.map(item => ({
                    label: item.name,
                    value: item._id,
                    isLeaf: false,
                }));
                this.setState({
                    options: data
                });
            } else { //表示获取的 二级列表
                // 将获取的数据返回出去
                return result;
            }
        }

    }


    // 表单提交函数
    submit = () => {
        const { validateFields } = this.props.form;
        // 获取子组件中的 getImgs 方法
        const { getImgs } = this.getImgs.current;
        const { getEditorContent } = this.getDetail.current;
        const imgs = getImgs();
        const detail = getEditorContent();

        validateFields(async (err, values) => {
            if (!err) {
                // 1.收集需要的数据
                const { productName, desc, price, productCategory } = values;
                let product = { name:productName, desc, price:price*1, imgs, detail };
                // 判断该商品是 一级分类下的 还是 二级分类下的
                if (productCategory.length <= 1) {
                    product.pCategoryId = '0';
                    product.categoryId = productCategory[0];
                } else {
                    product.pCategoryId = productCategory[0];
                    product.categoryId = productCategory[1];
                }
                // 判断是更新商品还是添加商品
                if (this.isUpdate) {
                    product._id = this.product._id;
                }
                // 发送请求
                const result = await ReqAddOrUpdateProduct(product);

                if (result && result.status === 0) {
                    message.success(`${(product._id ? '更新' : '添加')}商品成功`);
                    // 跳转到商品列表界面
                    this.props.history.goBack();
                } else {
                    message.error(`${(product._id ? '更新' : '添加')}商品失败`);
                }

            }
        });
    }

    async componentWillMount() {
        const product = this.props.location.state;
        // 如果 该 界面是点击 修改按钮 进入的 ，就会存在 state 属性
        // isUpdate 表示 是否 修改按钮 点击进入的，如果是将product 转换为 boolean 值，进行标记
        this.isUpdate = !!product;
        this.product = product || {};
        this.categoryClass = [];
        // 商品的更新界面，并且该商品只有一级分类
        if (this.isUpdate && product.pCategoryId === '0') {
            this.categoryClass.push(product.categoryId);
        } else if (this.isUpdate && product.pCategoryId !== '0') { //商品的更新界面，并且该商品有二级分类
            this.categoryClass.push(product.pCategoryId);
            this.categoryClass.push(product.categoryId);
        }
    }

    componentDidMount() {
        // 获取一级分类数据
        this.getCategorydata('0');
    }

    render() {
        // from表单的布局样式
        const fromItemLayout = {
            // label 的布局样式
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 }, //label 左边所占的 空距
            },
            wrapperCol: {
                offset: 1,
                xs: { span: 24 },
                sm: { span: 8 }, //输入控件的宽度值
            },
        }

        // 获取form对象下的表单验证方法
        const { getFieldDecorator } = this.props.form;
        const { name, desc, price, imgs, detail } = this.product;
        return (
            <Card
                title={
                    <span>
                        <Icon
                            style={{ color: 'green', cursor: 'pointer', marginRight: '15px', fontSize: '20px' }}
                            type="swap-left"
                            onClick={this.props.history.goBack}
                        />
                        <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
                    </span>
                }
            >
                <Form {...fromItemLayout}>
                    <Form.Item label='商品名称：'>
                        {
                            getFieldDecorator('productName', {
                                // 控件的初始值
                                initialValue: name,
                                rules: [
                                    { required: true, message: '商品名称不能为空！' }
                                ],
                            })(
                                <Input placeholder='请输入商品名称' />
                            )
                        }
                    </Form.Item>
                    <Form.Item label='商品描述：'>
                        {
                            getFieldDecorator('desc', {
                                // 控件的初始值
                                initialValue: desc,
                                rules: [
                                    { required: true, message: '商品描述不能为空！' }
                                ],
                            })(
                                <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2 }} />
                            )
                        }

                    </Form.Item>
                    <Form.Item label='商品价格：'>
                        {
                            getFieldDecorator('price', {
                                // 控件的初始值
                                initialValue: price,
                                rules: [
                                    { required: true, message: '商品价格不能为空' }
                                ],
                                validator: this.verifyPrice,
                            })(
                                <Input type='number' placeholder='请输入商品价格' addonAfter="元" />
                            )
                        }
                    </Form.Item>
                    <Form.Item label='商品分类：'>
                        {
                            getFieldDecorator('productCategory', {
                                initialValue: this.categoryClass,
                                rules: [
                                    { required: true, message: '商品分类不能为空' }
                                ],
                            })(
                                <Cascader
                                    placeholder='请指定商品的分类'
                                    options={this.state.options}
                                    loadData={this.loadData}
                                />
                            )}

                    </Form.Item>
                    <Form.Item label='商品图片：'>
                        {/* 将 组件 ref 设置为 this.getImgs ，那么该组件就会存储到 当前组件的 ref 容器中，通过 this.getImgs.current 即可访问到 子组件的相关方法 及 属性 */}
                        <PictureWall ref={this.getImgs} imgs={imgs} />
                    </Form.Item>
                    <Form.Item label='商品详情：' labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
                        <RichTextEditor ref={this.getDetail} detail={detail} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);