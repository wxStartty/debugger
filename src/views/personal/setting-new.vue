<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-14 22:11:34
 * @LastEditTime: 2022-06-15 08:22:22
 * @LastEditors: wsy
-->
<template>
  <div class="w-full h-full p-[25px]">
    <div class="w-full h-full overflow-hidden bg-white rounded shadow-xl">
      <h2>基本设置</h2>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="120px" label-suffix="：">
            <el-form-item label="名 称">
              <el-input v-model="form.name" placeholder="请输入你的名称" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.mobile" placeholder="请输入你的手机号" />
            </el-form-item>
            <el-form-item label="QQ 号">
              <el-input v-model="form.qq" placeholder="请输入你的 QQ 号" />
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.wechat" placeholder="请输入你的微信号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- <el-col :span="8">
          <image-upload
            v-model:url="form.headimg"
            action="http://scrm.1daas.com/api/upload/upload"
            name="image"
            :data="{ token: 'TKD628431923530324' }"
            notip
            class="headimg-upload"
            @on-success="handleSuccess"
          />
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script setup name="SettingPersonal">
  const form = ref({
    headimg: '',
    mobile: '',
    name: '',
    qq: '',
    wechat: ''
  })
</script>

<style lang="scss" scoped></style>
