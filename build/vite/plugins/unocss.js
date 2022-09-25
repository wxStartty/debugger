/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-18 14:45:40
 * @LastEditTime: 2022-07-18 15:20:58
 * @LastEditors: wsy
 */
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
export default function createUnocss() {
  return Unocss({
    presets: [presetUno(), presetAttributify()]
  })
}
