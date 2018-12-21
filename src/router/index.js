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
    path: '/company',
    component: Layout,
    redirect: '/company/info',
    name: 'Company',
    meta: { title: '企业客户', icon: 'company' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: '客户信息', icon: 'info' }
      },
      {
        path: 'auth_code',
        name: 'AuthCode',
        component: () => import('@/views/auth_code/index'),
        meta: { title: '语音验证码', icon: 'auth_code' }
      },
      {
        path: 'notification',
        name: 'Notification',
        component: () => import('@/views/notification/index'),
        meta: { title: '语音通知', icon: 'notification' }
      },
      {
        path: 'call',
        name: 'Call',
        component: () => import('@/views/call/index'),
        meta: { title: '语音通话', icon: 'call' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' }
        // children: [
        //   {
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: { title: 'Menu1-1' }
        //   },
        // {
        //   path: 'menu1-2',
        //   component: () => import('@/views/nested/menu1/menu1-2'),
        //   name: 'Menu1-2',
        //   meta: { title: 'Menu1-2' },
        //   children: [
        //     {
        //       path: 'menu1-2-1',
        //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //       name: 'Menu1-2-1',
        //       meta: { title: 'Menu1-2-1' }
        //     },
        //     {
        //       path: 'menu1-2-2',
        //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //       name: 'Menu1-2-2',
        //       meta: { title: 'Menu1-2-2' }
        //     }
        //   ]
        // },
        // {
        //   path: 'menu1-3',
        //   component: () => import('@/views/nested/menu1/menu1-3'),
        //   name: 'Menu1-3',
        //   meta: { title: 'Menu1-3' }
        // }
        // ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
