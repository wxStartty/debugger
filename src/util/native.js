/*
 * @Description: 宿主方法
 * @Author: wsy
 * @Date: 2022-02-16 19:14:21
 * @LastEditTime: 2022-02-16 19:17:35
 * @LastEditors: wsy
 */

/**
 * @description 获取computedStyle对象上的属性值
 * @author wsy
 * @date 2022-02-16  19:15:34
 * @param {Object} attr 属性
 * @param {Object} el DOM元素
 */
export function getNativeComputedStyle(attr, el = document.documentElement) {
  return window.getComputedStyle(el).getPropertyValue(attr)
}
