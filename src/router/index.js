import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/views/user/add'),
        name: 'AddUser',
        meta: { title: '新增用户', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        path: 'edit/:username(\\d+)',
        component: () => import('@/views/user/edit'),
        name: 'EditUser',
        meta: { title: '编辑用户', noCache: true },
        hidden: true
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: '客户信息', icon: 'info' }
      }
    ]
  },
  {
    path: '/voice',
    component: Layout,
    redirect: '/voice/manager',
    name: 'Voice',
    meta: { title: '语音管理', icon: 'company' },
    children: [
      {
        path: 'sendYzm',
        name: 'SendYzm',
        component: () => import('@/views/voice/sendYzm'),
        meta: { title: '验证码发送', icon: 'yzmSend' }
      },
      {
        path: 'sendTz',
        name: 'SendTz',
        component: () => import('@/views/voice/sendTz'),
        meta: { title: '语音通知发送', icon: 'tzSend' }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/voice/upload'),
        meta: { title: '录音文件上传', icon: 'upload' }
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    redirect: '/detail/yzm',
    name: 'Detail',
    meta: { title: '明细查询', icon: 'example' },
    children: [
      {
        path: 'yzm',
        name: 'yzm',
        component: () => import('@/views/detail/yzm'),
        meta: { title: '语音验证码话单', icon: 'auth_code' }
      },
      {
        path: 'tz',
        name: 'tz',
        component: () => import('@/views/detail/tz'),
        meta: { title: '语音通知话单', icon: 'notification' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/yzm',
    name: 'Report',
    meta: { title: '统计报表', icon: 'report' },
    children: [
      {
        path: 'yzm',
        name: 'Yzm',
        component: () => import('@/views/report/yzm'),
        meta: { title: '验证码统计报表', icon: 'auth_code' }
      },
      {
        path: 'tz',
        name: 'Tz',
        component: () => import('@/views/report/tz'),
        meta: { title: '通话统计报表', icon: 'notification' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
