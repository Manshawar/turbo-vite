<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="https://s.yezgea02.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form :model="loginForm" label-position="top" class="login-form">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="loginForm.userName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwordMd5">
          <el-input v-model="loginForm.passwordMd5" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">
            登录表示您已同意
            <a>《服务条款》</a>
          </div>
          <el-button @click="login" style="width: 100%" type="primary">立即登录</el-button>
          <el-checkbox>下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { formData } from "@/hooks/form";
import { userStore } from "@/store/modules/user";
const { login: userLogin } = userStore();
import md5 from "md5";
const userInfo = {
  userName: "admin",
  passwordMd5: "123456",
};
const [loginForm, reSetLoginForm] = formData(userInfo);

const login = async () => {
  loginForm.passwordMd5 = md5(userInfo.passwordMd5);
  await userLogin(loginForm);
  reSetLoginForm();
};
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form >>> .el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form >>> .el-form-item {
  margin-bottom: 0;
}
</style>
