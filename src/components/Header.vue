<template>
  <div style="height: 5rem; background-color: black; color: white; display: flex; position: relative;">
    <div style="margin-left:1rem; line-height: 3rem; padding-top:0.8rem;">
      <i class="fa-solid fa-shield-dog" style="color: white; font-size: 3rem; margin-right:1rem; vertical-align: middle;"></i>
      <span style="font-size:2.5rem; vertical-align: middle; font-family: 'SF_IceLemon';">강아지방위대</span>
    </div>
    <button v-if="$store.state.userId!==''" @click="handleLogout" style="font-family: 'Indie Flower', cursive; height: 3rem; margin-top:0.8rem; position: absolute; right: 1rem;">logout</button>
    <button v-if="$store.state.userId!==''" @click="handleLogout" style="font-family: 'Indie Flower', cursive; height: 3rem; margin-top:0.8rem; position: absolute; right: 5rem;">logout</button>
  </div>
</template>

<script setup>
import auth from "@/apis/auth";
import {useRouter} from "vue-router";

const router = useRouter();

async function handleLogout(){
  await auth.logout();
  router.push("/");
}
</script>

<style scoped>
@font-face {
    font-family: 'SF_IceLemon';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_IceLemon.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@import url('https://fonts.googleapis.com/css2?family=Blaka&family=Indie+Flower&display=swap');
</style>
