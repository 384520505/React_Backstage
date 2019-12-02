// 柱形图组件

import React, { Component } from 'react';

import { Card } from 'antd';

import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from "bizcharts";


export default class BarChart extends Component {

    // 获取柱形图数据
    getData = () => {
        return [
            {
                year: "1951 年",
                sales: 38
            },
            {
                year: "1952 年",
                sales: 52
            },
            {
                year: "1956 年",
                sales: 61
            },
            {
                year: "1957 年",
                sales: 145
            },
            {
                year: "1958 年",
                sales: 48
            },
            {
                year: "1959 年",
                sales: 38
            },
            {
                year: "1960 年",
                sales: 38
            },
            {
                year: "1962 年",
                sales: 38
            }
        ];
    }

    getCols = () => {
        return {
            sales: {
                tickInterval: 20
            }
        };
    }

    componentWillMount() {
        this.data = this.getData();

        this.cols = this.getCols();
    }

    render() {
        return (
            <Card style={{ flex:1,marginRight:'20px'}}>
                <Chart height={400} data={this.data} scale={this.cols} forceFit>
                    <Axis name="year" />
                    <Axis name="sales" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="interval" position="year*sales" />
                </Chart>
            </Card>
        );
    }
} 