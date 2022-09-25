/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-02-14 17:26:38
 * @LastEditors: wsy
 */
import Icons from 'unplugin-icons/vite'

export default function createIcons() {
  return Icons({
    autoInstall: true,
    scale: 1,
    defaultStyle: `
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        `
  })
}
