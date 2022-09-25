/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-16 08:43:53
 * @LastEditTime: 2022-09-13 09:17:24
 * @LastEditors: wsy
 */
import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import IconExample from './modules/icon.example'
/**
 * @description
 * 组织异步路由
 * 根据此处组织menu层级结构
 * TIP:真实的路由映射是扁平化之后的
 * @author wsy
 * @date 2022-05-10  09:14:41
 */
export default [
  {
    meta: {
      title: '预按管理',
      icon: 'icon-diamonds'
    },
    children: [MultilevelMenuExample, BreadcrumbExample, IconExample]
  }
]
