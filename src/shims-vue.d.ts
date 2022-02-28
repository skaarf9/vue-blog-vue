/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-03-01 00:00:49
 * @Description: file content
 * @FilePath: \vueblog-vue\src\shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "@kangc/v-md-editor";
declare module "@kangc/v-md-editor/lib/theme/github.js";
declare module "highlight.js";
