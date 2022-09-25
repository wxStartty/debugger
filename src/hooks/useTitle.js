/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-04-22 18:20:50
 * @LastEditTime: 2022-05-18 20:20:28
 * @LastEditors: wsy
 */
// TODO 纯副作用函数，应当提取出去
import { useSettingsStore } from '@/store/modules/settings'
export function useTitle(toRouter) {
  const settingsStore = useSettingsStore()
  toRouter.meta.title &&
    settingsStore.setTitle(
      typeof toRouter.meta.title === 'function' ? toRouter.meta.title() : toRouter.meta.title
    )
  watch(
    [() => settingsStore.app.enableDynamicTitle, () => settingsStore.title],
    () => {
      if (settingsStore.app.enableDynamicTitle && settingsStore.title) {
        let title =
          typeof settingsStore.title === 'function' ? settingsStore.title() : settingsStore.title
        document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
      } else {
        document.title = import.meta.env.VITE_APP_TITLE
      }
    },
    {
      immediate: true
    }
  )
}
