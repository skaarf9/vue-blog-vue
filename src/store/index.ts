/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 19:33:23
 * @LastEditTime: 2022-02-27 21:08:48
 * @Description: file content
 * @FilePath: \vueblog-vue\src\store\index.ts
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    userInfo: JSON.parse(sessionStorage.getItem("userInfo") as string),
  },
  getters: {
    getUser: (state) => {
      return state.userInfo;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      //sessionStorage无法存储对象,需要序列化
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO: (state) => {
      state.token = "";
      state.userInfo = new Object();
      localStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
    },
  },
  actions: {},
  modules: {},
});
