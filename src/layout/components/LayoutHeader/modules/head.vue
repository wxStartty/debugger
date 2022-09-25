<!--
 * @Description:顶部模式
 * @Author: wsy
 * @Date: 2022-02-18 15:57:47
 * @LastEditTime: 2022-08-22 18:50:59
 * @LastEditors: wsy
-->
<template>
  <div class="nav nav-radius" v-if="visible">
    <LayoutHeaderScroll ref="scroll">
      <template v-for="(item, index) in menuStore.allMenus" :key="index">
        <div
          v-if="item.children && item.children.length !== 0"
          class="item"
          :class="{ active: index == menuStore.actived }"
          @click="switchMenuHandler($event, index)"
        >
          <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
          <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </div>
        <div
          v-else-if="item.path"
          class="item"
          :class="{ active: index == menuStore.actived }"
          @click="switchPage(item)"
        >
          <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
          <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </div>
      </template>
    </LayoutHeaderScroll>
  </div>
</template>

<script setup name="HeadComponents">
  import { useMenuStore } from '@/store/modules/menu'
  import { useSwitchMenu } from '@/hooks/useSwitchMenu'
  import LayoutHeaderScroll from '@/layout/components/LayoutHeaderScroll/index.vue'
  import { ElMessage } from 'element-plus'
  const switchMenu = useSwitchMenu()
  const scroll = ref(null)
  const menuStore = useMenuStore()
  const switchMenuHandler = (e, index) => {
    const none = menuStore.allMenus[index]?.meta.none
    if (none) {
      e.stopPropagation()
      ElMessage({
        message: '暂未上线，敬请期待',
        type: 'warning'
      })
      return
    }
    switchMenu(index)
  }
  const switchPage = (router) => {
    const { path } = router
    window.open(path)
  }
  const visible = computed(() => menuStore.allMenus.length > 1)
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    align-items: center;
    width: 0;
    height: 100%;
    margin-right: 30px;
    margin-left: 30px;

    .item {
      @include themeify {
        color: themed('g-header-menu-color');
        background-color: themed('g-header-bg');
      }

      display: flex;
      flex: none;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      height: 40px;
      padding: 0 10px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        @include themeify {
          color: themed('g-header-menu-hover-color');
          background-color: themed('g-header-menu-hover-bg');
        }
      }

      &.active {
        @include themeify {
          color: themed('g-header-menu-active-color');
          background-color: themed('g-header-menu-active-bg');
        }
      }

      .svg-icon {
        font-size: 24px;
        vertical-align: middle;

        & + span {
          @include text-overflow(1, false);

          vertical-align: middle;
        }
      }

      .park-icon {
        margin-right: 5px;
        color: unset;
      }
    }

    &.nav-radius {
      .item {
        margin: 5px 15px 5px 0;
        border-radius: 5px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &.nav-arrow {
      .item {
        position: relative;

        &.active::before {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 0;
          margin-left: -7px;
          content: '';
          border-right: 7px solid transparent;
          border-bottom: 7px solid #fff;
          border-left: 7px solid transparent;
        }
      }
    }
  }
</style>
