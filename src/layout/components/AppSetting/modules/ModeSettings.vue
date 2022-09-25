<!--
 * @Description: ModeSettings
 * @Author: wsy
 * @Date: 2022-05-18 14:22:40
 * @LastEditTime: 2022-05-18 20:01:50
 * @LastEditors: wsy
-->
<template>
  <el-divider v-if="isShow">导航栏模式</el-divider>
  <div v-if="isShow" class="menu-mode">
    <el-tooltip
      content="侧边栏模式（含主导航）"
      placement="top"
      :show-after="500"
      :append-to-body="false"
    >
      <div
        class="mode mode-side"
        :class="{ active: settings.menu.menuMode === 'side' }"
        @click="settings.menu.menuMode = 'side'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip content="顶部模式" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="mode mode-head"
        :class="{ active: settings.menu.menuMode === 'head' }"
        @click="settings.menu.menuMode = 'head'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip
      content="侧边栏模式（不含主导航）"
      placement="top"
      :show-after="500"
      :append-to-body="false"
    >
      <div
        class="mode mode-single"
        :class="{ active: settings.menu.menuMode === 'single' }"
        @click="settings.menu.menuMode = 'single'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip content="侧边栏精简模式" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="mode mode-only-side"
        :class="{ active: settings.menu.menuMode === 'only-side' }"
        @click="settings.menu.menuMode = 'only-side'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip content="顶部精简模式" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="mode mode-only-head"
        :class="{ active: settings.menu.menuMode === 'only-head' }"
        @click="settings.menu.menuMode = 'only-head'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup name="ModeSettings">
  const { settings, settingsStore } = inject('AppSetting')
  const isShow = computed(() => settingsStore.mode === 'pc')
</script>

<style lang="scss" scoped>
  .menu-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;

    .mode {
      position: relative;
      width: 50px;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      background-color: #e1e3e6;
      box-shadow: 0 0 15px 1px #aaa;
      transition: 0.3s;

      &:hover {
        box-shadow: 0 0 15px 1px #666;
      }

      &.active {
        box-shadow: 0 0 0 2px #409eff;
      }

      &::before,
      &::after {
        pointer-events: none;
      }

      &-side {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 100%;
          background-color: #222b45;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 10px;
          width: 15px;
          height: 100%;
          background-color: #fff;
        }
      }

      &-head {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          background-color: #222b45;
        }

        &::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 0;
          width: 15px;
          height: calc(100% - 10px);
          background-color: #fff;
        }
      }

      &-single {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 15px;
          height: 100%;
          background-color: #fff;
        }
      }

      &-only-side {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 100%;
          background-color: #222b45;
        }
      }

      &-only-head {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          background-color: #222b45;
        }
      }

      i {
        position: absolute;
        right: 2px;
        bottom: 2px;
        display: none;
      }

      &.active i {
        display: block;
        color: #409eff;
      }
    }
  }
</style>
