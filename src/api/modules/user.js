/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-10 20:43:01
 * @LastEditTime: 2022-05-24 15:14:09
 * @LastEditors: wsy
 */
import { defineRequest } from '@/api/define.js'
export default defineRequest({ baseURL: '/mock/' }, ({ request }) => ({
  API_LOGIN(data = {}) {
    return request({
      url: 'member/login',
      method: 'post',
      data
    })
  },

  API_ROUTE(params = {}) {
    return request({
      url: 'route/list',
      method: 'get',
      params
    })
  },
  API_PERMISSION(params = {}) {
    return request({
      url: 'member/permission',
      method: 'get',
      params
    })
  },
  API_EDIT_PASSWORD(data = {}) {
    return request({
      url: 'member/edit/password',
      method: 'post',
      data
    })
  }
}))
