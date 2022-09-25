/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-09-13 08:52:19
 * @LastEditors: wsy
 */

import 'virtual:svg-icons-register'
import 'remixicon/fonts/remixicon.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupErrorLog } from '@/util/error.log'
import { setupCore } from '@/core'
import { urlParamsLogin } from '@/router/helper'
import 'uno.css'
// import './pwa'
// PWA

async function bootstrap() {
  const app = createApp(App)
  setupCore(app)
  setupStore(app)
  setupErrorLog(app)
  await urlParamsLogin()
  await setupRouter(app)
  app.mount('#app')
}
bootstrap()
