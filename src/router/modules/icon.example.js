const Layout = () => import('@/layout/index.vue')

export default {
  path: '/icon_example',
  component: Layout,
  redirect: '/icon_example/list',
  name: 'iconExample',
  meta: {
    title: '图标展示',
    icon: 'icon-circle-four'
  },
  children: [
    {
      path: 'list',
      name: 'iconExampleList',
      component: () => import('@/views/icons_example/index.vue'),
      meta: {
        title: '图标展示',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/icon_example',
        icon: 'icon-circle-four'
      }
    }
  ]
}
