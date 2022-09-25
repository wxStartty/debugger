/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-02-14 15:44:03
 * @LastEditors: wsy
 */
import { ref } from 'vue'

function usePagination() {
  const pagination = ref({
    page: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null,
    order: null
  })

  function getParams(params = {}) {
    const baseParams = {
      from: (pagination.value.page - 1) * pagination.value.size,
      limit: pagination.value.size
    }
    if (pagination.value.sort && pagination.value.order) {
      baseParams.sort = pagination.value.sort
      baseParams.order = pagination.value.order
    }
    Object.assign(baseParams, params)
    return baseParams
  }

  function onSizeChange(size) {
    return new Promise((resolve) => {
      pagination.value.size = size
      resolve()
    })
  }

  function onCurrentChange(page) {
    return new Promise((resolve) => {
      pagination.value.page = page
      resolve()
    })
  }

  function onSortChange({ prop, order }) {
    return new Promise((resolve) => {
      pagination.value.sort = prop
      pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
      resolve()
    })
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange
  }
}

export default usePagination
