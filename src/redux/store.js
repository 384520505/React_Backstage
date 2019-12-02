// 管理项目状态数据的 store 库

import { createStore, applyMiddleware } from 'redux';
// 解决redux 没有处理异步函数的功能
import thunk from 'redux-thunk';
// 解决 chrome 浏览器 redux 调试窗口的问题
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducer.js';

// 创建 store 存储库， 当执行该函数时，reducer 内部的函数 被第一次调用
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));