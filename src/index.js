import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux/store.js';
import {Provider} from 'react-redux';

// 导入app模块
import App from './App.jsx';

// 导入存储用户登陆信息相关的包
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';


// 将本地存储的用户信息加载到内存中，提高后期是使用用户信息的读取速度
memoryUtils.user = storageUtils.getUser();

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));