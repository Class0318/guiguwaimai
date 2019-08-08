//路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)//使用语法规范，得先声明一下

export default new VueRouter({
    mode:'history',
    routes//应用中所有路由  
})