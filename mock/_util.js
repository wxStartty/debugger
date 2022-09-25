/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-15 14:54:58
 * @LastEditTime: 2022-06-23 22:09:35
 * @LastEditors: wsy
 */
import Mock from 'mockjs'

export function resultSuccess(data, { msg = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    data,
    msg,
    type: 'success'
  })
}

export function resultPageSuccess(page, pageSize, list, { msg = 'ok' } = {}) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      page,
      pageSize,
      pageCount: list.length,
      list: pageData
    }),
    msg
  }
}

export function resultError(msg = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    msg,
    type: 'error'
  }
}

export function pagination(pageNo, pageSize, array) {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times, callback) {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }) {
  return headers?.token
}
