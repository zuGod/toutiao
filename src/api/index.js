//统一封装接口方法
//每个方法负责请求一个url地址
//逻辑页面，导入这个接口方法，就能发请求
//好处：请求url路径，可以在这里同意管理
import axios from '@/utils/request.js'

//登录接口
//axios内部，会把参数对象转化成json字符串格式后发后台
//axios内部，会自动携带请求参数（headers）里
export const loginAPI = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
//获取短信验证码
export const sendSmsApi = (mobile) => axios({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET',
})

//频道 - 获取所有频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})