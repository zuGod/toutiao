//统一封装接口方法
//每个方法负责请求一个url地址
//逻辑页面，导入这个接口方法，就能发请求
//好处：请求url路径，可以在这里同意管理
import axios from '@/utils/request.js'
import store from '@/store'

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
//获取用户信息
export const getUserInfo = () => axios({
  url: '/v1_0/user',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${store.state.user.token}`
  }
})
//频道 - 获取所有频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})

//获取用户频道列表
export const getUserChannels = () => axios({
  url: '/v1_0/user/channels',
  method: 'GET'
})

//请求获取文章列表数据
export const getArticles = params => axios({
  url: '/v1_0/articles',
  method: 'GET',
  params
})

export const getSearchSuggestions = q => axios({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q
  }
})
export const getSearchResult = params => axios({
  url: '/v1_0/search',
  method: 'GET',
  params
})

//获取文章详情
export const getArticleById = articleId => axios({
  url: `/v1_0/articles/${articleId}`,
  method: 'GET',

})

//关注用户

export const addFollow = target => axios({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target
  }
})

//取消关注用户

export const deleteFollow = target => axios({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE',
})

//取消收藏
export const addCollect = target => axios({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE',
  data: {
    target
  }
})

//收藏文章
export const deleteCollect = target => axios({
  url: `/v1_0/article/collections`,
  method: 'POST',
  data: {
    target
  }
})

//对文章点赞

export const addLiked = target => axios({
  url: `/v1_0/article/likings`,
  method: 'POST',
  data: {
    target
  }
})

//取消对文章的点赞

export const deleteLiked = target => axios({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE',
  data: {
    target
  }
})

//获取用户评论和回复
export const getComment = params => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params
})

//评论点赞

export const addCommentLike = target => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

//取消评论点赞
export const deleteCommentLike = target => axios({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE',
})

//进行评论

export const addComment = target => axios({
  url: '/v1_0/comments',
  method: 'POST',
  data: {
    target
  }
})

//获取用户信息


export const getUserProfile = target => axios({
  url: '/v1_0/user/profile',
  method: 'GET',
})




export const updateUserProfile = data => axios({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data
})