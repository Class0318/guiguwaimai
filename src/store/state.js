//包含n个状态属性数据的对象

export default {
  latitude:40.10038,//纬度 
  longitude:116.36867,//经度
  address:{},//地址信息对象
  categorys:[],//分类数组
  shops:[],//商家数组
  user:{},//当前登录用户
  token: localStorage.getItem('token_key'),//当前登录用户对应的token,有可能有值，有可能没值，
  //这样方便后面读token数据，直接从状态里面读就可以。
  //读localStorage对应的文件，读一次就可以了
}