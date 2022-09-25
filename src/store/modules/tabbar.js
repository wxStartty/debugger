import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import storage from '@/util/storage'

import { useSettingsStore } from './settings'
import { useUserStore } from './user'
import { useRouteStore } from './route'
import { useKeepAliveStore } from './keepAlive'

// 更新 localstorage 数据
function updateStorage(list, account) {
  let data = JSON.parse(storage.local.get('tabbarPinData')) || {}
  data[account] = list.filter((item) => {
    return item.isPin
  })
  storage.local.set('tabbarPinData', JSON.stringify(data))
}

export const useTabbarStore = defineStore('tabbar', {
  state: () => ({
    list: []
  }),
  actions: {
    // 添加标签页
    add(route) {
      return new Promise((resolve) => {
        const settingsStore = useSettingsStore()
        const userStore = useUserStore()
        let names = []
        route.matched.map((v, i) => {
          if (i > 0) {
            v.components.default.name && names.push(v.components.default.name)
          }
        })
        const tabId = settingsStore.tabbar.mergeTabs
          ? route.meta.activeMenu || route.fullPath
          : route.fullPath
        if (route.name != 'reload') {
          if (!this.list.some((item) => item.tabId == tabId)) {
            this.list.push({
              tabId: tabId,
              fullPath: route.fullPath,
              activeMenu: route.meta.activeMenu,
              title: route.meta.title,
              i18n: route.meta.i18n,
              name: names,
              isPin: false,
              isPermanent: false
            })
          } else {
            this.list.map((item) => {
              if (item.tabId == tabId) {
                item.fullPath = route.fullPath
                item.activeMenu = route.meta.activeMenu
                item.title = route.meta.title
                item.i18n = route.meta.i18n
              }
            })
          }
        }
        // 更新固定标签页的数据，数据会记录在 localstorage 里
        updateStorage(this.list, userStore.account)
        resolve()
      })
    },
    // 添加常驻标签页
    initPermanentTab() {
      const settingsStore = useSettingsStore()
      const routeStore = useRouteStore()
      const tabs = routeStore.flatRoutes
        .filter((item) => item.children?.length)
        .flatMap((item) => item.children)
        .reduce((premanentArr, route) => {
          if (route.meta.permanent) {
            let fullPath = route.meta.breadcrumbNeste[route.meta.breadcrumbNeste.length - 1].path
            let tabId = settingsStore.tabbar.mergeTabs
              ? route.meta.activeMenu || fullPath
              : fullPath
            premanentArr.push({
              tabId: tabId,
              fullPath: fullPath,
              activeMenu: route.meta.activeMenu,
              title: route.meta.title,
              i18n: route.meta.i18n,
              name: route.name,
              isPin: false,
              isPermanent: true
            })
          }
          return premanentArr
        }, [])
      // 常驻的标签页添加到标签栏开头
      tabs.length && this.list.unshift(...tabs)
    },
    // 删除指定标签页
    remove(tabId) {
      const userStore = useUserStore()
      const keepAliveStore = useKeepAliveStore()
      let keepName = [],
        removeName = []
      this.list.map((v) => {
        if (v.tabId == tabId) {
          removeName.push(v.name)
        } else {
          keepName.push(v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      let name = []
      removeName.map((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      this.list = this.list.filter((item) => {
        return item.tabId != tabId
      })
      updateStorage(this.list, userStore.account)
      // 如果是手动点击关闭 tab 标签页，则删除页面缓存
      keepAliveStore.remove(name)
    },
    // 删除两侧非常驻和固定标签页
    removeOtherSide(tabId) {
      const userStore = useUserStore()
      const keepAliveStore = useKeepAliveStore()
      let keepName = [],
        removeName = []
      this.list.map((v) => {
        if (v.tabId != tabId && !v.isPin) {
          removeName.push(v.name)
        } else {
          keepName.push(v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      let name = []
      removeName.map((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      this.list = this.list.filter((item) => {
        return item.tabId == tabId || item.isPermanent || item.isPin
      })
      updateStorage(this.list, userStore.account)
      keepAliveStore.remove(name)
    },
    // 删除左侧非常驻和固定标签页
    removeLeftSide(tabId) {
      const userStore = useUserStore()
      const keepAliveStore = useKeepAliveStore()
      // 查找指定路由对应在标签页列表里的下标
      let index = ~~Object.keys(this.list).find((i) => {
        return this.list[i].tabId == tabId
      })
      let keepName = [],
        removeName = []
      this.list.map((v, i) => {
        if (i < index && !v.isPin) {
          removeName.push(v.name)
        } else {
          keepName.push(v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      let name = []
      removeName.map((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      this.list = this.list.filter((item, i) => {
        return i >= index || item.isPermanent || item.isPin
      })
      updateStorage(this.list, userStore.account)
      keepAliveStore.remove(name)
    },
    // 删除右侧非常驻和固定标签页
    removeRightSide(tabId) {
      const userStore = useUserStore()
      const keepAliveStore = useKeepAliveStore()
      // 查找指定路由对应在标签页列表里的下标
      let index = ~~Object.keys(this.list).find((i) => {
        return this.list[i].tabId == tabId
      })
      let keepName = [],
        removeName = []
      this.list.map((v, i) => {
        if (i > index && !v.isPin) {
          removeName.push(v.name)
        } else {
          keepName.push(v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      let name = []
      removeName.map((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      this.list = this.list.filter((item, i) => {
        return i <= index || item.isPermanent || item.isPin
      })
      updateStorage(this.list, userStore.account)
      keepAliveStore.remove(name)
    },
    // 固定标签页（移动到最后一个常驻或固定标签页后面，如果没有则移动至第一个）
    pin(tabId) {
      const userStore = useUserStore()
      let index = ~~Object.keys(this.list).find((i) => {
        return this.list[i].tabId == tabId
      })
      let toIndex = -1
      this.list.map((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index
        }
      })
      if (index > toIndex) {
        this.list.splice(toIndex + 1, 0, this.list[index])
        this.list.splice(index + 1, 1)
      }
      // 修改状态
      this.list.map((item) => {
        if (item.tabId == tabId) {
          item.isPin = true
        }
      })
      updateStorage(this.list, userStore.account)
    },
    // 取消固定标签页（移动到最后一个常驻或固定标签页后面）
    unPin(tabId) {
      const userStore = useUserStore()
      let index = Object.keys(this.list).find((i) => {
        return this.list[i].tabId == tabId
      })
      index = ~~index
      let toIndex = -1
      this.list.map((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index
        }
      })
      this.list.splice(toIndex + 1, 0, this.list[index])
      this.list.splice(index, 1)
      // 修改状态
      this.list.map((item) => {
        if (item.tabId == tabId) {
          item.isPin = false
        }
      })
      updateStorage(this.list, userStore.account)
    },
    // 清空所有标签页，登出的时候需要清空
    clean() {
      this.list = []
    },
    // 拖拽排序
    sort(data) {
      this.list = data
    },
    // 修改标签页标题
    editTitle({ tabId, title }) {
      this.list.map((item) => {
        if (item.tabId === tabId && item.title !== title) {
          item.title = title
        }
      })
    },
    // TODO storage的序列化问题
    // 根据 localstorage 数据复原当前帐号的固定标签页
    recoveryStorage(account) {
      if (storage.local.get('tabbarPinData') != null) {
        this.list = JSON.parse(storage.local.get('tabbarPinData'))[account] || []
      }
    }
  }
})

export function useTabbarOutsideStore() {
  return useTabbarStore(piniaStore)
}
