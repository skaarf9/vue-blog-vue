/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-02-28 19:10:34
 * @Description: file content
 * @FilePath: \vueblog-vue\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/api/axios";
import "element-plus";
import "element-plus/theme-chalk/el-message.css"
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import hljs from "highlight.js";

// highlight code

VMdEditor.use(vuepressTheme, {
  hljs,
});

const app = createApp(App).use(store).use(router).use(VMdEditor);
app.mount("#app");
