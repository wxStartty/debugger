<template>
  <div class="toolbar-container">
    <div class="left-box">
      <div
        v-if="enableSidebarCollapse"
        class="sidebar-collapse"
        :class="{ 'is-collapse': settingsStore.menu.subMenuCollapse }"
        @click="settingsStore.toggleSidebarCollapse()"
      >
        <svg-icon name="toolbar-collapse" />
      </div>
      <el-breadcrumb
        v-if="settingsStore.toolbar.enableBreadcrumb && settingsStore.mode === 'pc'"
        separator-class="el-icon-arrow-right"
      >
        <transition-group name="breadcrumb">
          <template v-for="(item, index) in breadcrumbList" :key="item.path">
            <el-breadcrumb-item
              v-if="index < breadcrumbList.length - 1"
              :to="pathCompile(item.path)"
            >
              {{ generateTitle(item.title) }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else>
              {{ generateTitle(item.title) }}
            </el-breadcrumb-item>
          </template>
        </transition-group>
      </el-breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<script setup>
  import { compile } from 'path-to-regexp'
  import { cloneDeep } from 'lodash-es'
  import Tools from '../../Tools/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useMenuStore } from '@/store/modules/menu'

  const route = useRoute()

  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  const generateTitle = (routerMetaTitle) => {
    return typeof defaultTitle === 'function' ? routerMetaTitle() : routerMetaTitle
  }
  const enableSidebarCollapse = computed(() => {
    return (
      settingsStore.mode === 'mobile' ||
      (['side', 'head', 'single'].includes(settingsStore.menu.menuMode) &&
        settingsStore.toolbar.enableSidebarCollapse &&
        !(
          settingsStore.menu.subMenuOnylOneHide &&
          menuStore.sidebarMenus.length === 1 &&
          (!menuStore.sidebarMenus[0].children ||
            menuStore.sidebarMenus[0]?.children.every((item) => item.meta.sidebar === false))
        ))
    )
  })

  const breadcrumbList = computed(() => {
    let breadcrumbList = []
    if (settingsStore.dashboard.enable) {
      breadcrumbList.push({
        path: '/dashboard',
        title: settingsStore.dashboard.title,
        i18n: 'route.dashboard'
      })
    }
    if (route.meta.breadcrumbNeste) {
      breadcrumbList.push(...cloneDeep(route.meta.breadcrumbNeste))
    }
    return breadcrumbList
  })

  const pathCompile = (path) => {
    let toPath = compile(path)
    return toPath(route.params)
  }
</script>

<style lang="scss" scoped>
  .toolbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $g-toolbar-height;
    background-color: #fff;
    transition: 0.3s;
    box-shadow: 0 0 1px 0 #ccc;

    .left-box {
      display: flex;
      align-items: center;
      padding-right: 50px;
      overflow: hidden;
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

      .sidebar-collapse {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 50px;
        cursor: pointer;
        transition: 0.3s;

        .svg-icon {
          transition: 0.3s;
        }

        &:hover .svg-icon {
          color: #5482ee;
        }

        &.is-collapse .svg-icon {
          transform: rotateZ(-180deg);
        }

        & + .el-breadcrumb {
          margin-left: 0;
        }
      }

      :deep(.el-breadcrumb) {
        margin-left: 20px;
        white-space: nowrap;

        .el-breadcrumb__item {
          display: inline-block;
          float: none;

          span {
            font-weight: normal;
          }

          &:last-child span {
            color: #97a8be;
          }
        }
      }
    }
  }
  // 面包屑动画
  .breadcrumb-enter-active {
    transition: all 0.25s;
  }

  .breadcrumb-enter-from,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(30px) skewX(-50deg);
  }
</style>
