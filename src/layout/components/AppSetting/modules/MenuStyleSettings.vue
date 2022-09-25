<!--
 * @Description: MenuStyleSettings
 * @Author: wsy
 * @Date: 2022-05-18 15:44:02
 * @LastEditTime: 2022-05-18 20:02:17
 * @LastEditors: wsy
-->
<template>
  <el-divider>导航栏风格</el-divider>
  <div class="menu-style">
    <el-tooltip content="卡片" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="style style-card"
        :class="{ active: settings.menu.menuStyle === 'card' }"
        @click="settings.menu.menuStyle = 'card'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip content="圆角" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="style style-radius"
        :class="{ active: settings.menu.menuStyle === 'radius' }"
        @click="settings.menu.menuStyle = 'radius'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
    <el-tooltip
      v-if="settings.menu.menuMode !== 'single'"
      content="箭头"
      placement="top"
      :show-after="500"
      :append-to-body="false"
    >
      <div
        class="style"
        :class="{
          'style-arrow-right': ['side', 'only-side'].includes(settings.menu.menuMode),
          'style-arrow-bottom': ['head', 'only-head'].includes(settings.menu.menuMode),
          active: settings.menu.menuStyle === 'arrow'
        }"
        @click="settings.menu.menuStyle = 'arrow'"
      >
        <svg-icon name="ri-checkbox-circle-fill" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup name="MenuStyleSettings">
  const { settings } = inject('AppSetting')
</script>

<style lang="scss" scoped>
  .menu-style {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;

    .style {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 60px;
      height: 30px;
      overflow: hidden;
      cursor: pointer;
      background-color: #334067;
      box-shadow: 0 0 15px 1px #aaa;
      transition: 0.3s;

      &:hover {
        box-shadow: 0 0 15px 1px #666;
      }

      &.active {
        box-shadow: 0 0 0 2px #409eff;
      }

      &-radius {
        border-radius: 10px;
      }

      &-arrow-right {
        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -7px;
          width: 0;
          height: 0;
          border-top: 7px solid transparent;
          border-right: 7px solid #fff;
          border-bottom: 7px solid transparent;
        }
      }

      &-arrow-bottom {
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -7px;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 7px solid #fff;
        }
      }

      i {
        display: none;
      }

      &.active i {
        display: block;
        color: #409eff;
      }
    }
  }
</style>
