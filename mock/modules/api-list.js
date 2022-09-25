/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-15 14:56:24
 * @LastEditTime: 2022-06-23 22:09:33
 * @LastEditors: wsy
 */
import { Random } from 'mockjs'
import { resultSuccess, doCustomTimes } from '../_util.js'

const tableList = (pageSize) => {
  const result = []
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      'type|1': ['error', 'default', 'warn'],
      'no|100000-10000000': 100000,
      name: Random.word(),
      'method|1': ['GET', 'POST', 'PUT', 'DELETE'],
      'describe|1': Random.csentence(10, 25)
    })
  })
  return result
}

export default [
  // api表格数据列表
  {
    url: '/mock/api/list',
    timeout: 1000,
    method: 'post',
    response: ({ body }) => {
      const { page = 1, pageSize = 10, search } = body
      const list = tableList(Number(pageSize))
      // 并非真实，只是为了模拟搜索结果
      const count = search ? 20 : 60
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: count,
        itemCount: count * Number(pageSize),
        list
      })
    }
  }
]
