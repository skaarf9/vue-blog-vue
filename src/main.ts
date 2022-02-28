/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-02-28 16:05:34
 * @Description: file content
 * @FilePath: \vueblog-vue\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/api/axios";
import "element-plus/theme-chalk/el-message.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

const app = createApp(App).use(store).use(router).use(mavonEditor);
app.mount("#app");
