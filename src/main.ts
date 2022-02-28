/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-03-01 01:10:58
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
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import "@/router/permission"
// highlightjs 核心代码
// import hljs from 'highlight.js/lib/core';
// 按需引入语言包
// import json from 'highlight.js/lib/languages/json';

import hljs from 'highlight.js';
// highlight code

// hljs.registerLanguage('json', json);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App).use(store).use(router).use(VMdEditor);
app.mount("#app");
