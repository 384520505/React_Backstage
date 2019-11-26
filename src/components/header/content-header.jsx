// 内容部分头部组件

import React from 'react';
import { withRouter } from 'react-router-dom';

import './content-header.less';

import { getFormatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { ReqWeather } from '../../api/index';
import MenuList from '../../config/MenuConfig';
import LinkButton from '../../components/link-button/linkButton';
import { Modal } from 'antd';

const { confirm } = Modal;

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            getNowDate: '',
            currentUser: getFormatDate(),
            dayPictureUrl: '',
            weather: '',
        };
    }


    // 获取用户信息
    getUser() {
        this.setState({
            currentUser: memoryUtils.user.username,
        });
    };

    // 获取天气数据
    async getWeather() {
        const { dayPictureUrl, weather } = await ReqWeather('武汉');
        this.setState({ dayPictureUrl, weather });
    };


    // 获取当前路由对应的 title
    getTitle() {
        const path = this.props.location.pathname;
        this.title = '';
        // 遍历 MenuList 查找与 path 对应的 元素的 title
        MenuList.forEach(item => {
            // 若找到该元素将该元素的title取出
            if (item.key === path) {
                this.title = item.title;
            } else if (item.children) { //若存在该元素存储children属性，遍历children
                const citem = item.children.find(citem => path.indexOf(citem.key) !== -1);
                if (citem) {
                    this.title = citem.title
                }
            }
        });
    };

    // 是否退出函数
    isExit = () => {
        confirm({
            content: '确认退出？',
            onOk: () => {
                // 点击确认将 内存和磁盘中的user数据清除
                memoryUtils.user = {};
                storageUtils.removeUser();

                // 跳转到登陆页面
                this.props.history.replace('/login');
            }
        });
    }


    // 该生命周期函数，一般用于处理 异步函数，在第一次 render函数执行前执行
    componentWillMount() {

        // 获取当前的user信息
        this.getUser();

        // 获取天气数据
        this.getWeather();

        this.dateTimerID = setInterval(() => {
            this.setState({
                getNowDate: getFormatDate(),
            });
        }, 1000);
    }


    // 生命周期结束函数
    componentWillUnmount() {
        // 当组件的生命周期结束时，将定时器关闭
        clearInterval(this.dateTimerID);
    }



    render() {


        // 获取title
        this.getTitle();

        return (<div className='content-header'>
            <div className="header-top">
                <span>欢迎</span>
                <span id='currentUser'>{this.state.currentUser}</span>
                <LinkButton onClick={this.isExit}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{this.title}</div>
                <div className="header-bottom-right">
                    <span>{this.state.getNowDate}</span>
                    <img src={this.state.dayPictureUrl} alt="weather" />
                    <span>{this.state.weather}</span>
                </div>
            </div>
        </div>);
    }
}

const HeaderRouter = withRouter(Header);
export default HeaderRouter;