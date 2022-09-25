/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-05-07 19:10:48
 * @LastEditors: wsy
 */
import { createApp } from 'vue'
import SpinkitLoadingComp from './index.vue'

let instance
let mountNode

function SpinkitLoading(options) {
  instance = createApp(SpinkitLoadingComp, options)
  mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  instance.mount(mountNode)
}

function SpinkitLoadingClose() {
  instance.unmount(mountNode)
  document.body.removeChild(mountNode)
}

export { SpinkitLoading, SpinkitLoadingClose }
