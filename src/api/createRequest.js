/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-12 09:38:25
 * @LastEditTime: 2022-05-12 14:00:24
 * @LastEditors: wsy
 */
import { service } from './createService'
import { getActiveRequest } from './define'

const baseURL =
  __DEV__ && import.meta.env.VITE_OPEN_PROXY === 'true'
    ? '/proxy/'
    : import.meta.env.VITE_APP_API_BASEURL

function createRequest(service) {
  function request(config) {
    const configDefault = {
      baseURL,
      timeout: 15000,
      responseType: 'json'
    }
    const controller = request._s.get(getActiveRequest())
    const requestConfig = Object.assign(configDefault, controller, config)
    return service(requestConfig)
  }
  request._s = new Map()
  return request
}
export const request = createRequest(service)
