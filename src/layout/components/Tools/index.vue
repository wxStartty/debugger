<template>
  <div class="tools">
    <div class="buttons">
      <!-- 搜索 -->
      <icon-search
        v-if="settingsStore.toolbar.enableNavSearch"
        class="item"
        @click="$eventBus.emit('global-search-toggle')"
        v-bind="iconTheme"
      />
      <!-- 通知 -->
      <el-popover
        v-if="settingsStore.toolbar.enableNotification"
        trigger="hover"
        :show-after="200"
        placement="bottom"
        :width="350"
      >
        <Notification ref="tabs" />
        <template #reference>
          <span class="item">
            <el-badge type="primary" :value="5">
              <icon-remind v-bind="iconTheme" />
            </el-badge>
          </span>
        </template>
      </el-popover>
      <!-- 放大 -->
      <span
        v-if="settingsStore.mode === 'pc' && settingsStore.toolbar.enableFullscreen"
        class="item"
        @click="toggle"
      >
        <icon-full-screen v-if="!isFullscreen" v-bind="iconTheme" />
        <icon-off-screen v-else v-bind="iconTheme" />
      </span>
      <!-- 刷新页面 -->
      <icon-redo
        v-if="settingsStore.toolbar.enablePageReload"
        v-bind="iconTheme"
        @click="reload()"
        class="item"
      />
      <!-- 控制器 -->
      <span
        v-if="settingsStore.toolbar.enableAppSetting && isDev"
        class="item"
        @click="$eventBus.emit('global-app-setting-toggle')"
      >
        <icon-setting-two v-bind="iconTheme" />
      </span>
    </div>
    <el-dropdown class="user-container" size="default" @command="userCommand">
      <div class="user-wrapper">
        <el-avatar size="small" :src="avatar"> </el-avatar>
        {{ userStore.account }}
        <el-icon><el-icon-caret-bottom /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item v-if="settingsStore.dashboard.enable" command="dashboard"
            >控制台</el-dropdown-item
          >
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup name="Tools">
  import Notification from './Notification/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useUserStore } from '@/store/modules/user'
  import { useFullscreen } from '@vueuse/core'
  import { useReload } from '@/hooks/useReload'
  import avatar from '@/assets/images/avatar.jpeg'
  const reload = useReload()
  const router = useRouter()

  const settingsStore = useSettingsStore()
  const userStore = useUserStore()

  const { isFullscreen, toggle } = useFullscreen()
  const iconTheme = computed(() => ({
    theme: 'outline',
    size: '17',
    strokeLinejoin: 'bevel'
  }))
  const userCommand = (command) => {
    switch (command) {
      case 'dashboard':
        router.push({
          name: 'dashboard'
        })
        break
      case 'setting':
        router.push({
          name: 'personalSetting'
        })
        break
      case 'logout':
        logout()
        break
    }
  }
  const logout = async () => {
    const isAllowLogout = await userStore.logoutBeforeAsk()
    if (isAllowLogout) {
      await userStore.logout()
      router.push({
        name: 'login'
      })
    }
  }
  const isDev = computed(() => {
    return __DEV__
  })
</script>

<style lang="scss" scoped>
  .tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;

    .buttons {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .park-icon {
        color: unset;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 26px;
        cursor: pointer;

        [class^='ri-'] {
          vertical-align: -0.15em;
        }

        .el-badge {
          vertical-align: initial;
        }

        .park-icon {
          display: flex;
          align-items: center;
        }
      }
    }

    :deep(.language-container) {
      font-size: 16px;
    }

    :deep(.user-container) {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      cursor: pointer;

      .user-wrapper {
        .el-avatar {
          margin-top: -2px;
          margin-right: 4px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
