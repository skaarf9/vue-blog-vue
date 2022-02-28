/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-03-01 00:54:07
 * @LastEditTime: 2022-03-01 01:29:17
 * @Description: file content
 * @FilePath: \vueblog-vue\src\router\permission.ts
 */
import router from "@/router";

router.beforeEach((to, form, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }else {
    next()
  }
});
