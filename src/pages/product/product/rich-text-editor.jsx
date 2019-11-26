//  文本编辑器组件

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import propTypes from 'prop-types';

// 将编辑器的内容转换为 html 格式的 字符串
import draftToHtml from 'draftjs-to-html';
// 将 html 格式的字符串转换为 编辑器的 内容
import htmlToDraft from 'html-to-draftjs';

// 编辑器组件
import { Editor } from 'react-draft-wysiwyg';
// 导入文本文本编辑器的样式文件
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends Component {

    // 数据类型验证
    static propTypes = {
        detail: propTypes.string
    }


    constructor(props) {
        super(props);

        const html = this.props.detail
        // 如果detail的内容存在
        if (html) {
            // 将 html 格式的文件转换为 编辑器的内容格式
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                editorState: ''
            }
        }
    }


    // 编辑器状态改变时，触发该函数
    onEditorStateChange = (editorState) => {
        // 编辑器的内容改变时，更新编辑器的状态
        this.setState({ editorState });
    }

    getEditorContent = () => {
        const { editorState } = this.state;
        if(!editorState){
            return '';
        }
        // 获取字符串 该字符串 是通过 html 格式转换过来的
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        // 将文本编辑器中的内容返回
        return value;
    }

    // 编辑器上传图片的回调函数
    // 参数: file : 当前上传的图片文件
    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve({ data: { link: response.data.url } });
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });
    }


    render() {
        return (
            <div>
                <Editor
                    // 编辑器初始状态
                    editorState={this.state.editorState}
                    // 编辑器输入框样式
                    editorStyle={{ border: '1px solid black', minHeight: '300px', maxHeight: '600px', padding: '10px' }}
                    // 编辑器状态改变时，触发该函数
                    onEditorStateChange={this.onEditorStateChange}
                    // 上传图片功能
                    toolbar={{
                        image: {
                            // 图片预览
                            previewImage: true,
                            // 图片上传回调函数
                            uploadCallback: this.uploadImageCallBack,
                            alt: { present: true, mandatory: true }
                        },
                    }}
                />
            </div>
        );
    }
}

export default RichTextEditor;