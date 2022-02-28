/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 01:00:21
 * @LastEditTime: 2022-03-01 00:56:09
 * @Description: file content
 * @FilePath: \vueblog-vue\src\router\index.ts
 */
import { createRouter, createWebHistory } from "vue-router";
import userLogin from "@/views/UserLogin.vue";
import userBlogs from "@/views/UserBlogs.vue";
import blogEdit from "@/views/BlogEdit.vue";
import blogDetail from "@/views/BlogDetail.vue";

const routes = [
  {
    path: "/",
    name: "index",
    redirect: { name: "blogs" },
  },
  {
    path: "/login",
    name: "login",
    component: userLogin,
  },
  {
    path: "/blogs",
    name: "blogs",
    component: userBlogs,
  },
  {
    path: "/blog/:blogId",
    name: "blogDetail",
    component: blogDetail,
  },
  {
    path: "/blog/:blogId/edit",
    name: "blogEditWithId",
    component: blogEdit,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "/blog/add",
    name: "blogEdit",
    component: blogEdit,
    meta: {
      requireAuth: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
