// 折线图组件

import React from 'react';

import { Card, Button } from 'antd';

import ReactEcharts from 'echarts-for-react';

class Line extends React.Component{

    getOption = () => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量','库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '库存',
                type: 'line',
                data: [7, 10, 40, 15, 14, 8]
            }]
        }
    }

    getOption1 = () => {
        return {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
    }

    render(){
        return <div>
            <Card>
                <Button type='primary'>更新</Button>
            </Card>
            <Card title='折线图一'>
                <ReactEcharts option={this.getOption()} />
            </Card>
            <Card title='区域折线图二'>
                <ReactEcharts option={this.getOption1()} />
            </Card>
        </div>
    }
};

export default Line;
