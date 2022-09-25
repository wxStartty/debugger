<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-13 16:05:03
 * @LastEditTime: 2022-06-14 17:28:07
 * @LastEditors: wsy
-->
<template>
  <div class="w-full mt-[160px] px-[35px] flex flex-col items-center"
    ><el-form
      ref="resetFormRef"
      :model="resetForm"
      :rules="resetRules"
      class="w-full max-w-[600px] login-form"
      label-position="left"
    >
      <div class="title-container w-[100%] xl:w-[216px] mb-[48px]">
        <h3 class="text-white xl:text-gray-700 font-mono text-[30px] font-black">重置密码</h3>
      </div>
      <div>
        <el-form-item prop="account">
          <el-input
            ref="name"
            v-model="resetForm.account"
            placeholder="请输入用户名"
            type="text"
            tabindex="1"
            size="large"
            @focus="focusInput('account')"
          >
            <template #prefix>
              <el-icon :color="focusTarget === 'account' ? '#0052d9' : ''">
                <svg-icon name="user" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            ref="captcha"
            v-model="resetForm.captcha"
            placeholder="请输入验证码"
            type="text"
            tabindex="2"
            size="large"
            @focus="focusInput('captcha')"
          >
            <template #prefix>
              <el-icon :color="focusTarget === 'captcha' ? '#0052d9' : ''">
                <svg-icon name="captcha" />
              </el-icon>
            </template>
            <template #append>
              <el-button :disabled="!countdown" class="w-[130px]" @click="sendReminderCode">
                <template v-if="countdown">
                  <span> 发送短信验证码 </span>
                </template>
                <template v-else>
                  <span>
                    有效期限 <span class="text-blue-500 underline">{{ reminder }}</span> 秒
                  </span>
                </template>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="w-full">
          <PassWordVerify
            v-model="resetForm.newPassword"
            ref="passWordVerifyRef"
            size="large"
            :width="600"
            :min-length="8"
            :max-length="16"
            block
            repeat
            required
            @focusChange="focusInput('other')"
          />
        </div>
      </div>
      <el-row :gutter="15" style="padding-top: 20px">
        <el-col :md="6">
          <el-button
            size="large"
            class="mb-[30px]"
            style="width: 100%"
            @click="replaceFrom('login')"
            >去登录</el-button
          >
        </el-col>
        <el-col :md="18">
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            style="width: 100%"
            @click="resetPassword"
            >确认</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup name="ResetFrom">
  import storage from '@/util/storage'
  import { ElMessage } from 'element-plus'
  // 懒加载的组件无法字节使用全局定义的components
  import PassWordVerify from '@/components/PassWordVerify/index.vue'
  const emits = defineEmits(['replaceFrom'])

  const passWordVerifyRef = ref()
  // input icon 高亮
  const { focusInput, focusTarget } = focusEffect()

  // 倒计时
  const { reminder, countdown, sendReminderCode } = useReminderCode()

  // 重设密码
  const resetFormRef = ref()
  const loading = ref(false)
  const { resetForm, resetRules, resetPassword } = useResetFrom(resetFormRef, loading)

  /**
   * 切换表单
   */
  function replaceFrom(from) {
    clearInterval(sendReminderCode)
    emits('replaceFrom', from)
  }

  /**
   * 输入框input focus effect
   */
  function focusEffect() {
    const focusTarget = ref('')
    function focusInput(focus) {
      focusTarget.value = focus
    }
    return {
      focusInput,
      focusTarget
    }
  }

  /**
   * 倒计时
   */
  function useReminderCode() {
    const reminder = ref(60)
    const countdown = ref(true)
    const sendReminderCode = () => {
      ElMessage({
        message: '验证码已发送',
        type: 'success'
      })
      reminder.value = 60
      countdown.value = false
      const sti = setInterval(() => {
        reminder.value--
      }, 1000)
      return sti
    }
    watch(reminder, (newValue) => {
      if (newValue === 0 && (countdown.value = true)) {
        clearInterval(sendReminderCode)
        countdown.value = true
      }
    })
    return {
      reminder,
      countdown,
      sendReminderCode
    }
  }

  /**
   * 重置密码
   */
  function useResetFrom(resetFormRef, loading) {
    const resetForm = ref({
      account: storage.local.get('login_account'),
      captcha: '',
      newPassword: ''
    })
    const resetRules = ref({
      account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
      newPassword: [
        { required: true, trigger: 'blur', message: '请输入新密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
      ]
    })

    async function resetPassword() {
      const passwordIsValidator = await passWordVerifyRef.value.isValidator()
      const resetFormIsValidator = await resetFormRef.value.validate((valid) => valid)
      if (resetFormIsValidator && passwordIsValidator) {
        console.info(resetForm.value)
        loading.value = true
        ElMessage({
          message: '重置密码成功',
          type: 'success'
        })
        loading.value = false
        replaceFrom('login')
      }
    }
    return { resetForm, resetRules, resetPassword }
  }
</script>

<style lang="scss" scoped></style>
