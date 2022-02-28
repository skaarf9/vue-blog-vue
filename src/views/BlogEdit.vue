/* eslint-disable no-undef */
<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 15:45:56
 * @LastEditTime: 2022-02-28 22:45:11
 * @Description: file content
 * @FilePath: \vueblog-vue\src\views\BlogEdit.vue
-->
<!-- BlogEdit -->
<template>
  <div class="blogEdit">
    <Header></Header>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="ruleForm.title"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="ruleForm.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >{{ submitMsg }}</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-unused-vars
import Header from "@/components/BlogHeader.vue";
import { reactive, ref } from "vue";
// import { ElForm, ElMessageBox } from "element-plus";
import { Action, ElForm } from "element-plus";
import axios from "axios";
import router from "@/router";
import { useRoute } from "vue-router";

type FormInstance = InstanceType<typeof ElForm>;

const submitMsg = ref("创建");

const formSize = ref(undefined);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  title: "",
  description: "",
  content: "",
});

// 如果有设置id
const route = useRoute();
if (route.params.blogId) {
  const blogId = Number.parseInt(route.params.blogId as string);
  if (blogId !== NaN) {
    // console.log(route.params.blogId);
    axios.get("/blog/" + route.params.blogId).then((res: any) => {
      console.log(res);
      const blog = res.data.data;
      ruleForm.content = blog.content;
      ruleForm.description = blog.description;
      ruleForm.title = blog.title;
      submitMsg.value = "提交";
    });
  }
}

const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
    {
      min: 2,
      max: 20,
      message: "长度在2~20之间",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "请输入描述",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入内容",
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios
        .post("/blog/edit", ruleForm, {
          headers: {
            Authorization: localStorage.getItem("token") as string,
          },
        })
        .then(() => {
          ElMessageBox.alert("添加成功", "博客", {
            confirmButtonText: "OK",
            callback: (action: Action) => {
              router.push("/blogs");
            },
          });
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
.demo-ruleForm {
  max-width: 900px;
  margin: 10px auto;
}
</style>
