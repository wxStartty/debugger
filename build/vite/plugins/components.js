/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-06-07 15:51:09
 * @LastEditors: wsy
 */
import components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
export default function createComponents() {
  return components({
    resolvers: [IconsResolver()],
    dts: false,
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/]
  })
}
