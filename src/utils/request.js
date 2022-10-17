//基于axios封装网络请求

import theAxios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

//JSONBig.parse() 把json格式的字符串转为JavaScript 对象
//JSONBig.stringify()  把JavaScript对象转为JSON格式字符串
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000, //20秒超时时间
  // 自定义后端返回的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    //axios 默认会在内部这样来处理后端返回的数据
    // return data
  }],

})
//请求拦截器
axios.interceptors.request.use(function (config) {
  //请求发起会经过这里
  //config:本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  //注意：这里务必返回config配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
// axios({
//   url:'请求地址',
//   method:'请求方式',
//   params:{},
//   data:{},
//   headers:{}
// })


//ajax
// import $ from 'jquery'
// export default $.ajax
// $.ajax({
//   url: '请求地址',
//   type: '请求方式',
//   data: {}, //没有params
//   headers: {}
// })