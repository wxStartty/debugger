import Waves from 'node-waves'
import 'node-waves/dist/waves.min.css'
/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-24 20:26:17
 * @LastEditTime: 2022-05-24 20:26:31
 * @LastEditors: wsy
 */
export default {
  created: () => {
    Waves.init()
  },
  mounted: (el, binding) => {
    let classes = ['button', 'circle', 'block', 'float', 'light', 'classic']
      .filter((cls) => binding.modifiers[cls])
      .map((cls) => `waves-${cls}`)
    Waves.attach(el, classes)
  }
}
