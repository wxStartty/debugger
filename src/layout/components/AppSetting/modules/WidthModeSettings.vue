<!--
 * @Description: WidthModeSettings
 * @Author: wsy
 * @Date: 2022-05-18 15:52:48
 * @LastEditTime: 2022-05-18 20:00:48
 * @LastEditors: wsy
-->
<template>
  <el-divider v-if="settingsStore.mode === 'pc'">页宽模式</el-divider>
  <div v-if="settingsStore.mode === 'pc'" class="app-width-mode">
    <el-tooltip content="自适应" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="mode mode-adaption"
        :class="{ active: settings.layout.widthMode === 'adaption' }"
        @click="settings.layout.widthMode = 'adaption'"
      >
        <svg-icon name="el-icon-back" class="left" />
        <svg-icon name="el-icon-right" class="right" />
        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
      </div>
    </el-tooltip>
    <el-tooltip
      content="自适应（有最小宽度）"
      placement="top"
      :show-after="500"
      :append-to-body="false"
    >
      <div
        class="mode mode-adaption-min-width"
        :class="{ active: settings.layout.widthMode === 'adaption-min-width' }"
        @click="settings.layout.widthMode = 'adaption-min-width'"
      >
        <svg-icon name="el-icon-back" class="left" />
        <svg-icon name="el-icon-right" class="right" />
        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
      </div>
    </el-tooltip>
    <el-tooltip content="定宽居中" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="mode mode-center"
        :class="{ active: settings.layout.widthMode === 'center' }"
        @click="settings.layout.widthMode = 'center'"
      >
        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
      </div>
    </el-tooltip>
    <el-tooltip
      content="定宽居中（有最大宽度）"
      placement="top"
      :show-after="500"
      :append-to-body="false"
    >
      <div
        class="mode mode-center-max-width"
        :class="{ active: settings.layout.widthMode === 'center-max-width' }"
        @click="settings.layout.widthMode = 'center-max-width'"
      >
        <svg-icon name="el-icon-back" class="left" />
        <svg-icon name="el-icon-right" class="right" />
        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup name="WidthModeSettings">
  const { settings, settingsStore } = inject('AppSetting')
</script>

<style lang="scss" scoped>
  .app-width-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;

    .mode {
      position: relative;
      width: 65px;
      height: 50px;
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

      &-adaption {
        .left,
        .right {
          position: absolute;
          top: 50%;
          margin-top: -8px;
        }

        .left {
          left: 5px;
        }

        .right {
          right: 5px;
        }
      }

      &-adaption-min-width {
        background: #fff;

        &::before {
          content: '';
          position: absolute;
          left: 50%;
          margin-left: -15px;
          height: 100%;
          width: 30px;
          background-color: #e1e3e6;
        }

        .left,
        .right {
          position: absolute;
          top: 50%;
          margin-top: -8px;
        }

        .left {
          left: 0;
        }

        .right {
          right: 0;
        }
      }

      &-center {
        background: #fff;

        &::before {
          content: '';
          position: absolute;
          left: 50%;
          margin-left: -20px;
          height: 100%;
          width: 40px;
          background-color: #e1e3e6;
        }
      }

      &-center-max-width {
        background: #fff;

        &::before {
          content: '';
          position: absolute;
          left: 50%;
          margin-left: -20px;
          height: 100%;
          width: 40px;
          background-color: #e1e3e6;
        }

        .left,
        .right {
          position: absolute;
          top: 50%;
          margin-top: -8px;
        }

        .left {
          left: 13px;
        }

        .right {
          right: 13px;
        }
      }

      .active-icon {
        position: absolute;
        right: 2px;
        bottom: 2px;
        display: none;
      }

      &.active .active-icon {
        display: block;
        color: #409eff;
      }
    }
  }
</style>
