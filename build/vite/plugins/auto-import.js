/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-06-10 19:02:17
 * @LastEditors: wsy
 */
import autoImport from 'unplugin-auto-import/vite'
export default function createAutoImport() {
  return autoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    imports: [
      'vue',
      'vue-router',
      {
        'vue-router': ['onBeforeRouteLeave', 'onBeforeRouteUpdate'],
        '@/api': ['useRequest']
      }
    ],
    dts: false
  })
}
