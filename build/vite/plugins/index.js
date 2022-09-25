/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-18 14:52:23
 * @LastEditors: wsy
 */
import vue from '@vitejs/plugin-vue'

import createRestart from './restart'
import createJsx from './jsx'
import createHtml from './html'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSetupExtend from './setup-extend'
import createSvgIcon from './svg-icon'
import createIcons from './icons'
import createMock from './mock'
import createCompression from './compression'
import createSpritesmith from './spritesmith'
import createBanner from './banner'
import createPwa from './pwa'
import createLegacy from './legacy'
import createUnocss from './unocss'
// import createRemoveConsole from './remove-console'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createJsx())
  vitePlugins.push(createHtml(viteEnv, isBuild))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createIcons())
  vitePlugins.push(createMock())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(...createSpritesmith(isBuild))
  vitePlugins.push(createBanner())
  viteEnv.VITE_BUILD_PWA && vitePlugins.push(createPwa())
  vitePlugins.push(createUnocss())
  isBuild && vitePlugins.push(createLegacy())
  // TODO 不好用，js不生效，ts中才生效
  // viteEnv.VITE_BUILD_DROP_CONSOLE && vitePlugins.push(createRemoveConsole())
  return vitePlugins
}
