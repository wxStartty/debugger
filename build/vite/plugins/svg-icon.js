/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-02-14 17:28:08
 * @LastEditors: wsy
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
