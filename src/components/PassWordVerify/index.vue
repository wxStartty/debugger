<template>
  <div class="relative password-box" :class="{ 'block-box': props.block }">
    <el-popover
      ref="popoverRef"
      v-model:visible="triggerPopover"
      placement="top-start"
      display-directive="show"
      :width="props.width"
      :class="{ 'block-box': props.block }"
      title="密码强度校验"
    >
      <template #reference>
        <el-form :model="formValue" inline :show-label="false" :rules="rules" ref="formRef">
          <el-form-item prop="password" :class="{ 'mr-0': props.block }" class="w-full">
            <el-input
              type="password"
              ref="passwordRef"
              v-model="formValue.password"
              @input="inputChange"
              placeholder="请输入新密码"
              :maxlength="maxLength"
              :size="props.size"
              show-password
              @focus="passWordFocus('password')"
              @blur="passWordBlur"
            >
              <template #prefix>
                <el-icon :color="focusTarget === 'password' ? '#0052d9' : ''">
                  <svg-icon name="password" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="repeat" v-if="repeat" :class="{ 'mr-0': block }" class="w-full">
            <el-input
              type="password"
              v-model="formValue.repeat"
              placeholder="请再次输入密码"
              show-password
              :maxlength="maxLength"
              :size="props.size"
              @focus="passWordFocus('repeat')"
            >
              <template #prefix>
                <el-icon :color="focusTarget === 'repeat' ? '#0052d9' : ''">
                  <svg-icon name="password" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <Intensity v-bind="intensityValue" />
    </el-popover>
  </div>
</template>

<script setup name="PassWordVerify">
  import Intensity from './components/Intensity.vue'
  import { useVModel } from '@vueuse/core'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 350
    },
    // 密码框内容
    value: {
      type: [Number, String],
      default: ''
    },
    // 是否必填
    required: {
      type: Boolean,
      default: true
    },
    // 密码最短长度要求
    minLength: {
      type: Number,
      default: 6
    },
    // 密码最大长度要求
    maxLength: {
      type: Number,
      default: 32
    },
    // 验证规格
    rules: {
      type: Object,
      default: () => {}
    },
    // 是否显示 [ 再次确认密码 ] 输入框
    repeat: {
      type: Boolean,
      default: false
    },
    // 尺寸
    size: {
      type: String,
      default: 'medium'
    },
    // block属性将使按钮适合其父宽度
    block: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['change', 'update:modelValue', 'focusChange'])
  const data = useVModel(props, 'modelValue', emit)
  const formRef = ref()
  const triggerPopover = ref(false)

  const formValue = ref({
    password: props.value,
    repeat: ''
  })

  const password = ref({
    strength: 0,
    tips: null,
    length: false,
    format: false,
    complexity: false
  })
  const rules = {
    password: [{ required: true, validator: checkPasswordVal, trigger: ['change', 'blur'] }],
    repeat: [{ required: props.repeat, validator: checkRepeat, trigger: ['change', 'blur'] }]
  }

  const popoverRef = ref()
  const passwordRef = ref()

  const intensityValue = computed(() => {
    return {
      value: formValue.value.password,
      complexity: props.complexity,
      minLength: props.minLength,
      maxLength: props.maxLength,
      password: password.value,
      complexityTip: props.complexityTip
    }
  })
  // 当前聚焦的元素
  const { focusInput, focusTarget } = focusEffect()
  const passWordFocus = (target) => {
    emit('focusChange')
    if (target === 'password') {
      triggerPopover.value = true
    }
    focusInput(target)
  }
  const passWordBlur = () => {
    triggerPopover.value = false
  }
  /**
   * 输入框input focus effect
   */
  function focusEffect() {
    const focusTarget = ref('')
    const focusInput = (focus) => {
      focusTarget.value = focus
    }
    return {
      focusInput,
      focusTarget
    }
  }

  function inputChange(value) {
    emit('change', value)
    data.value = value
    password.value.strength = getStrength(value)
  }
  const reg = {
    length: /^.{8,16}$/,
    lower: /[a-z]/,
    upper: /[A-Z]/,
    number: /[\d]/,
    character: /[~!@#$%^&*()_+=\-.,]/
  }

  function checkPasswordVal(_, value) {
    if (!props.required && !value) {
      return true
    }
    if (!value) {
      password.value = {
        strength: 0,
        length: false,
        complexity: false,
        lower: false,
        upper: false,
        number: false,
        character: false
      }
      return new Error('请设置密码')
    } else {
      password.value.complexity = false
      password.value.lower = reg.lower.test(value)
      password.value.upper = reg.upper.test(value)
      password.value.number = reg.number.test(value)
      password.value.character = reg.character.test(value)
      if (checkPassword(value)) {
        password.value.length = true
        const strength = getStrength(value)
        password.value.strength = strength
        password.value.complexity = true
        return true
      } else {
        if (value.length < props.minLength) {
          password.value.length = false
          password.value.tips = null
          const strength = getStrength(value)
          password.value.strength = strength
          return new Error(`密码长度至少为${props.minLength}个字符`)
        }

        password.value.length = true
        const strength = getStrength(value)
        password.value.strength = strength
        return new Error('需包含大小写字母、数字及特殊字符三种或以上组合')
      }
    }
  }

  function checkRepeat(_, value) {
    if (!props.required && !value) {
      return true
    }
    if (!value) {
      return new Error('请再次输入密码')
    } else {
      if (formValue.value.password !== value) {
        return new Error('两次密码输入不一致')
      }
      return true
    }
  }

  function checkPassword(password) {
    const regExp =
      /^(?![\da-z]+$)(?![\dA-Z]+$)(?![\d!@#$%^&*()_+=\-.,]+$)(?![a-zA-Z]+$)(?![a-z!@#$%^&*()_+=\-.,]+$)(?![A-Z!@#$%^&*()_+=\-.,]+$)[\da-zA-z!@#$%^&*()_+=\-.,]{8,16}$/

    return regExp.test(password)
  }
  function getStrength(password) {
    let strength = 0
    if (reg.length.test(password)) strength++
    if (reg.lower.test(password)) strength++
    if (reg.upper.test(password)) strength++
    if (reg.number.test(password)) strength++
    if (reg.character.test(password)) strength++
    return strength
  }

  function isValidator() {
    return formRef.value.validate((valid) => valid)
  }

  defineExpose({
    isValidator
  })
</script>

<style lang="scss" scoped>
  .password-box {
    display: inline-block;
  }

  .block-box {
    display: block;
    width: 100%;
  }

  .el-form-item .el-form-item.mr-0 {
    margin-right: 0;
  }
</style>
