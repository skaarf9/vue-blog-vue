/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-26 20:10:22
 * @LastEditTime: 2022-02-26 22:01:01
 * @Description: file content
 * @FilePath: \vueblog-vue\src\api\axios.ts
 */
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

axios.defaults.baseURL = "http://localhost:8081/";

//前置拦截
axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log(response.headers);
    console.log("----------");
    console.log(res);
    console.log("----------");
    if (res.code === 200) {
      return response;
    } else {
      ElMessage({
        showClose: true,
        message: "密码错误",
        type: "error",
      });
      return Promise.reject(response.data.msg);
    }
  },
  (error) => {
    if (error.response.data) {
      error.message = error.response.data.msg;
    }
    if (error.response.status === 401) {
      ElMessage({
        showClose: true,
        message: "权限不足",
        type: "error",
      });
      store.commit("REMOVE_INFO");
      router.push("/login");
    } else {
      ElMessage({
        showClose: true,
        message: error.message,
        type: "error",
      });
    }
    return Promise.reject(error.message);
  }
);
