<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 15:39:57
 * @LastEditTime: 2022-02-27 21:05:43
 * @Description: file content
 * @FilePath: \vueblog-vue\src\views\UserLogin.vue
-->
<!-- UserLogin -->
<template>
  <div class="login">
    <el-container>
      <el-header>
        <img class="logo" src="@/assets/logo.png" alt="" />
      </el-header>
      <el-main>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          status-icon
          class="loginForm"
        >
          <el-form-item label="Username" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { ElForm } from "element-plus";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;

/* const checkUserName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入名称"));
  } else {
    if (ruleForm.username !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("username", () => null);
    }
    callback();
  }
};
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
}; */

const ruleForm = reactive({
  username: "markerhub",
  password: "111111",
});

const rules = reactive({
  // username: [{ validator: checkUserName, trigger: "blur" }],
  // password: [{ validator: checkPassword, trigger: "blur" }],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log("submit!");
      axios.post("login", ruleForm).then((res) => {
        const jwt = res.headers["authorization"];
        const userInfo = res.data.data;
        // console.log(jwt);
        // console.log(userInfo);
        store.commit("SET_TOKEN", jwt);
        store.commit("SET_USERINFO", userInfo);
        // console.log(store.getters.getUser);
        router.push("/blogs");
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
.login .el-header,
.login .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.login .el-footer {
  line-height: 60px;
}
.logo {
  height: 50px;
  margin-top: 10px;
  position: absolute;
  margin-left: 15px;
  left: 0%;
}
.login .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.login .el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.login > .el-container {
  margin-bottom: 40px;
}

.loginForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>
