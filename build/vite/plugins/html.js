/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-01 18:09:56
 * @LastEditors: wsy
 */
import { createHtmlPlugin } from 'vite-plugin-html'

const copyright_common_style = 'font-size: 14px; margin-bottom: 2px; padding: 6px 8px; color: #fff;'
const copyright_main_style = `${copyright_common_style} background: #2B8DFD;border-radius:0;font-weight: bold;`
const copyright_sub_style_left = `${copyright_common_style} background: #434A56;border-radius:3px 0 0 3px ;`
const copyright_sub_style_right = `${copyright_common_style} background: #434A56;border-radius:0 3px 3px 0;`
export default function createHtml(env, isBuild) {
  const { VITE_APP_TITLE, VITE_APP_DEBUG_TOOL } = env
  const html = createHtmlPlugin({
    inject: {
      data: {
        title: VITE_APP_TITLE,
        debugTool: VITE_APP_DEBUG_TOOL,
        copyrightScript: `
<script>
console.info('%c🎉%c应急管理%c提供技术支持', '${copyright_sub_style_left}', '${copyright_main_style}', '${copyright_sub_style_right}');
</script>`
      }
    },
    minify: isBuild
  })
  return html
}
