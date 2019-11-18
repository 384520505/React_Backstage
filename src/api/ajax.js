/*
异步请求函数
*/
// 封装axios库
// axios函数的返回值是一个promise对象

/**
 * 优化：统一处理请求异常
 */

// 导入axios包
import axios from 'axios';
// 导入antd包
import { message } from 'antd';

// 封装 ajax请求函数 url:请求路径 ， data:请求参数，默认空对象, mothed:请求方式，默认GET方式
export default function ajax(url, data={}, mothed='GET'){

    return new Promise((resolve, reject) => {
        let promise;
        // 1.处理异步请请求
        if(mothed === 'GET'){
            promise = axios.get(url,{
                // GET方式的请求参数
                params:data,
            });
        } else{
            // post请求方式，及传参方式
            promise = axios.post(url, data);
        }

        // 2.异步请求成功
        promise.then(response => {
            // 将请求成功的数据返回
            resolve(response.data);
        }).catch(error => { // 3.请求失败
            // 处理失败信息
            message.error('请求失败:'+ error);
        }); 
    });
}