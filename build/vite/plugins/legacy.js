/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-23 14:56:10
 * @LastEditTime: 2022-05-24 18:06:16
 * @LastEditors: wsy
 */
import legacy from '@vitejs/plugin-legacy'

export default function createLegacy() {
  return legacy({
    targets: ['defaults', 'not IE 11']
  })
}
