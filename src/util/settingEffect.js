/*
 * @Description: settings改变,调整body的attr
 * @Author: wsy
 * @Date: 2022-04-22 18:49:08
 * @LastEditTime: 2022-06-09 14:22:07
 * @LastEditors: wsy
 */
// TODO 纯副作用函数，应当提取出去
import { useSettingsStore } from '@/store/modules/settings'
import { IconProvider } from '@icon-park/vue-next'
import { useCssVar } from '@vueuse/core'
import { camelCase } from 'lodash-es'
import { globalSetAttribute, isChange } from '@/util'
const settingsStore = useSettingsStore()

export const InitMode = () => {
  watch(
    () => settingsStore.mode,
    (newValue, oldValue) => {
      if (isChange(newValue, oldValue)) {
        if (newValue === 'pc') {
          settingsStore.$patch((state) => {
            state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
          })
        } else if (newValue === 'mobile') {
          settingsStore.$patch((state) => {
            state.menu.subMenuCollapse = true
          })
        }
        globalSetAttribute('data-mode', newValue)
      }
    },
    {
      immediate: true
    }
  )
}
export const InitTheme = () => {
  watch(
    () => settingsStore.app.theme,
    (newValue, oldValue) =>
      isChange(newValue, oldValue) && globalSetAttribute('data-theme', newValue),
    {
      immediate: true
    }
  )
}
export const InitMenuMode = () => {
  watch(
    () => settingsStore.menu.menuMode,
    (newValue, oldValue) =>
      isChange(newValue, oldValue) && globalSetAttribute('data-menu-mode', newValue),
    {
      immediate: true
    }
  )
}
export const InitWidthMode = () => {
  watch(
    () => settingsStore.layout.widthMode,
    (newValue, oldValue) =>
      isChange(newValue, oldValue) && globalSetAttribute('data-app-width-mode', newValue),
    {
      immediate: true
    }
  )
}

export const SettingEffect = () => {
  const routeInfo = useRoute()
  watch(
    () => routeInfo.path,
    () => {
      if (settingsStore.mode === 'mobile') {
        settingsStore.$patch((state) => {
          state.menu.subMenuCollapse = true
        })
      }
    }
  )
}

// 菜单按钮默认
export const InitIconDefaultSettings = () => {
  const color = useCssVar('--icon-fill-color', document.body)
  color.value = settingsStore.iconStyle.colors[camelCase(settingsStore.iconStyle.theme)].fill
  watch(
    () => settingsStore.iconStyle.theme,
    (theme) => {
      color.value = settingsStore.iconStyle.colors[camelCase(theme)].fill
    }
  )
  IconProvider(settingsStore.iconStyle)
}
