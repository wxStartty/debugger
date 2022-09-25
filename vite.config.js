/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-09-24 23:41:26
 * @LastEditors: wsy
 */
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './build/vite/plugins'
import { wrapperEnv } from './build/vite/utils'
import { scssResources } from './build/generate/generateStyle'
import path from 'path'
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = wrapperEnv(loadEnv(mode, process.cwd()))
  return defineConfig({
    base: './',
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      host: true,
      // hmr: { overlay: false },
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY,
          rewrite: (path) => path.replace(/\/proxy/, '')
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode == 'production' ? 'dist' : `dist-${mode}`,
      // sourcemap: env.VITE_BUILD_SOURCEMAP,
      minify: true
    },
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        util: path.resolve(__dirname, 'src/util'),
        views: path.resolve(__dirname, 'src/views'),
        layout: path.resolve(__dirname, 'src/layout'),
        settings: path.resolve(__dirname, 'src/settings/settings')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join('')
        }
      }
    },
    define: {
      __DEV__: mode === 'development',
      __TEST__: mode === 'test'
    }
  })
}
