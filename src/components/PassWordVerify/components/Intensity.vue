<template>
  <div class="intensity">
    <div class="intensity-item">
      <el-space>
        <span>密码强度</span>
        <span
          class="lump"
          v-for="(item, index) in 5"
          :key="index"
          :class="{ active: password.strength > index, success: success }"
        ></span>
      </el-space>
    </div>

    <div class="intensity-item">
      <el-space>
        <span class="icon-fix">
          <el-icon color="#F56C6C" :size="16" v-if="!password.length">
            <ElIconCircleCloseFilled />
          </el-icon>
          <el-icon color="#E6A23C" :size="16" v-else-if="success && password.length === false">
            <ElIconOpportunity />
          </el-icon>
          <el-icon color="#67C23A" :size="16" v-else>
            <ElIconCircleCheckFilled />
          </el-icon>
        </span>
        <span>{{ minLength }}-{{ maxLength }}个字符，区分大小写，前后无空格</span>
        <el-tag class="ml-2" type="warning" v-show="!password.length && success">建议增强</el-tag>
      </el-space>
    </div>
    <div class="intensity-item" v-for="(item, index) in Object.keys(regexp)" :key="index">
      <el-space>
        <span class="icon-fix">
          <el-icon color="#F56C6C" :size="16" v-if="!password[item] && !success">
            <ElIconCircleCloseFilled />
          </el-icon>
          <el-icon color="#E6A23C" :size="16" v-else-if="success && !password[item]">
            <ElIconOpportunity />
          </el-icon>
          <el-icon color="#67C23A" :size="16" v-else>
            <ElIconCircleCheckFilled />
          </el-icon>
        </span>
        <span>{{ regexp[item] }}</span>
        <el-tag class="ml-2" type="warning" v-show="!password[item] && success">建议增强</el-tag>
      </el-space>
    </div>
    <div class="intensity-item">
      <el-space>
        <span class="icon-fix">
          <el-icon color="#F56C6C" :size="16" v-if="!password.complexity">
            <ElIconCircleCloseFilled />
          </el-icon>
          <el-icon color="#67C23A" :size="16" v-else>
            <ElIconCircleCheckFilled />
          </el-icon>
        </span>
        <span>需包含大小写字母、数字及特殊字符三种或以上组合</span>
      </el-space>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    value: {
      type: String,
      default: ''
    },
    minLength: {
      type: Number,
      default: 6
    },
    maxLength: {
      type: Number,
      default: 32
    },
    password: {
      type: Object,
      default: () => {
        return {
          strength: 0,
          length: false,
          complexity: false,
          lower: false,
          upper: false,
          number: false,
          character: false
        }
      }
    }
  })
  const regexp = {
    lower: '小写字母',
    upper: '大写字母',
    number: '数字',
    character: '特殊字符 ~!@#$%^&*()_+=\\-.,'
  }
  const success = computed(() => {
    return props.password.strength >= 4
  })
</script>

<style lang="scss" scoped>
  .intensity {
    width: 100%;
    padding: 10px 0;

    &-item {
      display: flex;
      align-items: center;
      height: 34px;
    }

    .icon-fix {
      @apply flex;
    }

    span.lump {
      display: inline-block;
      width: 50px;
      height: 12px;
      background: #f0f0f0;
      border-radius: 2px;
    }

    span.active {
      background: var(--el-color-primary);
    }

    span.active.success {
      background: var(--el-color-success);
    }

    span.primary-color {
      color: var(--el-color-primary);
    }
  }
</style>
