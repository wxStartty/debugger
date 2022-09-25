import { useSettingsOutsideStore } from '@/store/modules/settings'
/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-09 09:18:07
 * @LastEditTime: 2022-06-14 22:20:59
 * @LastEditors: wsy
 */

// 固定路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login/login.vue'),
    meta: {
      title: '登录',
      i18n: 'route.login'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/system/index.vue'),
        meta: {
          title: () => {
            const settingsOutsideStore = useSettingsOutsideStore()
            return settingsOutsideStore.dashboard.title
          },
          i18n: 'route.dashboard'
        }
      },
      {
        path: 'personal/setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          i18n: 'route.personal.setting',
          cache: 'personalEditPassword',
          breadcrumbNeste: [{ title: '个人设置', path: '/personal/setting' }]
        }
      },
      {
        path: 'personal/edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
          i18n: 'route.personal.editpassword',
          breadcrumbNeste: [{ title: '修改密码', path: '/personal/edit/password' }]
        }
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/system/reload.vue')
      }
    ]
  }
]

// 必须最后注册
export const lastRoute = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/system/404.vue'),
  meta: {
    title: '找不到页面'
  }
}
