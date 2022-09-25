import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { cloneDeep, isArray, isString, has } from 'lodash-es'
import { useSettingsStore } from './settings'
import { useUserStore } from './user'
import { useTabbarStore } from './tabbar'
import consola from 'consola'
function hasPermission(permissions, route) {
  let isAuth = false
  if (route.meta && route.meta.auth) {
    isAuth = permissions.some((auth) => {
      if (isString(route.meta.auth)) {
        return route.meta.auth === auth
      } else if (isArray(route.meta.auth)) {
        return route.meta.auth.some((routeAuth) => routeAuth === auth)
      }
      __DEV__ &&
        consola.error(
          new Error(`route.meta.auth 必须是字符串或者数组，当前为 ${typeof route.meta.auth}`)
        )
    })
  } else {
    isAuth = true
  }
  return isAuth
}

function filterAsyncRoutes(routes, permissions) {
  return routes.filter((route) => {
    if (hasPermission(permissions, route)) {
      has(route, 'children') && (route.children = filterAsyncRoutes(route.children, permissions))
      return true
    }
    return false
  })
}

function formatBackRoutes(routes, views = import.meta.glob('../../views/**/*.vue')) {
  return routes.map((route) => {
    switch (route.component) {
      case 'Layout':
        route.component = () => import('@/layout/index.vue')
        break
      case 'IframeLayout':
        route.component = () => import('@/layout/iframe.vue')
        break
      default:
        if (route.component) {
          route.component = views[`../../views/${route.component}`]
        }
    }
    if (route.children) {
      route.children = formatBackRoutes(route.children, views)
    }
    return route
  })
}

// 将多层嵌套路由处理成平级
// 累加层级的 breadcrumb
function flatAsyncRoutes(routes, breadcrumb, baseUrl = '') {
  let res = []
  routes.forEach((route) => {
    if (route.children) {
      let childrenBaseUrl = ''
      if (baseUrl == '') {
        childrenBaseUrl = route.path
      } else if (route.path != '') {
        childrenBaseUrl = `${baseUrl}/${route.path}`
      }
      let childrenBreadcrumb = cloneDeep(breadcrumb)
      if (route.meta.breadcrumb !== false) {
        childrenBreadcrumb.push({
          path: childrenBaseUrl,
          title: route.meta.title,
          i18n: route.meta.i18n
        })
      }
      let tmpRoute = cloneDeep(route)
      tmpRoute.path = childrenBaseUrl
      tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutes(route.children, childrenBreadcrumb, childrenBaseUrl)
      childrenRoutes.map((item) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v) => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item
            }
          })
        } else {
          res.push(item)
        }
      })
    } else {
      let tmpRoute = cloneDeep(route)
      if (baseUrl != '') {
        if (tmpRoute.path != '') {
          tmpRoute.path = `${baseUrl}/${tmpRoute.path}`
        } else {
          tmpRoute.path = baseUrl
        }
      }
      // 处理面包屑导航l,false 为了过滤掉undefined
      let tmpBreadcrumb = cloneDeep(breadcrumb)
      if (tmpRoute.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: tmpRoute.path,
          title: tmpRoute.meta.title,
          i18n: tmpRoute.meta.i18n
        })
      }
      tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
      res.push(tmpRoute)
    }
  })
  return res
}

export const useRouteStore = defineStore('route', {
  state: () => ({
    isGenerate: false,
    routes: [],
    currentRemoveRoutes: []
  }),
  getters: {
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    flatRoutes: (state) => {
      return state.routes
        .flatMap((firstLevelRouter) => firstLevelRouter?.children || [])
        .map((item) =>
          item.children
            ? {
                ...item,
                children: flatAsyncRoutes(
                  item.children,
                  [{ path: item.path, title: item.meta.title, i18n: item.meta.i18n }],
                  item.path
                )
              }
            : item
        )
    }
  },
  actions: {
    // 根据权限动态生成路由（前端生成）
    async generateRoutesAtFront(asyncRoutes) {
      const settingsStore = useSettingsStore()
      const userStore = useUserStore()
      const tabbarStore = useTabbarStore()
      let accessedRoutes
      // 如果权限功能开启，则需要对路由数据进行筛选过滤
      if (settingsStore.app.enablePermission) {
        const permissions = await userStore.getPermissions()
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      } else {
        accessedRoutes = cloneDeep(asyncRoutes)
      }
      // 设置 routes 数据
      this.isGenerate = true
      // 过滤没有子集的一级菜单
      this.routes = accessedRoutes.filter((item) => item?.children?.length != 0)
      // 加载常驻标签页
      if (settingsStore.tabbar.enable) {
        tabbarStore.initPermanentTab()
      }
    },
    // 根据权限动态生成路由（后端获取）
    generateRoutesAtBack() {
      const { API_ROUTE } = useRequest()
      return new Promise((resolve) => {
        API_ROUTE().then(async (res) => {
          const settingsStore = useSettingsStore()
          const userStore = useUserStore()
          const tabbarStore = useTabbarStore()
          let asyncRoutes = formatBackRoutes(res)
          let accessedRoutes
          // 如果权限功能开启，则需要对路由数据进行筛选过滤
          if (settingsStore.app.enablePermission) {
            const permissions = await userStore.getPermissions()
            accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
          } else {
            accessedRoutes = cloneDeep(asyncRoutes)
          }
          // 设置 routes 数据
          this.isGenerate = true
          // 过滤一级菜单没有children的菜单
          this.routes = accessedRoutes.filter(
            (item) => has(item, 'children') && isArray(item.children) && item.children.length != 0
          )
          // 初始化常驻标签页
          if (settingsStore.tabbar.enable) {
            tabbarStore.initPermanentTab()
          }
          resolve()
        })
      })
    },
    // 记录 accessRoutes 路由，用于登出时删除路由
    setCurrentRemoveRoutes(routes) {
      this.currentRemoveRoutes = routes
    },
    // 清空动态路由
    removeRoutes() {
      this.isGenerate = false
      this.routes = []
      this.currentRemoveRoutes.forEach((removeRoute) => {
        removeRoute()
      })
      this.currentRemoveRoutes = []
    }
  }
})

export function useRouteOutsideStore() {
  return useRouteStore(piniaStore)
}
