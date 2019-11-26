// 商品详情 主页面

import React from 'react';

import './product-detail.less'

import { Card, List, Icon } from 'antd';

import { ReqGetProductClass } from '../../../api/index';

import { IMG_BASE_PATH } from '../../../utils/constents'

class ProductDetail extends React.Component {

    state = {
        // 当前类别的 id 编号
        categoryId: this.props.location.state.categoryId,
        // 父类别的 id 编号
        pCategoryId: this.props.location.state.pCategoryId,
        // 商品的图片
        imgs: this.props.location.state.imgs,
        // 一级分类名称
        firstClassName: '',
        // 二级分类名称
        secondClassName: '',
        // 数据是否加载中
        loading: false,
    }

    getProductCategory = async () => {
        const { categoryId, pCategoryId } = this.state;
        // 显示加载动画
        this.setState({ loading: true });

        // 如果当前商品的父类别的 id 为 0 ，表示，当前商品是在一级分类下添加的，因此没有 categoryId 属性
        if (pCategoryId === '0') {
            const result = await ReqGetProductClass(pCategoryId);
            this.setState({ firstClassName: result.data.name });
        } else {    //若当前商品的 pCategoryId 不为 0 表示，当前商品是在二级分类下添加的， 因此具有categoryId

            /**
             * const result1 = await ReqGetProductClass(pCategoryId); //父分类的 数据请求
             * const result2 = await ReqGetProductClass(categoryId); //当前分类的 数据请求
             * 采用上的方式 固然可以实现需要的结果，但是，使用 await 发送两次请求，这样必然会 降低效率，
             *  因为第二次请求必须要等到第一次请求发送成功后才能发送请求，这样的效率 会大大降低。因此可以采用 Paomise.all()方法来实现
             */
            const results = await Promise.all([ReqGetProductClass(pCategoryId), ReqGetProductClass(categoryId)]);
            // 隐藏加载动画
            this.setState({ loading: false });
            this.setState({
                firstClassName: results[0].data.name,
                secondClassName: results[1].data.name,
            });
        }

    }


    componentDidMount() {
        // 获取当前商品的所属类别
        this.getProductCategory();
    }

    render() {
        const { name, desc, detail, price } = this.props.location.state;
        const { firstClassName, secondClassName, loading } = this.state;
        return (
            <Card
                title={
                    <span>
                        <Icon
                            type="swap-left" style={{ fontSize: '20px', marginRight: '15px', color: 'green', cursor: 'pointer' }}
                            onClick={() => this.props.history.goBack()}
                        />
                        商品详情
                    </span>
                }
            >
                <List
                    bordered
                    loading={loading}
                >
                    <List.Item>
                        <span className='detail-left'>商品名称：</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>商品描述：</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>商品价格：</span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>所属分类：</span>
                        <span>{firstClassName}{secondClassName ? ` ---> ${secondClassName}` : null}</span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>商品图片：</span>
                        <span>
                            {
                                this.state.imgs.map(img => <img
                                    key={img}
                                    style={{ width: '200px', height: '200px', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', margin: '0 10px' }}
                                    src={IMG_BASE_PATH + img}
                                    alt={img} />
                                )
                            }
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </List.Item>
                </List>
            </Card>
        );
    }
}

export default ProductDetail;