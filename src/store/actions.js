//包含n个间接更新状态数据的方法的对象

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
 
} from './mutation-types'

export default{
  //获取当前地址信息的异步action
  async getAddress ({commit,state}){
    //1.调用接口请求函数发请求
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    //2.有了结果，提交mutation
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },

  //获取商品分类列表的异步action
  async getCategorys ({commit}){
    //1.调用接口请求函数发请求
    const result = await reqCategorys()
    //2.有了结果，提交mutation
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)
    }
  },

  //获取商家列表的异步action
  async getShops ({commit,state}){
    //1.调用接口请求函数发请求
   const {longitude, latitude} = state
   const result = await reqShops({longitude, latitude})
    //2.有了结果，提交mutation
    if(result.code===0){
      const shops = result.data 
      commit(RECEIVE_SHOPS,shops)
    }
  },

  //保存user的同步action
   saveUser ({commit},user){ //这里面的user是有token的

     const token = user.token

     //将token保存到local中
     localStorage.setItem('token_key',token)
     //将token保存到state中
     commit(RECEIVE_TOKEN,{token})

     //删除user中的token
     delete user.token
     commit(RECEIVE_USER,{user}) //这里面的user不想要token
   },

   //退出登录
   logout({commit}){
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
   },


   //自动登录的异步action
   async autoLogin({commit,state}){
     if(state.token){ 
      const result = await reqAutoLogin()
      if(result.code===0){ //查询到了用户信息，返回给我了
        const user = result.data
        commit(RECEIVE_USER,{user})//最终把user放到状态里面
      }
     }
   
   }
} 