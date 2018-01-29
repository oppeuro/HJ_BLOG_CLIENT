import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import blog from '@/view/blog'
import admin from '@/view/admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/index',
      component: index
    },
    {
      path: '/blog/:_id',
      name: 'blog',
      component: blog
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
