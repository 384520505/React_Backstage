// 首页组件

import React from 'react';

import { Card, Icon, Statistic } from 'antd';

import './home.less'

import LineChart from './line-chart.jsx';
import BarChart from './bar-chart.jsx';
import TimeLine from './time-line.jsx';

class Home extends React.Component {
    render() {
        return <div className='home' >
            <div className='topElement'>
                <div className='top-left'>
                    <Card
                        className='home-card'
                        title='商品总量'
                        extra={<Icon type="question-circle" />}
                        headStyle={{ backgroundColor: '#eee', fontSize: '20px' }}
                    >
                        <Statistic className='statis' value={112893} suffix='个' />
                        <Statistic
                            style={{ marginTop: '5px' }}
                            value={'周同比11.28%'}
                            precision={2}
                            valueStyle={{ color: '#3f8600', fontSize: '16px' }}
                            suffix={<Icon type="arrow-up" />}
                        />
                        <Statistic
                            style={{ marginTop: '5px' }}
                            value={'日同比9.3%'}
                            precision={2}
                            valueStyle={{ color: '#cf1322', fontSize: '16px' }}
                            suffix={<Icon type="arrow-down" />}
                        />
                    </Card>
                </div>
                <div className='top-rigth'>
                    <LineChart className='lineChart' />
                </div>
            </div>
            <div className='chartlayout'>
                <BarChart className='barchart' />
                <TimeLine className='timeline' />
            </div>
        </div>
    }
};

export default Home;
