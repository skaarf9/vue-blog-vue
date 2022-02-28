<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 15:46:28
 * @LastEditTime: 2022-02-28 23:35:19
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
      </div>
      <el-divider></el-divider>
      <div class="description">
        <h4>{{ blogInfo.description }}</h4>
      </div>
      <el-divider></el-divider>
      <div class="content" v-html="blogInfo.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/BlogHeader.vue";
import VueMarkdownEditor, { xss } from "@kangc/v-md-editor";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const blogInfo = reactive({
  title: "",
  description: "",
  content: "",
});
if (route.params.blogId) {
  const blogId = Number.parseInt(route.params.blogId as string);
  if (blogId !== NaN) {
    // console.log(route.params.blogId);
    axios.get("/blog/" + route.params.blogId).then((res: any) => {
      console.log(res);
      const blog = res.data.data;
      blogInfo.title = blog.title;
      blogInfo.description = blog.description;
      blogInfo.content = xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
          res.data.data.content as string,
        ),
      );
    });
  }
}
</script>
<style scoped>
.content {
}
.box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 1000px;
  min-height: 700px;
  margin: 10px auto;
  padding: 10px;
}
</style>
