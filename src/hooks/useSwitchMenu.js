/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-04-29 17:13:33
 * @LastEditTime: 2022-05-16 18:19:43
 * @LastEditors: wsy
 */
import { useMenuStore } from '@/store/modules/menu'
import { useSettingsStore } from '@/store/modules/settings'
import { isExternalLink } from '@/util'
// TODO 纯副作用函数，应当提取出去
export function useSwitchMenu() {
  const menuStore = useMenuStore()
  const settingsStore = useSettingsStore()
  const router = useRouter()
  return function (index) {
    menuStore.setActived(index)
    if (settingsStore.menu.switchMainMenuAndPageJump) {
      if (isExternalLink(menuStore.sidebarMenusFirstDeepestPath)) {
        window.open(menuStore.sidebarMenusFirstDeepestPath, '_blank')
      } else {
        router.push(menuStore.sidebarMenusFirstDeepestPath)
      }
    }
  }
}
