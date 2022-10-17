import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index.vue'
import Layout from '../views/layout/index.vue'
import Home from '../views/home/index.vue'
import Qa from '../views/qa/index.vue'
import Vide from '../views/video/index.vue'
import My from '../views/my/index.vue'
import Search from '../views/search/index.vue'
import Article from '../views/article/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/', component: Layout, redirect: "/home",
    children: [
      { path: '/home', name: 'home', component: Home },   //默认子路由
      { path: '/qa', name: 'qa', component: Qa },
      { path: '/vide', name: 'vide', component: Vide },
      { path: '/my', name: 'my', component: My }
    ]
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/article/:articleId',
    component: Article,
    //开启props传参
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
