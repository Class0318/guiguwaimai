import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from 'components/Header/Header.vue'
import store from './store'
import Star from 'components/Star/Star.vue'

import './api'

Vue.config.productionTip = true // 禁止在 Vue 启动时的生产提示


//注册全局组件
Vue.component('Header', Header)
Vue.component('Star',Star)

new Vue({
    render: h =>h(App),  //函数返回组件标签<App>
    router, //配置路由器
    store,  //配置vuex的store
}).$mount('#app')
