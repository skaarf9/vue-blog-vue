<!--
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 15:44:26
 * @LastEditTime: 2022-02-28 16:01:08
 * @Description: file content
 * @FilePath: \vueblog-vue\src\views\UserBlogs.vue
-->
<!-- UserBlogs -->
<template>
  <div>
    <blogHeader></blogHeader>
    <div class="blogBody">
      <el-timeline>
        <el-timeline-item
          v-for="(blog, index) in blogsInfo"
          :key="index"
          type="primary"
          hollow="true"
          :timestamp="blog.created"
        >
          <el-card shadow="hover">
            <router-link
              :to="{ name: 'blogDetail', params: { blogId: blog.id } }"
              ><h4>{{ blog.description }}</h4></router-link
            >
            {{ blog.content }}
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div>
      <el-pagination
        class="footPage"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line
import blogHeader from "@/components/BlogHeader.vue";
import { ref } from "@vue/reactivity";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
type blog = {
  id: number;
  userId: number;
  status: number;
  title: string;
  description: string;
  content: string;
  created: string;
};

const total = ref(0);
const currentPage = ref(1);
const disabled = ref(false);
const pageSize = ref(5);
const background = ref(true);
const blogsInfo = ref<Array<blog>>([]);

// eslint-disable-next-line no-unused-vars
const page = (currentPage: number) => {
  axios.get("/blogs?currentPage=" + currentPage).then((res) => {
    total.value = res.data.data.total;
    pageSize.value = res.data.data.size;
    blogsInfo.value = res.data.data.records;
    console.log(blogsInfo.value);
  });
};
page(1);
</script>
<style scoped>
.blogBody .el-timeline {
  margin: 20px auto;
  max-width: 900px;
}

.footPage {
  justify-content: center;
}
</style>
