/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-12 13:12:05
 * @LastEditTime: 2022-05-12 14:28:57
 * @LastEditors: wsy
 */
import { isFunction } from 'lodash-es'
import { request } from './createRequest'

let id = 0
let activeRequest
const setActiveRequest = (id) => (activeRequest = id)
const getActiveRequest = () => activeRequest

function defineRequest(controller, requests) {
  if (!isFunction(requests)) {
    requests = controller
    controller = {}
  }
  const defaultController = {}
  const requestController = Object.assign(defaultController, controller)
  requests.id = id++
  request._s.set(requests.id, requestController)
  return requests
}

export { setActiveRequest, getActiveRequest, defineRequest }
