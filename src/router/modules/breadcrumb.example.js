/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-05-17 17:14:21
 * @LastEditors: wsy
 */
const Layout = () => import('@/layout/index.vue')

export default {
  path: '/breadcrumb_example',
  component: Layout,
  redirect: '/breadcrumb_example/list1',
  name: 'breadcrumbExample',
  meta: {
    title: '面包屑导航',
    icon: 'icon-cup'
  },
  children: [
    {
      path: 'list1',
      name: 'breadcrumbExampleList1',
      component: () => import('@/views/breadcrumb_example/list1.vue'),
      meta: {
        title: '列表1（平级模式）'
      }
    },
    {
      path: 'detail1',
      name: 'breadcrumbExampleDetail1',
      component: () => import('@/views/breadcrumb_example/detail1.vue'),
      meta: {
        title: '详情1',
        sidebar: false,
        activeMenu: '/breadcrumb_example/list1'
      }
    },
    {
      path: 'list2',
      name: 'breadcrumbExampleList2',
      redirect: '/breadcrumb_example/list2',
      meta: {
        title: '列表2（层级模式）'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/breadcrumb_example/list2.vue'),
          meta: {
            title: '列表2（层级模式）',
            sidebar: false,
            breadcrumb: false
          }
        },
        {
          path: 'detail2',
          name: 'breadcrumbExampleDetail2',
          component: () => import('@/views/breadcrumb_example/detail2.vue'),
          meta: {
            title: '详情2',
            sidebar: false,
            activeMenu: '/breadcrumb_example/list2'
          }
        }
      ]
    }
  ]
}
