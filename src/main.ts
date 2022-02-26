/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-02-26 21:36:57
 * @Description: file content
 * @FilePath: \vueblog-vue\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/api/axios";
import "element-plus/theme-chalk/el-message.css";

const app = createApp(App).use(store).use(router);
app.mount("#app");
