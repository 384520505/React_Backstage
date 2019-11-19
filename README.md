一、开发的配置介绍
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
            函数的参数包含三个 rules、value、callback
                // rules:验证规则
                // value:表单中的值
                // callback:验证的回调函数
                // 当callback不传参数时，默认表示验证通过
                // 当callback传参数时，根据验证规则是否匹配返回相关的信息

    7.axios请求函数返回的promise对象

    8.请求跨域问题
        1）跨域的三种情况:
            网路协议的不同：http、https
            主机名的不同
            端口的不同
        2）解决跨域问题
            在使用脚手架创建的 react App 中在package.json文件中添加，服务器代理配置即可
            添加 proxy:'http://localhost:5000'   目标服务器地址;

            在服务器端使用 cors 使服务器支持跨域请求；

            jsonp方式请求，但jsonp方式 只能发送 GET 方式的请求

    9.history对象的用法：
        history对象中有三个常用的方法： push、replace、goBack
        1）push() 方法：实现页面的跳转，该跳转的方式是挨个跳转；
            如：有 A   B   C   D  四个页面，从A -> B , B -> C , C -> D ,在这个过程中顺序是一个接着一个，不会出现中间断链的情况；在调用 goBack() 方法是，是挨个进行返回的；
        2）replace() 方法: 实现页面的跳转，该跳转的方式不是挨个跳转；
            如： A   B   C   D  四个页面，从A -> B , B -> C , C -> D ,在这个 D 过程中，若调用goBack()函数，那么 D 就直接代替 C 然后跳转到 B ，将 C 直接省略
        3）goBack() 方法: 实现页面的返回效果

    10.实现用户登陆的存储
        1）在utils文件夹下创建memoryUtils.js文件，用于在内存中存储用户的登陆信息
            优点：读取、存储速度非常块
            缺点：当用户退出网页、刷新网页、关闭浏览器后，再次打开，用户登陆信息将丢失
        2）在utils文件夹下创建storageUtils.js文件，用于在本地磁盘中存储用户的登陆信息
            优点：长久保存，若用户不进行手动删除，不会丢失
            缺点：读取、存储的速度比较慢
    在开发中因该结合使用两种方法，在网站的根文件中 将storageUtils.js 文件中的信息 读取出来 存储到 memoryUtils.js 中，
    后续在使用时，直接在内存中读取即可

    11.在 render方法中实现页面的跳转的方法：
        导出 react-router-dom 包中的 Redirect 标签，实现页面的跳转
        跳转方式: <Redircet to='path' />

    12.对于非路由组件，若想获取路由组件的 history、location、match 对象，使用withRouter 高阶函数 将该组件包裹即可





二、开发经验总结
    1.在设置网页样式之前，可以到github中搜索 reset.css 获取css样式重置的文件

    2.jsx语法中不允许在 {} 中解析一整个都对象
        如：user:{
            _id:'1234567',
            username:'zhangsan',
            age:'18'
            }
        render(){
            return <div> { user } </div>
        }
    以上写法是错误的

    3.在使用localStorage 对登陆信息进行存储时，在不同版本的浏览器中可能出现不兼容的情况，最好使用 store 第三方包

    4.使用jsonp发送ajax请求，可以使用 jsonp 第三方包

    5.jsonp解决ajax请求跨域的原理
        1).jsonp只能解决GET类型的ajax请求跨域问题
        2).jsonp不是ajax请求，而是一般的get请求
        3).基本原理
            浏览器端：
                动态生成<script>标签来请求后台接口（src 就是接口的url）
                定义好用于接受响应的数据函数（fn）,并将函数名通过请求参数提交给后台（如：callback=fn）
            服务器端：
                接受到请求处理产生的结果数据后，返回一个函数调用js代码，并将结果数据作为实参传入函数调用
            浏览器端：
                收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据

    6.组件的子元素（包括 标签、组件、文本），会通过 children 属性传递给 子组件



三、难点
    1.列表下的子类表选中后，再次刷新页面，该父类表自动展开


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
