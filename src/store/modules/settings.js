/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-06-06 21:05:09
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import settings from '@/settings/settings'
import { router } from '@/router'
import { useTabbarStore } from './tabbar'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...settings,
    // 次导航是否收起（用于记录 pc 模式下最后的状态）
    subMenuCollapseLastStatus: settings.menu.subMenuCollapse,
    // 主页面是否最大化
    mainPageMaximizeStatus: false,
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 页面标题
    title: ''
  }),
  actions: {
    // 设置标题
    setTitle(title) {
      this.title = title
      if (this.tabbar.enable) {
        const route = router.currentRoute.value
        const tabbarStore = useTabbarStore()
        tabbarStore.editTitle({
          tabId: this.tabbar.mergeTabs ? route.meta.activeMenu || route.fullPath : route.fullPath,
          title
        })
      }
    },
    // 设置访问模式
    setMode(width) {
      if (this.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ) {
          this.mode = 'mobile'
        } else {
          // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
          if (width < 992) {
            this.mode = 'mobile'
          } else {
            this.mode = 'pc'
          }
        }
      } else {
        this.mode = 'pc'
      }
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse() {
      this.menu.subMenuCollapse = !this.menu.subMenuCollapse
      if (this.mode == 'pc') {
        this.subMenuCollapseLastStatus = !this.subMenuCollapseLastStatus
      }
    },
    // 设置默认语言
    setDefaultLang(lang) {
      this.app.defaultLang = lang
    },
    // 切换当前主页面最大化
    setMainPageMaximize(value = !this.mainPageMaximizeStatus) {
      this.mainPageMaximizeStatus = value
    },
    // 更新应用配置
    updateSettings(data) {
      Object.assign(this, data)
    }
  }
})
export function useSettingsOutsideStore() {
  return useSettingsStore(piniaStore)
}
