/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-01 18:09:36
 * @LastEditors: wsy
 */
import banner from 'vite-plugin-banner'
import dayjs from 'dayjs'

export default function createBanner() {
  return banner(`
/**
 * 由 应急管理 提供技术支持
 * Powered by wsy-admin
 * ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
 */
    `)
}
