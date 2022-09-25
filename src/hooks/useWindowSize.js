/*
 * @Description: 监听窗口大小变化, 并设置主侧边栏宽度
 * @Author: wsy
 * @Date: 2022-04-25 14:46:52
 * @LastEditTime: 2022-05-20 14:39:33
 * @LastEditors: wsy
 */
// TODO 纯副作用函数，应当提取出去
import { useWindowSize } from '@vueuse/core'
import { useSettingsStore } from '@/store/modules/settings'
export function useWindowSizeEffect() {
  const settingsStore = useSettingsStore()
  const { width } = useWindowSize()
  watch(
    width,
    (actualWidth) => {
      settingsStore.setMode(actualWidth)
    },
    {
      immediate: true
    }
  )
}
