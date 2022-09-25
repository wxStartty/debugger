/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-10 20:43:01
 * @LastEditTime: 2022-06-07 09:57:53
 * @LastEditors: wsy
 */
import { defineRequest } from '@/api/define.js'
export default defineRequest(({ request }) => ({
  API_DEMO_POST(data = {}) {
    return request({
      baseURL: '/mock/',
      url: 'api/mock',
      method: 'post',
      data
    })
  },

  API_DEMO_GET(params = {}) {
    return request({
      url: '/demo/get',
      method: 'get',
      params
    })
  }
}))
