/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-10 22:15:36
 * @LastEditTime: 2022-07-18 16:20:23
 * @LastEditors: wsy
 */
import { router } from '@/router/index'
import { ElMessage } from 'element-plus'
import { useUserOutsideStore } from '@/store/modules/user'
import { throttle } from 'lodash-es'
import consola from 'consola'

export const httpLogError = (error, msg) => {
  error.message = msg
  consola.error(new Error(msg))
}

export const requestError = (response) => {
  return new Promise((_, reject) => {
    const { data } = response
    const msg = __DEV__ ? `api请求出错 ${response.config.url}` : data.msg
    ElMessage({
      message: msg,
      type: 'error'
    })
    consola.error(new Error(msg))
    reject(data)
  })
}
export const toLogin = () => {
  const userOutsideStore = useUserOutsideStore()
  userOutsideStore.logout().then(() => {
    router.push({
      name: 'login',
      query: {
        redirect:
          router.currentRoute.value.path !== '/login'
            ? router.currentRoute.value.fullPath
            : undefined
      }
    })
  })
}

export const throttleToLogin = throttle(toLogin, 2000, { leading: true, trailing: false })

export const validator = (key) => {
  if (!key.startsWith('API_')) {
    consola.warn(`api名称必须以API_为开头,${key} 应改为 API_${key}`)
  }
}
