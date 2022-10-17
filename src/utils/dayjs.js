import Vue from 'vue'
import dayjs from 'dayjs'
//dayjs默认为英文，配置为中文
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
//定义一个全局过滤器，然后就可以在任何组件的模板中使用了
//参数1：过滤器名称
//参数2：过滤器函数
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
