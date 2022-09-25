/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-04-22 15:23:53
 * @LastEditors: wsy
 */
import { useSettingsOutsideStore } from '@/store/modules/settings'

const errorPlugin = {
  install(app) {
    const settingsOutsideStore = useSettingsOutsideStore()
    if (import.meta.env.MODE != 'development' && settingsOutsideStore.app.enableErrorLog) {
      app.config.errorHandler = (err, vm, info) => {
        // 在此处编写错误上报代码
        // 以下代码为演示代码
        let log = {
          url: location.href,
          err: {
            message: err.message,
            stack: err.stack
          },
          info,
          datetime: vm.$dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        log = JSON.stringify(log)
        sessionStorage.setItem('errorLog', log)
      }
    }
  }
}

function setupErrorLog(app) {
  app.use(errorPlugin)
}

export { setupErrorLog }
