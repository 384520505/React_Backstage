// 品类管理组件

import React from 'react';

import { Card, Button, Icon, Table, Modal } from 'antd';

import LinkButton from '../../components/link-button/linkButton';

import { ReqCategoryData, ReqUpdateCategory, ReqAddCategory } from '../../api/index'

import AddClassForm from './add-class-form'
import UpdateClassFrom from './update-class-form'

class Category extends React.Component {

    constructor() {
        super();

        this.state = {
            // 是否处于加载状态
            loading: false,
            // 商品一级列表数据
            categoryFirstData: [],
            // 商品二级列表数据
            categorySecondData: [],
            // 获取列表的编号 0：表示获取一级列表; _id: 表示获取二级列表; 默认为0，获取一级列表
            Id: '0',
            // 二级列表的 title
            secondTitle: '',
            // 对话框是否显示,0:表示都不显示， 1：表示显示 添加的对话框 ； 2：表示显示更新的对话框，默认值为 0
            visible: 0
        };
    }


    // 获取一级/二级分类列表的数据
    // 根据 Id的值来判断是一级分类列表还是二级分类列表
    // Id:0 表示一级分类列表
    // Id: _id 表示二级分类列表
    getCategoryData = async (Id) => {
        // 获取商品一级列表数据之前显示加载动画
        this.setState({
            loading: true
        });
        // 根据Id编号 获取相应的数据
        const categoryData = await ReqCategoryData(Id);
        // 表明数据的请求成功
        if (categoryData.status === 0) {
            // 数据请求成功后，将加载动画隐藏
            this.setState({ loading: false });
            if (Id === '0') { //如果 Id 为 0 表明 获取的一级分类列表的数据
                // 将获取的数据传递到 categoryFirstData 中
                this.setState({ categoryFirstData: categoryData.data });
            } else { // 表明获取的是二级分类的数据
                this.setState({ categorySecondData: categoryData.data });
            }
        }
    }

    // 获取 table 的列数组
    getColums = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                align: 'center',
                render: (category) => <span>
                    <LinkButton onClick={() => { this.showUpdateClass(category) }}>修改分类</LinkButton>
                    {/* 参数 category 为当前列的数据对象  */}
                    {
                        // null 表示什么都不渲染
                        (this.state.Id === '0') ? (<LinkButton onClick={() => { this.showSecondData(category) }}>查看子分类</LinkButton>) : null
                    }
                </span>,
            },
        ];
    }

    // 显示二级列表
    showSecondData = (category) => {
        this.setState({ Id: category._id, secondTitle: category.name });
        // 获取二级列表数据
        this.getCategoryData(category._id);
    }


    // 返回一级列表
    returnFirstList = () => {
        // 将Id设置为0
        this.setState({ Id: '0' });
    }


    // 对话框取消事件
    handleCancel = () => {
        // 重置 form 表单 输入框中的内容
        this.form.resetFields();
        // 将所有对话框隐藏
        this.setState({ visible: 0 });
    }


    // 显示添加类别对话框
    showAddClass = () => {
        // 显示添加类别对话框
        this.setState({ visible: 1 });
    }

    // 显示修改类别对话框
    showUpdateClass = (category) => {
        // 在组件中添加 categoryName 属性 用户获取当前点击 数据的 category.name 值
        // 由于该数据是 点击 “修改分类” 按钮 才创建的 ，因此第一次 执行 render 函数时 ，该值可能不存在，故 若不存在，将其设置为空对象
        this.categoryName = category.name || {};
        this.category = category;
        // 显示修改类别对话框
        this.setState({ visible: 2 });
    }

    // 添加类别数据
    addClass = () => {
        // 获取添加类别对话框中的 parentId 和 categoryName 数据
        const { validateFields } = this.form;
        // 进行表单验证
        validateFields(async (err, values) => {
            if (!err) {
                const { parentId, categoryName } = values;
                // 发送ajax请求，添加数据
                const result = await ReqAddCategory({ parentId, categoryName });
                // 重置 form 表单 输入框中的内容
                this.form.resetFields();
                if (result && result.status === 0) { // 表明数据请求成功
                    // 隐藏对话框
                    this.setState({ visible: 0 });
                    if(this.state.Id === parentId){  // 表明当前界显示的一级/二级列表中的某一项，并且当前添加的数据也是 正在显示的一级/二级列表，因此需要刷新当前界面
                        // 刷新当前列表
                        this.getCategoryData(parentId);
                    } else if(this.state.Id !== '0' && parentId === '0'){ //表明当前界面显示的是二级列表中某一个子分类，但是添加的是一级列表中的内容，因此需要刷新一级列表
                        this.getCategoryData(parentId);
                    } else{ //表明当前界面显示的是一级列表的内容，但是添加的是 二级列表的内容，故不需要刷新任何界面
                        console.log('在一级列表中添加二级列表中的内容');
                    }
                    
                }
            }
        });
    }

    // 修改类别数据
    updateClass = async () => {
        // 获取 categoryName 的值
        const categoryName = this.form.getFieldValue('categoryName');
        const categoryId = this.category._id;
        // 发送ajax请求 修改类别名称
        const result = await ReqUpdateCategory({ categoryId, categoryName });
        // 重置 form 表单 输入框中的内容
        this.form.resetFields();
        if (result && result.status === 0) {
            // 隐藏对话框
            this.setState({ visible: 0 });
            // 刷新当前的列表
            this.getCategoryData(this.category.parentId);

        }
    }

    // 组件将要渲染 生命周期函数
    componentWillMount() {
        this.getColums();
    }

    // 组件初始化完成生命周期函数 一般用于异步函数的执行
    componentDidMount() {

        // 获取商品一级列表数据
        this.getCategoryData(this.state.Id);
    };



    render() {
        return <Card
            title={(this.state.Id === '0') ? ('一级分类列表') : (<span>
                <LinkButton onClick={this.returnFirstList}>一级分类列表</LinkButton>
                <Icon type="caret-right" style={{ margin: '0 5px' }} />
                {this.state.secondTitle}
            </span>)}
            extra={<Button onClick={this.showAddClass} type='primary'><Icon type='plus' />添加</Button>}>
            <Table
                // 使表格带边框
                bordered
                rowKey='_id'
                loading={this.state.loading}
                // 判断 Id 是否为 0 ，若是 0 表示需要获取一级列表， 若不是 0 表示需要获取二级列表
                dataSource={(this.state.Id === '0') ? this.state.categoryFirstData : this.state.categorySecondData}
                columns={this.columns}
                // 分页的配置
                pagination={{ defaultPageSize: 10, showQuickJumper: true }}
            />
            <Modal
                title="添加分类"
                visible={this.state.visible === 1}
                onOk={this.addClass}
                onCancel={this.handleCancel}
            >
                <AddClassForm
                    // 将一级分类列表传入
                    categoryFirstData={this.state.categoryFirstData}
                    // 将当前的 parentId 传入
                    parentId={this.state.Id}
                    setForm={(form) => { this.form = form }}
                />
            </Modal>
            <Modal
                title="更新分类"
                visible={this.state.visible === 2}
                onOk={this.updateClass}
                onCancel={this.handleCancel}
            >
                {/* setForm函数获取 子组件中的 form 对象 */}
                <UpdateClassFrom categoryName={this.categoryName} setForm={(form) => { this.form = form }} />
            </Modal>
        </Card>
    }
};

export default Category;
