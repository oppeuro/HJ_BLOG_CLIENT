import Vue from 'vue'
import Router from 'vue-router'
import cookie from '../api/cookie'

const index = () => import('@/view/index');
const blog = () => import('@/view/blog');
const tags = () => import('@/view/tags');
const tag = () => import('@/components/tag');
const tagList = () => import('@/components/tagList');
const about = () => import('@/view/about');
const admin = () => import('@/view/admin');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/index',
      component: index,
      children:[
        {
          path: '/index/page/:page',
          name: 'blogPage',
          component: index
        }
      ]
    },
    {
      path: '/tags',
      name: 'tags',
      component: tags,
      children: [
        {
          path: ':tag',
          component: tag,
        },
        {
          path: '',
          component: tagList,
        }
      ]
    },
    {
      path: '/blog/:_id',
      name: 'blog',
      component: blog
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      beforeEnter: (to, from, next) => {
        if(!cookie.getCookie("HJ_BLOG_USER")) {
          next('/index');
        }
        next();
      }
    }
  ]
})
