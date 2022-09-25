/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-02-18 15:10:03
 * @LastEditors: wsy
 */
import { VitePWA } from 'vite-plugin-pwa'

export default function createPwa() {
  return VitePWA({
    base: './',
    manifest: {
      name: 'wsy-admin',
      short_name: 'wsy-admin',
      description: '一款开箱即用的 Vue 中后台管理系统框架',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#e60000',
      icons: [
        {
          src: './pwa_icons/192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './pwa_icons/384x384.png',
          sizes: '384x384',
          type: 'image/png'
        }
      ]
    }
  })
}
