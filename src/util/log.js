/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-18 21:53:16
 * @LastEditTime: 2022-05-11 18:15:37
 * @LastEditors: wsy
 */
/* eslint-disable no-console */
import { ElNotification } from 'element-plus'
import errImg from '@/assets/images/emoji/skull-and-crossbones.png'
import warnImg from '@/assets/images/emoji/frowning-face.png'
import exclamation from '@/assets/images/emoji/exclamation-mark.png'
class Log {
  constructor() {
    this.colors = new Map([
      ['default', '#35495E'],
      ['primary', '#1E9FFF'],
      ['success', '#67C23A'],
      ['warning', '#E6A23C'],
      ['danger', '#F56C6C']
    ])
  }
  /**
   * @description 返回这个样式的颜色值
   * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
   */

  typeColor(type) {
    return this.colors.get(type)
  }
  /**
   * @description 打印一个 [ title | text ] 样式的信息
   * @param {String} title title text
   * @param {String} info info text
   * @param {String} type style
   */
  capsule(title, info, type = 'primary') {
    console.log(
      `%c ${title} %c ${info} %c`,
      'background:#35495E; padding: 3px; border-radius: 3px 0 0 3px; color: #fff;',
      `background:${this.typeColor(type)}; padding: 3px; border-radius: 0 3px 3px 0;  color: #fff;`,
      'background:transparent'
    )
  }
  /**
   * @description 打印彩色文字
   */
  colorful(textArr) {
    console.log(
      `%c${textArr.map((t) => t.text || '').join('%c')}`,
      ...textArr.map((t) => `color: ${this.typeColor(t.type)};`)
    )
  }
  /**
   * @description 打印 default 样式的文字
   */
  default(text) {
    this.colorful([{ text }])
  }
  /**
   * @description 打印 primary 样式的文字
   */
  primary(text) {
    this.colorful([{ text, type: 'primary' }])
  }
  /**
   * @description 打印 success 样式的文字
   */
  success(text) {
    this.colorful([{ text, type: 'success' }])
  }
  /**
   * @description 打印 warning 样式的文字
   */
  warning(text) {
    this.colorful([{ text, type: 'warning' }])
  }
  /**
   * @description 打印 danger 样式的文字
   */
  danger(text) {
    this.colorful([{ text, type: 'danger' }])
  }
}

const log = new Log()

export function warnMsg(msg) {
  if (__DEV__) {
    log.capsule('😅', msg, 'warning')
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: `
      <div style='display: flex;align-items: center;'>
        <div style='width:50px; height:100%;flex:none;margin-right:5px;justify-content:center;align-items:center'>
          <img src=${warnImg} style='width:40px;' />
        </div>
        <div style='height:100%;flex:auto'>
          <strong>${msg}</strong>
        </div>
      </div>`,
      duration: 0
    })
  }
}

export function errorMsg(msg) {
  if (__DEV__) {
    log.capsule('💀', msg, 'danger')
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: `
      <div style='display: flex;align-items: center;'>
        <div style='width:10px; height:100%;flex:none;margin-right:10px;justify-content:center;align-items:center'>
          <img src=${exclamation} style='width:10px;' />
        </div>
        <div style='width:50px; height:100%;flex:none;margin-right:5px;justify-content:center;align-items:center'>
          <img src=${errImg} style='width:40px;' />
        </div>
        <div style='height:100%;flex:auto'>
          <strong>${msg}</strong>
        </div>
      </div>`,
      duration: 0
    })
  }
}

export default log
