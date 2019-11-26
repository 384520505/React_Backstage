// 商品管理组件

import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import ProductHome from './product/product-home.jsx';
import ProductDetail from './product/product-detail.jsx';
import ProductAddUpdate from './product/product-add-update.jsx';

class Product extends React.Component{
    render(){
        return (
            <Switch>
                {/* exact: 路径完全匹配 ，只有当路径名完全相同才 匹配该路由 */}
                <Route path='/product' component={ ProductHome } exact />
                <Route path='/product/detail' component={ ProductDetail } />
                <Route path='/product/addupdate' component={ ProductAddUpdate } />
                {/* Redirect 重定向 ，当以上路由都无法匹配时，就进入重定向的路由 */}
                <Redirect to='/product' />
            </Switch>
        );
    }
};

export default Product;
