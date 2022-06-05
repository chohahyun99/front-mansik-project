import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/list",
    component: () => import(/* webpackChunkName: "board" */ "../views/List"),
  },
  {
    path: "/createPost",
    component: () => import(/* webpackChunkName: "board" */ "../views/CreatePost.vue"),
  },
  {
    path: "/seePost",
    component: () => import(/* webpackChunkName: "board" */ "../views/SeePost.vue"),
  },
  {
    path: "/updatePost",
    component: () => import(/* webpackChunkName: "board" */ "../views/UpdatePost.vue"),
  },
  {
    path: "/signUp",
    component: () => import(/* webpackChunkName: "board" */ "../views/SignUp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
