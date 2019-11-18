// 侧边栏的header

import React from 'react';

import './header.less';
import Logo from '../../assets/images/logo.png';

class Header extends React.Component{
    render(){
        return <header>
            <img src={Logo} alt="logo"/>
            <h1>React 后台</h1>
        </header>
    }
};

export default Header;  