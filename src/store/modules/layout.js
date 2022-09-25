/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-16 08:38:31
 * @LastEditTime: 2022-06-06 20:58:56
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useMenuOutsideStore } from '@/store/modules/menu'
import { getNativeComputedStyle } from '@/util/native'
import { globalSetAttribute } from '@/util'
const settingsStore = useSettingsOutsideStore()
const menuStore = useMenuOutsideStore()

export const useLayoutStore = defineStore('layout', {
  getters: {
    /**
     * @description 侧边栏主导航当前实际宽度
     * @author wsy
     * @date 2022-02-16  16:35:32
     */
    mainSidebarActualWidth: () => {
      let actualWidth = getNativeComputedStyle('--g-main-sidebar-width')
      actualWidth = parseInt(actualWidth)
      if (['head', 'single', 'only-head'].includes(settingsStore.menu.menuMode)) {
        actualWidth = 0
      }
      return `${actualWidth}px`
    },
    /**
     * @description 侧边栏次导航当前实际宽度
     * @author wsy
     * @date 2022-02-16  16:35:23
     */
    subSidebarActualWidth: () => {
      let actualWidth = getNativeComputedStyle('--g-sub-sidebar-width')
      actualWidth = parseInt(actualWidth)
      if (settingsStore.menu.subMenuCollapse) {
        actualWidth = 64
      }
      if (['only-side', 'only-head'].includes(settingsStore.menu.menuMode)) {
        actualWidth = 0
      }
      if (
        settingsStore.menu.subMenuOnylOneHide &&
        menuStore.sidebarMenus.length === 1 &&
        (!menuStore.sidebarMenus[0].children ||
          menuStore.sidebarMenus[0]?.children.every((item) => item.meta.sidebar === false))
      ) {
        actualWidth = 0
      }
      return `${actualWidth}px`
    }
  },
  actions: {
    updateMode() {
      const mode = settingsStore.mode
      if (mode === 'pc') {
        settingsStore.$patch((state) => {
          state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
        })
      } else if (mode === 'mobile') {
        settingsStore.$patch((state) => {
          state.menu.subMenuCollapse = true
        })
      }
      globalSetAttribute('data-mode', mode)
    }
  }
})

export function useLayoutOutsideStore() {
  return useLayoutStore(piniaStore)
}
