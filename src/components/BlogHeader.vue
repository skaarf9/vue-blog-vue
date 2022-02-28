<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-26 22:04:27
 * @LastEditTime: 2022-02-28 02:13:53
 * @Description: file content
 * @FilePath: \vueblog-vue\src\components\BlogHeader.vue
-->
<template>
  <div class="header">
    <h3>欢迎来到MarkerHub</h3>
    <div class="block">
      <el-avatar
        size="large"
        :icon="UserFilled"
        :src="userInfo.avatar"
      ></el-avatar>
    </div>
    <h4 class="userName">{{ userInfo.username }}</h4>
    <div class="menu">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span
        ><el-link type="success" href="/blog/add" target="_blank"
          >发表博客</el-link
        ></span
      >
      <el-divider direction="vertical" border-style="dashed"></el-divider>
      <el-link type="primary" v-show="!hasLogin" href="/login">登录</el-link>
      <span
        ><el-link type="danger" v-show="hasLogin" @click="logout"
          >退出</el-link
        ></span
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import { UserFilled } from "@element-plus/icons-vue";
import { reactive } from "@vue/reactivity";
import axios from "axios";
import { ref } from "vue";

let hasLogin = ref<boolean>(false);

const userInfo = reactive({
  username: "",
  avatar: "",
});

if (store.getters.getUser) {
  userInfo.username = store.getters.getUser.username;
  userInfo.avatar = store.getters.getUser.avatar;
  hasLogin.value = true;
}

const logout = () => {
  // console.log("你好");
  axios
    .get("/logout", {
      headers: {
        Authorization: localStorage.getItem("token") as string,
      },
    })
    .then(() => {
      store.commit("REMOVE_INFO");
    });
  router.push("/login");
};
</script>
<style scoped>
.header {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}

.menu {
  margin: 10px 0;
}

menu .el-link {
  margin: 3px auto;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.userName {
  margin: 0 auto;
}
</style>
