<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 15:46:28
 * @LastEditTime: 2022-03-01 01:28:33
 * @Description: file content
 * @FilePath: \vueblog-vue\src\views\BlogDetail.vue
-->
<!-- BlogDetail -->
<template>
  <div class="blogDetail">
    <Header></Header>
    <div class="box">
      <div class="title">
        <h3>{{ blogInfo.title }}</h3>
        <el-link :icon="Edit" @click="edit" v-if="ownBlog">编辑</el-link>
      </div>
      <el-divider></el-divider>
      <div class="description">
        <h4>{{ blogInfo.description }}</h4>
      </div>
      <el-divider></el-divider>
      <v-md-editor :model-value="blogInfo.content" mode="preview"></v-md-editor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/BlogHeader.vue";
import router from "@/router";
import store from "@/store";
import { Edit } from "@element-plus/icons-vue";
import VueMarkdownEditor, { xss } from "@kangc/v-md-editor";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const blogInfo = reactive({
  title: "",
  description: "",
  content: "",
  userId: 0,
});

const ownBlog = ref<boolean>();

const edit = () => {
  router.push(`/blog/${route.params.blogId}/edit`);
};

if (route.params.blogId) {
  const blogId = Number.parseInt(route.params.blogId as string);
  if (blogId !== NaN) {
    // console.log(route.params.blogId);
    axios.get("/blog/" + route.params.blogId).then((res: any) => {
      console.log(res);
      const blog = res.data.data;
      blogInfo.title = blog.title;
      blogInfo.description = blog.description;
      blogInfo.userId = blog.userId;
      blogInfo.content = xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
          res.data.data.content as string,
        ),
      );
      if (store.getters.getUser.userId === blog.userId) {
        ownBlog.value = true;
      }
    });
  }
}
</script>
<style scoped>
.box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 1000px;
  min-height: 700px;
  margin: 10px auto;
  padding: 10px;
}

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
