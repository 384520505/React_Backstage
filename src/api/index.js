// 对 ajax.js 请求函数进一步封装

import jsonp from 'jsonp';
import { message } from 'antd'; 
import ajax from './ajax.js';


// 登陆请求
export const ReqLogin = (username,password) => ajax( '/login',{ username, password }, 'POST');

// 添加用户请求
export const ReqAddUser = (user) => ajax('/manage/user/add', user , 'POST');

// 获取商品的分类数据
export const ReqCategoryData =(parentId) => ajax('/manage/category/list',{parentId},'GET');

// 更新品类名称
export const ReqUpdateCategory = ({ categoryId,categoryName }) => ajax('/manage/category/update',{ categoryId,categoryName },'POST');

// 添加商品类别
export const ReqAddCategory = ({ parentId,categoryName }) => ajax('/manage/category/add',{ parentId,categoryName },'POST');

// 获取商品分页列表
export const ReqGetProductList = ({pageNum,pageSize}) => ajax('/manage/product/list',{pageNum,pageSize},'GET');

// 获取商品搜索分类列表
export const ReqGetSearchProductList = ({pageNum, pageSize, searchName,searchType}) => ajax('/manage/product/search',{ pageNum,  pageSize, [searchType]:searchName },'GET');

// 获取单个商品所属类别信息
export const ReqGetProductClass = (categoryId) => ajax('/manage/category/info',{categoryId},'GET');

// 修改商品的状态 上架 / 下架
export const ReqUpdateStatus = ({ productId, status }) => ajax('/manage/product/updateStatus',{ productId, status } , 'POST');

// 删除商品的图片
export const ReqDeletePicture = (name) => ajax('/manage/img/delete',{ name }, 'POST');

// 添加或更新商品
export const ReqAddOrUpdateProduct = (product) => ajax(`/manage/product/${(product._id ? 'update' : 'add')}` ,product, 'POST');

// 获取角色列表
export const ReqGetRoles = () => ajax('/manage/role/list');

// 添加角色
export const ReqAddRole = (roleName) => ajax('/manage/role/add', { roleName } , 'POST');

// 角色授权
export const ReqUpdateRole = (newRole) => ajax('/manage/role/update',newRole,'POST');

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