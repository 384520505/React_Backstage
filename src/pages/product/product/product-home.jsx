// 商品主页面

import React from 'react';

import { Card, Select, Table, Button, Icon, Input, message } from 'antd';

import LinkButton from '../../../components/link-button/linkButton'

import { ReqGetProductList, ReqGetSearchProductList, ReqUpdateStatus } from '../../../api/index.js';

import { PAGE_SIZE } from '../../../utils/constents'

const { Option } = Select;

class ProductHome extends React.Component {

    state = {
        // 数据加载动画
        loading: false,
        // 商品的列表数据
        Products: [],
        // 数据的总数量
        total: 0,
        // 搜索关键字
        searchName: '',
        // 搜索类型 (默认按商品名称搜索)
        searchType: 'productName',
        // 商品的上架或下架状态 1:表示上架， 2：表示下架
        status:1,
    }

    // 获取表格列的定义数据
    getColumns = () => {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                width: '100px',
                title: '价格',
                dataIndex: 'price',
                render: (price) => {
                    return `¥${price}`
                }
            },
            {
                width: '150px',
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    return (
                        <span>
                            <Button
                                type='primary'
                                style={{ marginRight: '5px' }}
                                onClick={() => this.updateStatus(product) }
                            >{ product.status === 1 ? '下架' : '上架' }</Button>
                            <span style={(product.status === 2) ? {color:'red'} : null } >{ product.status === 1 ? '在售' : '已下架' }</span>
                        </span>
                    );
                },
            },
            {
                width: '150px',
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/* 点击详情按钮跳转到详情界面,并且将该商品的详细信息传入详情页面 */}
                            <LinkButton onClick={() => this.props.history.push('/product/detail', product)} >详情</LinkButton>
                            <LinkButton onClick={() => this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    );
                },
            },
        ]
        this.columns = columns;
    };

    // 获取商品的分页列表
    getProductList = async (pageNum) => {
        const { searchType, searchName } = this.state;

        // 将当前的页码存入 this 中，以便别的方法/函数使用该数据
        this.pageNum = pageNum;
        // 获取数据之前 出现加载动画
        this.setState({ loading: true });
        let result;
        // 如果搜索的关键字不为空，表明需要获取的是 搜索列表
        if (this.state.searchName) {
            result = await ReqGetSearchProductList({ pageNum, pageSize: PAGE_SIZE, searchType, searchName });
        } else { // 获取 非搜索的 商品列表
            result = await ReqGetProductList({ pageNum, pageSize: PAGE_SIZE });
        }
        // 数据加载成功后，隐藏加载动画
        this.setState({ loading: false });
        // 数据请求成功
        if (result && result.status === 0) {
            this.setState({
                total: result.data.total,
                Products: result.data.list,
            });
        }
    }

    // 修改上的状态 上架 / 下架
    updateStatus = async (product) => {
        const { _id, status } = product;
        
        // 显示加载动画
        this.setState({loading:true});

        const result = await ReqUpdateStatus({ productId:_id, status:(status === 1) ? 2 : 1 });

        // 隐藏加载动画
        this.setState({ loading:false });

        // 刷新当前列表
        this.getProductList(this.pageNum);
         
        if(result.status === 0){ // 表明请求成功
            message.success('商品状态修改成功')
        } else{
            message.error('商品状态修改失败');
        }
    }

    componentWillMount() {
        // 获取表格的列信息
        this.getColumns();
    }

    componentDidMount() {
        // 获取商品的分页列表
        this.getProductList(1);
    }

    render() {
        const { total, searchName, searchType, loading } = this.state;
        return (
            <Card
                title={
                    <span>
                        <Select defaultValue={searchType} style={{ width: '150px' }} onChange={value => this.setState({ searchType: value })}>
                            <Option value='productName'>按名称搜索</Option>
                            <Option value='productDesc'>按描述搜索</Option>
                        </Select>
                        <Input placeholder='关键字' style={{ width: '150px', margin: '0 15px' }} value={searchName} onChange={event => this.setState({ searchName: event.target.value })} />
                        <Button onClick={() => { this.getProductList(1) }} type='primary'>搜索</Button>
                    </span>
                }
                extra={
                    <Button 
                    type='primary'
                    // 点击跳转到 商品的 添加页面
                    onClick={ () => this.props.history.push('/product/addupdate') }
                    >
                        <Icon type='plus' />
                        添加商品
                    </Button>
                }
            >
                <Table
                    rowKey='_id'
                    bordered
                    loading={loading}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        onChange: (pageNum) => { 
                            this.getProductList(pageNum) 
                        }
                    }}
                    columns={this.columns}
                    dataSource={this.state.Products}
                />
            </Card>
        );
    }
}

export default ProductHome;