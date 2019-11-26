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

    13.表单验证的方法，是存在 Form组件中的 form 对象的 ，若需要 验证表单 ，需要使用高阶组件，向当前组件中传递 form 对象

    14.实现 table 的后台分页功能： 
        在 table 中的 pagination 对象里  实现 onChange 事件，该事件是页码改变时调用，该事件函数会传递两个参数：
            1）page :当的页码
            2）pagSize：每页的显示数量

    15.从一个页面 跳转到另一个页面 时将数据 也传递到另一个页面的方法：
        使用 路由组件自带的 history.push('path', data) 将数据传递到另一个页面

    16.Promise.all() 方法的介绍：
        Promise.all() 方法 传入一个 数组，若该数组中 具有 多个 Promise 的对象，则该方法将同时进行多个异步的执行操作，这样的效率极其高，
            当这些 Promise 对象在执行过程中，有一个执行失败，则该方法的将进入 reject() 函数中，返回的失败结果是，第一个失败的Promise对象

    17.图片上传过程中，在handleChange函数中 ，传入的参数 file 、 fileList 在这两个参数中， 
        file !== fileList[fileList.length -1] 的，因为这两个是不同的对象，但是实际渲染的是 fileList ，
        但是在渲染中，file 中的某些属性，不是实际需要的，需要进行改变才行，因此要对 fileList中的每一个文件的某些属性都进行改变才行

    18. 文件上传组件中的某些属性的讲解：
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

        fileList: [
            {
                uid: '-1', // 图片文件的唯一标识，一般设置为 负数，防止和内部产生的 id 冲突
                name: 'image.png',  //图片文件的名称
                status: 'done', // 当前图片文件的状态 ， 其状态有 ：uploading：正在上传状态、 done: 已上传完成状态、 error：上传出错、 removed：已删除状态
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',  // 图片上传后的地址
            },
        ],

    19.父组件如何获取子组件的属性或方法
        在父组件为 子组件 绑定 ref 属性，通过ref得到子组件对象，然后调用其方法 （具体ref的使用查看官网文档）

    20.在React中 将html 格式的字符串 渲染成 html 标签的方法
        <span dangerouslySetInnerHTML={{__html:detail}}></span>

    21.在添加一条数据后，并且服务器将该添加的数据返回给前端了，在此可以不使用Ajax重新发送请求来刷新列表，具体的方式如下：
         // 这是 react官方 赞成的 方式 ，基于原本的状态更新数据
            this.setState(state => ({
                roles: [...state.roles, result.data]
            }));

            state.roles 是原有状态中的数据，
            该方式的好处是，在不改变 roles 状态的前提下，向 roles 中添加数据

    22.setState() 更新状态的两种写法：
        1）setState(updater,[callback]),
            updater为 返回stateChange对象的函数 (state,props) => stateChange
            接收的state 和 props 为当前组件的 状态
        2）setState(stateChange,[callback])
            setChange为对象，
            callback是可选的回调函数，在状态更新之前且界面更新之后才执行
        总结：
            setState() 中对象的方式的更新状态是函数方式的简写形式
                如果新状态不依赖于原状态 ===》 使用对象方式
                    如： this.setState({count:3});
                如果新状态依赖于原状态 ===》 使用函数方式
                    如： this.setState((state) => ({count:state.count + 1}));
            如果需要在setState() 后获取最新的转台数据，在第二个callback函数中读取

    23.setState() 更新状态是同步还是异步？
        1）执行setState() 函数的位置？
            在react控制的回调函数中：生命周期钩子函数中 / react 事件监听回调函数中
            非react控制的异步回调函数中：定时器回调 / 原生事件监听回调 / promise回调 / ...
        2）异步 or 同步 ？
            在react中的相关回调中 setState() 是异步的
                如以下几种情况是异步的：
                    <!-- react 的生命周期钩子函数中 -->
                    1.componentWillMount(){this.setState({count:2})}
                    <!-- react 的事件监听回调中 -->
                    2.onClick = () => {this.setState((state) => ({count: state.count + 1}))}
            在其他异步回调中 setState() 是同步的
                如以下几种情况是同步的：
                    <!-- 在定时器回调中 -->
                    1.handleOk = () => {
                        setTimeOut(() => {
                            this.setState((state) => ({count: state.count + 1}));
                        },1000);
                      }
                    <!-- 在原生事件监听回调中 -->
                    2.const div = this.refs.div;
                      div.onclick = () => {
                          this.setState((state) => ({count: state.count + 1}));
                      }
                    <!-- 在 promise 回调中 -->
                    3.handleOk = () => {
                        promise.resolve()
                        .then(() => {
                            this.setState((state) => ({count:state.count + 1}));
                        });
                      }
        关于异步的setState() 
            1) 多次调用如何处理？
                setState({}): 采用对象的方式改变状态，在多次调用的情况下，会将这些改变的状态合并为一次更新，然后只调用一次 render() 函数更新界面 ---在此过程中，多次改变的状态，将合并为一次对状态进行改变，界面的更新也将合并成一次进行更新
                    如：onClick = () => {
                        <!-- 采用函数的方式更新状态 参数 state 或者 props, updater 函数中接收的 state 和 props 都保证为最新 -->
                        this.setState((state) => ({count:state.count + 1}));

                        this.setState((state) => ({count:state.count + 1}));

                        <!-- 以上通过函数的方式更新state的状态，更新后 state.count 的值将加 2 -->
                    }
                    在 render() 函数中 count的值将在原有的基础上加 2

                    onClick = () => {
                        <!-- 采用对象的方式更新状态  -->
                        this.setState({count: this.state.count + 1});

                        this.setState({count: this.state.count + 1});
                        
                        <!-- 通过以上的两种方式 更新的state的状态，将对需要更新的状态进行合并后在更新，因此更新后的 count 的值 将只加 1 -->
                    }
                    在 render() 函数中 count 的值 将在原有的基础上加 1

            2) setState(fn): 采用函数的方式改变状态，在多次调用的情况下，对这些改变的状态不进行合并，而是多次更新     状态，然后只调用一次 render() 函数更新界面---在次过程中，多次改变的状态将不行合并，而是多次改变状     态，界面的更新将合并为一次进行更新

    24.setState() 函数的面试题  ( @数字：表示第几次执行 )
        state={count:0}

        componentDidMount(){
            this.setState({count: this.state.count + 1});  //this.state.count --> 0
            this.setState({count: this.state.count + 1});  //this.state.count --> 0
            console.log(this.state.count);  @2-->0

            this.setState((state) => {count: state.count + 1});  //this.state.count -->2
            this.setState((state) => {count: state.count + 1});  //this.state.count -->3
            console.log(this.state.count);  @3-->0

            setTimeOut(() => {
                this.setState({count: this.state.count + 1});  //this.state.count -->6
                console.log('setTime1',this.state.count);  @9-->6

                this.setState({count: this.state.count + 1});   //this.state.count -->7
                console.log('setTime2',this.state.count);  @11-->7
            },0);

            promise.resolve()
            .then(() => {
                this.setState({count: this.state.count + 1});  //this.state.count -->4
                console.log('promise1',this.state.count);  @6-->4

                this.setState({count: this.state.count + 1});  //this.state.count -->5
                console.log('promise2',this.state.count);  @7-->6
            });
        }

        render(){
            console.log(this.state.count)  @1-->0   @4-->3  @5-->4  @6-->5  @8-->6  @10-->7

            return (<div>
                hello
            </div>);
        }
    
    25.Component存在的问题？
        1）父组件重新执行 render() 函数，子组件也会重新执行子组件的 render() 函数，即使没有发生任何状态的改变
        2）若在父组件中执行 setState() 函数，即使没有更新任何状态，也会重新执行 render() 函数

    26.解决Component存在的问题
        1.原因：组件的shouldComponentUpdate() 生命周期函数 默认返回的true ，即使数据没有发生变化， render() 函数都会重新执行
        2.解决方法1：重写shouldComponentUpdate()函数， 判断数据是否有发生变化，若发生变化，返回true， 否则返回false
            如：shouldComponentUpdate(nextPorps, nextState){
                    if(this.props.xxx === nextProps.xxx && this.state.xxx === nextState.xxx){
                        return false;
                    }else {
                        return true;
                    }
                }
        3.解决方法2：使用PureComponent 代替 Component 
        4.说明：一般都使用 PureComponent 来优化组件性能

    27.PureComponent的基本原理
        1.对 shouldComponentUpdate() 方法重写，实现性能优化
        2.对组件的 新/旧 state 和 props 中的数据进行 浅比较，如果都没有发生变化，那么shouldComponentUpdate() 方     法将返回 false ，否则返回 true
        3.一旦shouldComponentUpdate() 返回false ，组件将不再执行用户更新的 render() 函数





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


四、未解决的Bug 
    1.在修改商品界面中，所属类别 为自动获取数据
    2.在商品管理中，点击 详情 和 修改 按钮后，在点击返回按钮，无法返回到原有的页面


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
