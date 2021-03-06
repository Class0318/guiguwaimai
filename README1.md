# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口

## 2. 开启项目开发
    使用脚手架创建项目: vue-cli3
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与运行

## 3. 搭建项目整体界面结构
    1). 项目路由拆分
        确定路由组件显示的区域
        确定路由是几级路由
    2). App组件组成
        底部导航组件: FootGuide
        导航路由组件: MSite/Search/Order/Profile
    3). vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能方法, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    4). FootGuide: 底部导航组件
        动态class
        编程式路由导航

## 4. 拆分组件
    1). 导航路由组件
        MSite
        Search
        Order
        Profile
    2). 抽取头部组件
        Header
        通过props向子组件传递数据
        通过slot向子组件传递标签
    3). 抽取商家列表组件
        ShopList
    4). 登陆/注册路由组件
        Login
        FooterGuide的显示/隐藏: 通过路由的meta标识

## 5. 启动后台应用并测试
    运行后台项目(启动mongodb服务),
    使用postman测试后台接口, 如果不一致, 与后台工程师对接 / 修改接口文档

## 6. 封装ajax:
### 1). 封装axios: 发ajax请求的函数
    a. 利用请求拦截器, 对所有post请求的请求参数转换为urlencode格式字符串: name=xxx&pwd=yyy
    b. 利用响应拦截器, 让请求成功接收到的数据不是response, 而是response.data
    c. 利用响应拦截器, 对请求异常进行统一的处理, 具体的请求不需要单独再做请求异常处理

### 2). 封装接口请求函数
    根据接口文档定义

### 3). 解决ajax的跨越域问题
    配置代理: vue.config.js ==> webpack-dev-server ==> http-proxy-middleware ==> 配置
    对代理的理解: 对前台应用发出的特定请求进行转发操作

# day02
## 1. 异步显示数据
    1). 封装ajax: 
        ajax请求的函数: 封装axios
        接口请求函数: 根据接口文档定义
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    2). vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    3). 组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据
     
## 2. 异步显示分类轮播
    通过vuex获取categorys数组(发请求, 读取)
    对根据categorys计算生成二维数组
        自定义实现
        使用lodash库的工具函数: chunk()
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用watch+$nextTick( () =>{界面更新之后立即执行})
        2). 使用回调+$nextTick()
        3). 利用dispatch()返回的promise	
    使用svg图片实现loading的效果
    
## 3. Star组件
    创建组件, 设计组件的props
    使用组件标签, 并传入相应的标签属性
    完成组件编码: 使用计算属性

### 4. Login组件的纯前台交互功能 
    1). 切换2种登陆方式: loginWay
    2). 手机号格式验证: isRightPhone计算属性
    3). 倒计时的效果: computeTime + setInterval()
    4). 切换密码的显示/隐藏: isShowPwd + transition
    5). 前台表单验证: 使用vee-validate进行声明式表单验证

# day03

### 1. Login组件前后台交互功能
    1). 一次性图形验证码
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 一次性短信验证码
        使用第三方短信平台接口
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
            按需引入打包
            使用Toast/MessageBox/Button
    3). 手机号/验证码登陆
    4). 用户名/密码/验证码登陆
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0: 成功, 保存user/token到state, 保存token到local, 返回到个人中心
    5). 自动登陆
        在初始时, 如果有token, 但没有user信息, 就发请求获取user实现自动登陆
    6). 退出登陆
        清除state中的user和token, 以及local中的token

## 2. token的理解和使用
    1). 作用
        a. 是一个包含特定信息的字符串:　id / 失效的时间
        a. 对请求进行一定的检查限制, 防止恶意请求
        b. 后台部分接口需要进行token验证  ==> 只有请求这些接口时才携带token
    2). 使用流程
        a. 客户端发送登陆的请求, 服务器端进行用户名和密码查询, 
            如果user存在, 根据user的id值生成token(指定了有效期), 将user和token返回给客户端
        b. 客户端接收到登陆成功的响应后, 将token保存localStorage, 将user和token保存在vuex的state
        c. 在请求需要授权检查的接口前(在请求拦截器做)
            如果token不存在, 不发请求, 直接进行错误流程(响应拦截器的错误处理): throw error对象(status: 401)
            如果token存在, 将token添加到请求头中: config.headers.Authorization = token
        d. 在响应拦截器中处理错误
            1). 如果error中没有response
                判断error的status为401, 如果当前没有在登陆页面, 跳转到登陆页面
            2). 如果error中有response, 取出response中的status
                status为: 401: token过期了, 退出登陆(清除local中的token和state中user与token), 并跳转到登陆页面
                status为: 404: 提示访问的资源不存在


# day04

## 1. json的理解和设计
    0. json是什么?
        具有特定结构的字符串
    1. 整体结构
        1). json对象: {key1: value1, key2: value2}  与js对象可以相互转换
        2). json数组: [value1, value2]    与js数组可以相互转换
    2. json的组成
        1). 结构: 数据类型和标识名称  不显示到界面上
        2). 数据/值: 其它, 显示到界面
    3. key是什么?  
        字符串(必须用双向包起来)
    4. value是什么?
        string/number/boolean/{}/[]
    5. 设计
        {}与[]的选择
    6. mock数据与真实数据
        结构要一样, 值可以不一样

## 2. mockjs的理解和使用
    mockjs是什么: 用来提供mock数据接口的js库
    mockjs作用: 拦截ajax请求, 返回根据指定结构生成的随机数据
    mockjs使用: Mock.mock(url, template)

## 3. 使用vuex管理商家相关的数据
    goods
    ratings
    info

## 4. vuex的多模块编码
    1). 为什么vuex要有多模块
        对中大型项目来说, 需要管理的状态数据较多, 不进行多模块方式拆分, mutations/actions模块会比较臃肿
        而一旦将不同模块的数据分别拆分并管理, 再多的状态也不会有此问题
    2). 设计多个模块
        msite
        user
        shop
    3). 每个模块的结构
        export default {
            state,
            mutations,
            actions,
            getters
        }
    4). 将state, mutations, actions, getters拆分到各个模块中
        每个模块中的mutations/actions/getters只能操作当前模块的state数据
        不同模块的mutation可以相同, 但actions和getters不要相同
    5). vuex管理的state结构
        {
          mudule1: {},
          mudule2: {},
          mudule3: {},
        }
    6). 配置:
        new Vuex.Store({
            mutations, // 能看到总状态数据, 能更新任意模块状态数据
            actions, // 能看到总状态数据, 能触发任意mutation调用
            getters, // 基于任意模块状态数据的计算属性
            modules: {
              module1,
              module2
            }
        })
    7). 在组件中与vuex通信
        读取state数据: ...mapState({user: state => state.user.user})
        读取getter数据: ...mapGetters(['totalShopCount'])
        更新状态数据: this.$store.dispatch('actionName')   this.$store.commit('mutationName')    
    
    8). 多个action或mutation同名的问题
        组件中:
            store.dispatch(): 所有匹配的action调用
            store.commit(): 所有匹配的mutation调用
        action(全局/局部)中
            commit(): 所有匹配的mutation调用
        调用顺序
            先全局, 再局部
            多个局部根据配置的先后

## 5. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          modules/shop.js
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模板中直接显示3层表达式
        解决: 使用v-if指令
    3). vue transition动画
        <transition name="xxx">
        xxx-enter-active / xxx-leave-active
          transition
        xxx-enter / xxx-leave-to
          隐藏时的样式