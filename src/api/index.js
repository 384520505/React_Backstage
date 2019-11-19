// 对 ajax.js 请求函数进一步封装

import jsonp from 'jsonp';
import { message } from 'antd'; 
import ajax from './ajax.js';


// 登陆请求
export const ReqLogin = (username,password) => ajax( '/login',{ username, password }, 'POST');


// 添加用户请求
export const ReqAddUser = (user) => ajax('/manage/user/add', user , 'POST');



// 使用 jsonp 发送ajax请求，获取天气信息
export const ReqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{} ,(err,data) => {
            // 成功获取数据
            if(!err && data.status === 'success'){
                const { dayPictureUrl,weather } = data.results[0].weather_data[0];
                resolve({ dayPictureUrl,weather });
            } else if(!err && data.status === 200){ //请求成功，但数据获取失败
                message.error(data.message);
            } else{  //请求失败
                message.error(err);
            }
        });
    });
};