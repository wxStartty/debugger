/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-11 16:21:57
 * @LastEditTime: 2022-06-09 15:20:10
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import storage from '@/util/storage'
import { useTabbarStore } from './tabbar'
import { useRouteStore } from './route'
import { useMenuStore } from './menu'
import { useUrlSearchParams } from '@vueuse/core'
import { ElMessageBox, ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', {
  state: () => ({
    account: storage.local.get('account') || '',
    token: storage.local.get('token') || '',
    failure_time: storage.local.get('failure_time') || '',
    permissions: []
  }),
  getters: {
    isLogin: (state) => {
      return !!(state.token && new Date().getTime() < state.failure_time * 1000)
    }
  },
  actions: {
    login(data) {
      const { API_LOGIN } = useRequest()
      return new Promise((resolve, reject) => {
        // 通过 mock 进行登录
        API_LOGIN(data)
          .then((res) => {
            storage.local.set('account', res.account)
            storage.local.set('token', res.token)
            storage.local.set('failure_time', res.failure_time)
            this.account = res.account
            this.token = res.token
            this.failure_time = res.failure_time
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async logoutBeforeAsk(loginFailure) {
      if (loginFailure) return true
      return ElMessageBox.confirm('是否退出当前用户？', '提示', {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        draggable: true
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '已成功退出登录'
          })
          return true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消退出登录'
          })
          return false
        })
    },
    /**
     * 擦除 searchParams、storage和pinia
     */
    async logout() {
      const tabbarStore = useTabbarStore()
      const routeStore = useRouteStore()
      const menuStore = useMenuStore()
      const params = useUrlSearchParams('history')

      params.token = ''
      storage.local.remove('account')
      storage.local.remove('token')
      storage.local.remove('failure_time')
      this.account = ''
      this.token = ''
      this.failure_time = ''
      this.permissions = []
      tabbarStore.clean()
      routeStore.removeRoutes()
      menuStore.setActived(0)
    },
    // 获取我的权限
    getPermissions() {
      const { API_PERMISSION } = useRequest()
      return new Promise((resolve) => {
        // 通过 mock 获取权限
        API_PERMISSION({ account: this.account }).then((res) => {
          this.permissions = res.permissions
          resolve(res.permissions)
        })
      })
    },
    editPassword(data) {
      const { API_EDIT_PASSWORD } = useRequest()
      return new Promise((resolve) => {
        API_EDIT_PASSWORD({
          account: this.account,
          password: data.password,
          newpassword: data.newpassword
        }).then(() => {
          resolve()
        })
      })
    }
  }
})

export function useUserOutsideStore() {
  return useUserStore(piniaStore)
}
