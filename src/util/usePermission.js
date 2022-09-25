/*
 * @Description: usePermission
 * @Author: wsy
 * @Date: 2022-03-28 15:54:12
 * @LastEditTime: 2022-03-28 17:13:35
 * @LastEditors: wsy
 */
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useUserOutsideStore } from '@/store/modules/user'

const usePermission = () => {
  const settingsOutsideStore = useSettingsOutsideStore()
  const userOutsideStore = useUserOutsideStore()
  /**
   * 返回一个函数，检查用户是否具有给定的权限.
   * @param {string} permission - 检查的权限.
   * @returns {boolean} - 如果用户有权限，则为True，否则为false。
   */
  const hasPermission = (permission) => {
    if (settingsOutsideStore.app.enablePermission) {
      return userOutsideStore.permissions.some((v) => {
        return v === permission
      })
    } else {
      return true
    }
  }
  /**
   * 检查用户是否有权限使用该命令.
   * @param {string | string[]} value - 检查权限.
   * @returns {boolean} - 如果用户有权限，则为True，否则为false.
   */
  const auth = (value) => {
    let isPermission
    if (typeof value === 'string') {
      isPermission = hasPermission(value)
    } else {
      isPermission = value.some((item) => {
        return hasPermission(item)
      })
    }
    return isPermission
  }

  /**
   * 获取一个权限数组，并检查用户是否拥有所有权限.
   * @param {string[]} value - 要检查的权限数组.
   * @returns {boolean} - 如果用户有权限，则为True，否则为false.
   */
  const authAll = (value) => {
    const auth = value.every((item) => {
      return hasPermission(item)
    })
    return auth
  }
  return {
    auth,
    authAll
  }
}

export default usePermission
