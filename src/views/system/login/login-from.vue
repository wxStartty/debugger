<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-09 19:43:28
 * @LastEditTime: 2022-06-14 17:22:27
 * @LastEditors: wsy
-->
<template>
  <div class="w-full mt-[160px] px-[35px] flex flex-col items-center">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="w-full max-w-[600px] login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container w-[100%] mb-[48px]">
        <h3 class="text-white xl:text-gray-700 font-mono text-[30px] font-black">{{ title }}</h3>
      </div>
      <div>
        <el-form-item prop="account">
          <el-input
            ref="name"
            v-model="loginForm.account"
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
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            tabindex="2"
            size="large"
            @focus="focusInput('password')"
          >
            <template #prefix>
              <el-icon :color="focusTarget === 'password' ? '#0052d9' : ''">
                <svg-icon name="password" />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon>
                <svg-icon
                  :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                  @click="showPassword"
                />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verify">
          <div class="flex-auto h-full pr-[15px]">
            <el-input
              ref="verify"
              v-model="loginForm.verify"
              placeholder="请输入验证码"
              tabindex="3"
              size="large"
              @focus="focusInput('verify')"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <icon-shield-add
                  theme="filled"
                  size="15"
                  :fill="focusTarget === 'verify' ? '#0052d9' : '#A8ABB2'"
                />
              </template>
            </el-input>
          </div>
          <div class="w-[122px] h-full border-gray-300 border-[1px] overflow-hidden rounded">
            <VerificationCode v-model="verifyCode" />
          </div>
        </el-form-item>
      </div>
      <div class="flex justify-between mt-[20px]">
        <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        <el-button link @click="replaceFrom('reset')">忘记密码</el-button>
      </div>
      <el-button
        class="mt-[48px]"
        :loading="loading"
        type="primary"
        size="large"
        style="width: 100%"
        @click.prevent="handleLogin"
        >登录</el-button
      >
      <div class="flex w-full h-[40px] mt-[30px] px-[10px]">
        <div class="w-4/12 h-[20px] border-gray-400 border-b-[1px]"></div>
        <div class="flex items-center justify-center w-4/12 h-full text-sm text-gray-500"
          >第三方登录</div
        >
        <div class="w-4/12 h-[20px] border-gray-400 border-b-[1px]"></div>
      </div>
      <div class="flex justify-center w-full mt-[25px]">
        <div class="w-[120px] flex justify-around">
          <el-icon :size="25" color="#0053D9" @click="replaceFrom('dd')">
            <i-ri-dingding-fill class="cursor-pointer"></i-ri-dingding-fill>
          </el-icon>
          <el-icon :size="25" color="#03DD6B" @click="replaceFrom('wx')">
            <i-uiw-weixin class="cursor-pointer"></i-uiw-weixin>
          </el-icon>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup name="LoginFrom">
  import storage from '@/util/storage'
  import { useUserStore } from '@/store/modules/user'
  import VerificationCode from './verification-code.vue'
  import { ElMessage } from 'element-plus'
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const title = ref(import.meta.env.VITE_APP_TITLE)
  const verifyCode = ref()

  const redirect = ref(null)
  onMounted(() => {
    redirect.value = route.query.redirect ?? '/'
  })
  // 登录表单信息
  const loginFormRef = ref()
  const loading = ref(false)
  // 登录信息
  const loginForm = ref({
    account: storage.local.get('login_account'),
    password: '',
    verify: '',
    remember: storage.local.has('login_account')
  })
  const { loginRules, handleLogin } = useLoginFrom(loginFormRef, loading)

  // 切换password icon
  const { passwordType, showPassword } = usePasswordIconChange()

  // 当前聚焦的元素
  const { focusInput, focusTarget } = focusEffect()

  // 表单类型，login 登录
  const emits = defineEmits(['qrCode', 'replaceFrom'])

  function replaceFrom(from) {
    emits('replaceFrom', from)
  }

  /**
   * 显示密码和隐藏密码
   */
  function usePasswordIconChange() {
    const passwordType = ref('password')
    function showPassword() {
      passwordType.value = passwordType.value === 'password' ? '' : 'password'
    }
    return {
      passwordType,
      showPassword
    }
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

  /**
   * 登录表单
   */
  function useLoginFrom(loginFormRef, loading) {
    // 校验规则
    const loginRules = ref({
      account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      password: [
        { required: true, trigger: 'blur', message: '请输入密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
      ],
      verify: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
    })

    // 登录
    function handleLogin() {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          userStore
            .login(loginForm.value)
            .then(() => {
              ElMessage({
                message: '登录成功',
                type: 'success'
              })
              loading.value = false
              if (loginForm.value.remember) {
                storage.local.set('login_account', loginForm.value.account)
              } else {
                storage.local.remove('login_account')
              }
              router.push(redirect.value)
            })
            .catch(() => {
              loading.value = false
            })
        }
      })
    }
    return {
      loginRules,
      handleLogin
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    @apply w-[100%] xl:w-[216px] mb-[48px];

    height: 44px;
  }

  :deep(.el-input-group__append) {
    padding: 1px;
    overflow: hidden;
  }
</style>
