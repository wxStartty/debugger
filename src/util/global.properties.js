/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-06-10 20:41:13
 * @LastEditors: wsy
 */
import api from '@/api'
import { auth, authAll } from '@/util'
import { router } from '@/router'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useTabbarOutsideStore } from '@/store/modules/tabbar'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import hotkeys from 'hotkeys-js'
import mitt from 'mitt'
import Notify from '@wcjiang/notify'

function globalProperties(app) {
  const settingsOutsideStore = useSettingsOutsideStore()
  const tabbarOutsideStore = useTabbarOutsideStore()
  // 请求
  app.config.globalProperties.$api = api
  // 鉴权
  app.config.globalProperties.$auth = auth
  app.config.globalProperties.$authAll = authAll
  // 标签栏关闭
  app.config.globalProperties.$tabbar = {
    getId: () => {
      return settingsOutsideStore.tabbar.mergeTabs
        ? router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath
        : router.currentRoute.value.fullPath
    },
    closeById: (tabId) => {
      let activedTabId = settingsOutsideStore.tabbar.mergeTabs
        ? router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath
        : router.currentRoute.value.fullPath
      // 如果关闭的标签正好是当前路由，并且标签栏数目大于 1
      if (tabId == activedTabId && tabbarOutsideStore.list.length > 1) {
        let index = ~~Object.keys(tabbarOutsideStore.list).find((i) => {
          return tabbarOutsideStore.list[i].tabId == tabId
        })
        if (index < tabbarOutsideStore.list.length - 1) {
          router.push(tabbarOutsideStore.list[index + 1].fullPath)
        } else {
          router.push(tabbarOutsideStore.list[index - 1].fullPath)
        }
      }
      if (tabbarOutsideStore.list.length > 1) {
        tabbarOutsideStore.remove(tabId)
      } else {
        ElMessage.error('当前只有一个标签页，已阻止关闭')
      }
    },
    close: (to) => {
      let tabId = settingsOutsideStore.tabbar.mergeTabs
        ? router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath
        : router.currentRoute.value.fullPath
      tabbarOutsideStore.remove(tabId)
      router.push(to)
    }
  }
  // 主页面最大化
  app.config.globalProperties.$mainPageMaximize = (status) => {
    settingsOutsideStore.setMainPageMaximize(status)
  }
  dayjs.locale('zh-cn')
  app.config.globalProperties.$dayjs = dayjs
  app.config.globalProperties.$cookies = Cookies
  app.config.globalProperties.$hotkeys = hotkeys
  app.config.globalProperties.$eventBus = mitt()
  app.config.globalProperties.$iNotify = (options) => new Notify(options)
}

export const appGlobalPropertiesPlugin = {
  install(app) {
    globalProperties(app)
  }
}
