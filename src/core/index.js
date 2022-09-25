/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│          │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 */

import directive from '@/directive'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import ContextMenu from '@imengyu/vue3-context-menu'
import ElementPlus from 'element-plus'
import * as ElementIcons from '@element-plus/icons-vue'

/**
 * https://iconpark.oceanengine.com/official
 *
 * 是给 menu 的icon 准备的一个全量的图标库，方便开发的时候选择使用侧边栏图标用的，在运行时中无法做本地按需加载，所以只能全量引入
 * cdn加载也是一个好办法，但是考虑到很多都是内网环境，所以这里不用cdn加载
 */
import { install } from '@icon-park/vue-next/es/all'
import '@icon-park/vue-next/styles/index.css'
import { appGlobalPropertiesPlugin } from '@/util/global.properties'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '@/assets/styles/globals.scss'
const core = {
  install: (app) => {
    app.use(directive)
    app.use(ContextMenu)
    // 将 element-plus 的图标库注册到全局key
    for (let key in ElementIcons) {
      app.component(`ElIcon${ElementIcons[key].name}`, ElementIcons[key])
    }

    app.use(ElementPlus, {
      size: useSettingsOutsideStore().app.componentSize
    })
    app.use(appGlobalPropertiesPlugin)
    // 全量加载icon-park
    install(app)
  }
}
export function setupCore(app) {
  app.use(core)
}
