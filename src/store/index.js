import { createStore } from "vuex";
import counter from "./counter";
import axiosConfig from "@/apis/axiosConfig";

export default createStore({
  state: {
    userId: "", //mid
    authToken: "", //AccessToken
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },

    getAuthToken(state) {
      return state.authToken;
    },
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    setAuthToken(state, payload) {
      state.authToken = payload;
    },
  },
  actions: {
    //리프레쉬 할때 실행
    loadAuth(context, payload) {
      // A || B : A가 값이 있다면 A, 없다면 B
      context.commit("setUserId", sessionStorage.getItem("userId") || "");
      context.commit("setAuthToken", sessionStorage.getItem("authToken") || "");
      if (context.state.authToken !== "") {
        axiosConfig.addAuthHeader(context.state.authToken);
      }
    },

    //로그인이 성공했을 때 실행
    //payload:{userId:xxx, authToken:yyyy}
    saveAuth(context, payload) {
      context.commit("setUserId", payload.userId);
      context.commit("setAuthToken", payload.authToken);
      //sessionStorage내장된 객체
      sessionStorage.setItem("userId", payload.userId);
      sessionStorage.setItem("authToken", payload.authToken);
      //앞으로 모든 요청시에 인증토큰 헤더에 실어서 보냄
      axiosConfig.addAuthHeader(payload.authToken);
    },

    //로그아웃할때 실행
    deleteAuth(context, payload) {
      context.commit("setUserId", "");
      context.commit("setAuthToken", "");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("authToken");
      axiosConfig.removeAuthHeader();
    },
  },
  modules: {
    counter,
  },
});
