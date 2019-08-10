import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate) 

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', { //验证器指定本地化一个东西
  messages: zh_CN.messages,//里面所有中文式的文本
  attributes: {//映射关系 ，真正提示的式对应的提示中文
    name: '用户名',
    phone: '手机号',
    code: '验证码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {//在验证的插件里面有一个对象验证器，自定义一个规则，规则名字叫mobile
  validate: value => {  //加上这个规则，对这个对应的值进行验证处理，验证处理返回布尔值
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'//如果验证失败了，需要提供验证信息，调用这个方法就得到这个提示文本
})//          动态占位
