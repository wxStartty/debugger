<template>
  <el-divider>主题风格</el-divider>
  <div class="theme">
    <el-tooltip content="默认" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-default"
        :class="{ active: settings.app.theme === 'default' }"
        @click="settings.app.theme = 'default'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
    <el-tooltip content="Vue CLI 风格" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-vue-cli"
        :class="{ active: settings.app.theme === 'vue-cli' }"
        @click="settings.app.theme = 'vue-cli'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
    <el-tooltip content="码云风格" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-gitee"
        :class="{ active: settings.app.theme === 'gitee' }"
        @click="settings.app.theme = 'gitee'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
    <el-tooltip content="清新" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-freshness"
        :class="{ active: settings.app.theme === 'freshness' }"
        @click="settings.app.theme = 'freshness'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
    <el-tooltip content="素雅" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-elegant"
        :class="{ active: settings.app.theme === 'elegant' }"
        @click="settings.app.theme = 'elegant'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
    <el-tooltip content="纯白" placement="top" :show-after="500" :append-to-body="false">
      <div
        class="theme-pure-white"
        :class="{ active: settings.app.theme === 'pure-white' }"
        @click="settings.app.theme = 'pure-white'"
      >
        <div class="content" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup name="ThemeSettings">
  const { settings } = inject('AppSetting')
</script>

<style lang="scss" scoped>
  .theme {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;

    [class^='theme-'] {
      position: relative;
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 15px 1px #aaa;
      transition: 0.3s;

      &:hover {
        box-shadow: 0 0 15px 1px #666;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 50%;
        height: 50%;
        pointer-events: none;
      }

      &::before {
        top: 0;
        left: 0;
      }

      &::after {
        top: 0;
        left: 50%;
      }

      &.active {
        box-shadow: 0 0 0 2px #409eff;
      }

      .content {
        position: absolute;
        width: 100%;
        height: 100%;

        &::before,
        &::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 50%;
          pointer-events: none;
        }

        &::before {
          bottom: 0;
          left: 0;
        }

        &::after {
          bottom: 0;
          left: 50%;
        }
      }
    }

    .theme-default {
      &::before {
        background-color: map-get($theme-default, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-default, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-default, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-default, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }

    .theme-vue-cli {
      &::before {
        background-color: map-get($theme-vue-cli, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-vue-cli, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-vue-cli, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-vue-cli, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }

    .theme-gitee {
      &::before {
        background-color: map-get($theme-gitee, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-gitee, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-gitee, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-gitee, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }

    .theme-freshness {
      &::before {
        background-color: map-get($theme-freshness, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-freshness, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-freshness, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-freshness, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }

    .theme-elegant {
      &::before {
        background-color: map-get($theme-elegant, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-elegant, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-elegant, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-elegant, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }

    .theme-pure-white {
      &::before {
        background-color: map-get($theme-pure-white, 'g-header-bg');
      }

      &::after {
        background-color: map-get($theme-pure-white, 'g-header-menu-active-bg');
      }

      .content {
        &::before {
          background-color: map-get($theme-pure-white, 'g-sub-sidebar-bg');
        }

        &::after {
          background-color: map-get($theme-pure-white, 'g-sub-sidebar-menu-active-bg');
        }
      }
    }
  }
</style>
