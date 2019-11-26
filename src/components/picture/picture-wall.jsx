
import React from 'react';

import { Upload, Icon, Modal, message } from 'antd';

import { ReqDeletePicture } from '../../api/index';

import propTypes from 'prop-types';

import { IMG_BASE_PATH } from '../../utils/constents'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {

    // 验证数据类型
    static propTypes = {
        imgs: propTypes.array,
    }

    constructor(props) {
        super(props);

        const { imgs } = this.props;
        let fileList = [];
        if(imgs && imgs.length > 0){
            fileList = imgs.map((img,index) => ({
                uid:-index,
                name:img,
                status:'done',
                url:IMG_BASE_PATH + img
            }));
        }

        this.state = {
            // 是否大图预览
            previewVisible: false,
            // 大图预览的图片
            previewImage: '',
            // fileList: 上传图片的文件列表 
            fileList
        }
    }

    //   取消大图预览的函数
    handleCancel = () => this.setState({ previewVisible: false });

    //   处理大图预览的函数
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    //   图片上传过程的回调函数，文件上传中、失败、完成都会调用这个回调函数，该方法不止会调用一次
    //  参数：file:当前操作的文件对象、fileList:当前的文件列表、event:上传中服务器响应的内容（高级浏览器才支持）
    handleChange = async ({ file, fileList, event }) => {
        // 当上传的文件状态 为 done 时 ，表示上传成功
        if (file.status === 'done') {
            // 表示文件上传成功
            if (file.response.status === 0) {
                const { name, url } = file.response.data;
                // 将 当前文件的某些属性替换
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url;
                message.success('图片上传成功');
            } else {
                message.error('文件上传失败');
            }
        } else if (file.status === 'removed') { // 表示删除当前文件
            const result = await ReqDeletePicture(file.name);
            if (result && result.status === 0) {
                message.success('图片删除成功');
            } else {
                message.error('图片上传失败');
            }
        } else if (file.status === 'error') { // 表示文件上传失败
            message.error('图片上传失败');
        }

        // 更新 fileList 的状态
        this.setState({ fileList });
    };

    // 获取上传的文件列表
    getImgs = () => {
        return this.state.fileList.map(item => item.name);
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // 图片上传的地址
                    action="/manage/img/upload"
                    //  图片上传列表的内建样式 有： picture-card(卡片样式)、text(文本样式)、picture(列表样式)
                    listType="picture-card"
                    //  接收上传图片的类型 image/* 所有的图片类型
                    accept='image/*'
                    // 上传的图片 发送到后台的参数名称
                    name='image'
                    // 图片列表
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}