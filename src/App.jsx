import React from 'react';
// import { Button , message} from 'antd';

// 导入路由相关的包
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 导入路由组件包
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
// import NotFound from './pages/notfound/404_page';

class App extends React.Component{

    render(){
        return (
            <BrowserRouter>
            {/* Switch的作用的是：当路由匹配上一个后，就不再匹配后后面的路由了 */}
                <Switch>
                    <Route path='/login' component={Login} ></Route>
                    <Route exact path='/home' component={Admin} ></Route>
                    <Route path='/' component={Admin} ></Route>
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;