/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-18 16:21:40
 * @LastEditors: wsy
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserOutsideStore } from '@/store/modules/user'
import { get } from 'lodash-es'
import { httpLogError, requestError, throttleToLogin } from './helper'
import consola from 'consola'
export function createService() {
  const request = axios.create()
  request.interceptors.request.use(
    (request) => {
      const userOutsideStore = useUserOutsideStore()
      if (userOutsideStore.isLogin) {
        request.headers['Authorization'] = userOutsideStore.token
      }
      return request
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  request.interceptors.response.use(
    (response) => {
      const dataAxios = response.data
      // 这个状态码是和后端约定的
      const { code, data } = dataAxios
      // 根据 code 进行判断
      if (code === undefined) {
        // 如果没有 code 代表这不是项目组后端开发的接口
        __DEV__ && consola.withTag(`${response.config.url}`).success()
        return dataAxios
      } else {
        // 目前和公司后端口头约定是字符串,以防万一强制转字符串
        switch (`${code}`) {
          // code === 200 | 2 代表没有错误
          case '200':
          case '2':
            __DEV__ && consola.withTag(`${response.config.url}`).success()
            return data
          // code === 400001004 代表token 过期打回登录页
          case '400001004':
            throttleToLogin()
            break
          case '400002001':
          case '400001002':
          case '400001001':
            // 不是正确的 code
            return requestError(response)
          default:
            // 不是正确的 code
            return requestError(response)
        }
      }
    },
    (error) => {
      const status = get(error, 'response.status')
      switch (status) {
        // TODO 再考虑下怎么判断是跨域问题
        case undefined:
        case null:
          httpLogError(error, '网路错误或请求跨域')
          break
        case 400:
          httpLogError(error, '请求错误')
          break
        case 401:
          httpLogError(error, '未授权，请登录')
          break
        case 403:
          httpLogError(error, '拒绝访问')
          break
        case 404:
          httpLogError(error, `请求地址出错: ${error.response.config.url}`)
          break
        case 408:
          httpLogError(error, '请求超时')
          break
        case 500:
          httpLogError(error, '服务器内部错误')
          break
        case 501:
          httpLogError(error, '服务未实现')
          break
        case 502:
          httpLogError(error, '网关错误')
          break
        case 503:
          httpLogError(error, '服务不可用')
          break
        case 504:
          httpLogError(error, '网关超时')
          break
        case 505:
          httpLogError(error, 'HTTP版本不受支持')
          break
        default:
          httpLogError(error, '请求错误')
          break
      }
      ElMessage({
        message: error.message,
        type: 'error'
      })
      return Promise.reject(error)
    }
  )
  return request
}
