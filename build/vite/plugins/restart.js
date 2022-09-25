/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-04-20 16:11:11
 * @LastEditors: wsy
 */
import ViteRestart from 'vite-plugin-restart'

export default function createRestart() {
  return ViteRestart({
    restart: ['.env.development']
  })
}
