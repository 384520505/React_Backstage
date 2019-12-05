const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 针对antd实现按需打包：使用babel-plugin-import包 根据 导入的组件来打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包需要的样式
    }),

    // 使用less-loader对源码中的less的变量进行从新指定
    addLessLoader({
        javascriptEnabled: true,
        // 界面的主题颜色
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);