// 404页面

import React , {Component} from 'react';

import LinkButton from '../../components/link-button/linkButton.jsx';

import './404_page.less';

import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { setHeadTitle } from '../../redux/actions.js';

class NotFound extends Component {

    static propsTypes = {
        setHeadTilte: propTypes.func.isRequired,
    }

    // 返回主界面
    goHome = () => {
        this.props.setHeadTitle('首页');
        this.props.history.replace('/');
    }

    render(){
        return (
            <div className='notfound'>
                <div className="img"></div>
                <div className="text">
                    <h2>404</h2>
                    <p>抱歉，您访问的网页不存在！</p>
                    <LinkButton onClick={this.goHome}>回到首页</LinkButton>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {setHeadTitle}
)(NotFound);