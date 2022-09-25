/*
 * @Description:menu路由解析
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-09-13 09:15:51
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { resolveRoutePath } from '@/util'
import path from 'path-browserify'
import { cloneDeep } from 'lodash-es'
import { useSettingsStore } from './settings'
import { useRouteStore } from './route'

function getDeepestPath(routes, rootPath = '') {
  let retnPath
  if (routes.children && !routes.component) {
    if (
      routes.children.some((item) => {
        return item.meta.sidebar != false
      })
    ) {
      for (let i = 0; i < routes.children.length; i++) {
        if (routes.children[i].meta.sidebar != false) {
          retnPath = getDeepestPath(routes.children[i], resolveRoutePath(rootPath, routes.path))
          break
        }
      }
    } else {
      retnPath = getDeepestPath(routes.children[0], resolveRoutePath(rootPath, routes.path))
    }
  } else {
    retnPath = resolveRoutePath(rootPath, routes.path)
  }
  return retnPath
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    actived: 0
  }),
  getters: {
    allMenus() {
      const settingsStore = useSettingsStore()
      const routeStore = useRouteStore()
      let routes
      if (settingsStore.menu.menuMode === 'single') {
        routes = [{ children: [] }]
        routeStore.routes.map((item) => {
          const children = item.children ?? []
          routes[0].children.push(...children)
        })
      } else {
        routes = routeStore.routes
      }
      return routes
    },
    sidebarMenus() {
      return this.allMenus.length > 0 ? this.allMenus[this.actived].children : []
    },
    sidebarMenusFirstDeepestPath() {
      const filterUnfinished = (arr) => {
        const copyArr = cloneDeep(arr)
        return unref(copyArr).filter((item) => {
          if (Reflect.has(item, 'children')) {
            item.children = filterUnfinished(item.children)
            if (item.children.length === 0) {
              return false
            }
          }
          return !item.meta.none
        })
      }

      const filterUnfinishedMenus = filterUnfinished(this.sidebarMenus)
      return this.allMenus.length > 0 ? getDeepestPath(filterUnfinishedMenus[0]) : '/'
    },
    defaultOpenedPaths() {
      const routeStore = useRouteStore()
      let defaultOpenedPaths = []
      routeStore.routes.map((item) => {
        item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
        item.children &&
          item.children.map((child) => {
            child?.meta?.defaultOpened &&
              defaultOpenedPaths.push(path.resolve(item.path, child.path))
          })
      })
      return defaultOpenedPaths
    }
  },
  actions: {
    // 设置主导航
    setActived(data) {
      if (typeof data === 'number') {
        // 如果是 number 类型，则认为是主导航的索引
        this.actived = data
      } else {
        // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
        this.allMenus.map((item, index) => {
          if (
            item?.children?.some((r) => {
              return data.indexOf(r.path + '/') === 0 || data == r.path
            })
          ) {
            this.actived = index
          }
        })
      }
    }
  }
})

export function useMenuOutsideStore() {
  return useMenuStore(piniaStore)
}
