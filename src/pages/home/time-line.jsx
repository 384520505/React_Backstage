// 时间轴

import React, { Component } from 'react';

import { Card, Timeline, Icon } from 'antd';


export default class TimeLine extends Component {
    render() {
        return (
            <Card style={{flex:1}}>
                <Timeline mode="alternate">
                    <Timeline.Item>新版本迭代会</Timeline.Item>
                    <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        <p>联调接口</p>
                        <p>功能验收</p>
                    </Timeline.Item>
                    <Timeline.Item color="red">登陆功能设计</Timeline.Item>
                    <Timeline.Item>权限验证</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        页面排版
                </Timeline.Item>
                </Timeline>
            </Card>
        );
    }
}