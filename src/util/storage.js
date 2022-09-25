/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-05-19 14:17:25
 * @LastEditors: wsy
 */
import settings from '@/settings/settings'

const storage = {
  local: {
    has: (key) => {
      return !!localStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    get: (key) => {
      return localStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    set: (key, value) => {
      localStorage.setItem(`${settings.app.storagePrefix}${key}`, value)
    },
    remove: (key) => {
      localStorage.removeItem(`${settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      localStorage.clear()
    }
  },
  session: {
    has: (key) => {
      return !!sessionStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    get: (key) => {
      return sessionStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    set: (key, value) => {
      sessionStorage.setItem(`${settings.app.storagePrefix}${key}`, value)
    },
    remove: (key) => {
      sessionStorage.removeItem(`${settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      sessionStorage.clear()
    }
  }
}

export default storage
