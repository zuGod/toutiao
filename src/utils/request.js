//基于axios封装网络请求

import theAxios from 'axios'

const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 //20秒超时时间

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