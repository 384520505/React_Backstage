一、antd的配置使用
    1.将package.json文件中的scripts对象中的 
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        改变实际上是为加载项目根目录中的 config-overrides.js 中的配置项

    2.自定义主题
        由于antd的样式是通过less文件设计的，但是antd中并没有 加载less文件的 loader 因此需要安装 less less-loader 包

    3.react-router-dom中 Switch模块是 阻止路由继续匹配的，当路由匹配一个后，就不再继续向下匹配

    4.通过 const Item = Form.Item 方式引入的Item 不能放在 import 关键字的前面

    5.高阶组件:
        本质：就是一个函数；
        接受一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传递特定的属性；
        作用：扩展组件的功能；
        高阶组件也是一个高阶函数：接受一个组件函数，返回一个新的组件函数

    6.表单验证的方式：
        （1）声明式验证，在rules中生命相关的验证规则即可
        （2）自定义验证，在rules定义一个 validator 函数，在函数中实现自定义的验证规则





二、开发经验总结
    1.在设置网页样式之前，可以到github中搜索 reset.css 获取css样式重置的文件


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
