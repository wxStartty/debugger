/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-04-22 14:57:15
 * @LastEditors: wsy
 */
import { createPinia } from 'pinia'
export const piniaStore = createPinia()
export function setupStore(app) {
  app.use(piniaStore)
}
