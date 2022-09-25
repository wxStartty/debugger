/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-06-06 21:10:55
 * @LastEditors: wsy
 */
import path from 'path-browserify'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useUserOutsideStore } from '@/store/modules/user'
// 防抖
export const debounce = (fn, delay = 300, immediate = true) => {
  let timer = null // 借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) {
        fn.apply(this, arguments)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}

// 节流
export function throttle(fn, delay = 300) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn.apply(this, arguments)
      valid = true
    }, delay)
  }
}

function hasPermission(permission) {
  const settingsOutsideStore = useSettingsOutsideStore()
  const userOutsideStore = useUserOutsideStore()
  if (settingsOutsideStore.app.enablePermission) {
    return userOutsideStore.permissions.some((v) => {
      return v === permission
    })
  } else {
    return true
  }
}

export function auth(value) {
  let auth
  if (typeof value === 'string') {
    auth = hasPermission(value)
  } else {
    auth = value.some((item) => {
      return hasPermission(item)
    })
  }
  return auth
}

export function authAll(value) {
  const auth = value.every((item) => {
    return hasPermission(item)
  })
  return auth
}

export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath, routePath) {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(basePath)) {
    return basePath
  }
  return basePath ? path.resolve(basePath, routePath) : routePath
}

export function typeSource(type) {
  return Object.prototype.toString.call(type).slice(8, -1)
}
export function globalSetAttribute(key, val) {
  document.body.setAttribute(key, val)
}

export function isChange(val, oldVal) {
  return val !== oldVal
}
