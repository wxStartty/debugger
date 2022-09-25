/*
 * @Description: 重新加载当前页面
 * @Author: wsy
 * @Date: 2022-04-29 16:43:35
 * @LastEditTime: 2022-04-29 19:22:07
 * @LastEditors: wsy
 */
import storage from '@/util/storage'
export function useReload() {
  const router = useRouter()
  return function reload({ hotkeys = false } = {}) {
    if (!hotkeys && !storage.local.has('hotkeysTip')) {
      // TODO 添加一个tip提示F5可做刷新
      console.warn('可以按F5刷新页面')
      storage.local.set('hotkeysTip', true)
    }
    router.push({
      name: 'reload'
    })
  }
}
