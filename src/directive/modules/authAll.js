/*
 * @Description: directive auth
 * @Author: wsy
 * @Date: 2022-03-28 17:03:38
 * @LastEditTime: 2022-05-24 20:37:20
 * @LastEditors: wsy
 */

import usePermission from '@/util/usePermission.js'
import { getNativeComputedStyle } from '@/util/native'

const map = new Map()

export default (el, { value }, { scopeId }) => {
  const { authAll } = usePermission()
  const actualDisplay = getNativeComputedStyle('display', el) || 'block'
  !map.has(scopeId) && map.set(scopeId, actualDisplay)
  if (!authAll(value)) {
    el.style.display = 'none'
  } else {
    el.style.display = map.get(scopeId)
  }
}
