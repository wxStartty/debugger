import { createRouter, createWebHashHistory } from 'vue-router'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useUserOutsideStore } from '@/store/modules/user'
import { useRouteOutsideStore } from '@/store/modules/route'
import { useMenuOutsideStore } from '@/store/modules/menu'
import { useTabbarOutsideStore } from '@/store/modules/tabbar'
import { keepAliveHelper, generateAsyncRouter } from './helper'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useTitle } from '@/hooks/useTitle'
import asyncRoutes from './asyncRoutes'
import { constantRoutes } from './system/settingRouter'
import '@/assets/styles/nprogress.scss'
const { isLoading } = useNProgress()

// 免登录白名单
const noLoginWhitelist = ['/login']
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  const settingsOutsideStore = useSettingsOutsideStore()
  const userOutsideStore = useUserOutsideStore()
  const routeOutsideStore = useRouteOutsideStore()
  const menuOutsideStore = useMenuOutsideStore()
  const tabbarOutsideStore = useTabbarOutsideStore()
  // 是否开启进度条
  settingsOutsideStore.app.enableProgress && (isLoading.value = true)
  // 根据token判断是否已登录
  if (userOutsideStore.isLogin) {
    // 是否已根据权限动态生成并挂载路由
    if (routeOutsideStore.isGenerate) {
      // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
      settingsOutsideStore.menu.menuMode !== 'single' && menuOutsideStore.setActived(to.path)
      if (to.name) {
        if (to.matched.length !== 0) {
          // 如果已登录状态下，进入登录页会强制跳转到控制台页面
          if (to.name == 'login') {
            next({
              name: 'dashboard',
              replace: true
            })
            // 如果未开启控制台页面，则默认进入第一个固定标签栏或者侧边栏导航第一个模块
          } else if (!settingsOutsideStore.dashboard.enable && to.name == 'dashboard') {
            if (
              settingsOutsideStore.tabbar.enable &&
              tabbarOutsideStore.list.some((v) => v.isPin)
            ) {
              let fullPath
              for (let i = 0; i < tabbarOutsideStore.list.length; i++) {
                if (tabbarOutsideStore.list[i].isPin) {
                  fullPath = tabbarOutsideStore.list[i].fullPath
                  break
                }
              }
              next({
                path: fullPath,
                replace: true
              })
            } else if (menuOutsideStore.sidebarMenus.length > 0) {
              next({
                path: menuOutsideStore.sidebarMenusFirstDeepestPath,
                replace: true
              })
            } else {
              next()
            }
          } else {
            next()
          }
        } else {
          // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
          next({
            path: '/404'
          })
        }
      } else {
        next()
      }
    } else {
      await generateAsyncRouter(router, asyncRoutes)
      next({ ...to, replace: true })
    }
  } else {
    if (!noLoginWhitelist.includes(to.path)) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  const settingsOutsideStore = useSettingsOutsideStore()
  settingsOutsideStore.app.enableProgress && (isLoading.value = false)
  // 设置标题
  useTitle(to)
  // 维护keep-alive缓存
  keepAliveHelper(to, from)
})

async function setupRouter(app) {
  await generateAsyncRouter(router, asyncRoutes)
  app.use(router)
}
export { router, setupRouter }
