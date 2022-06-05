<template>
  <div style="width: 15rem; height: 12rem">
    <router-link :to="`/seePost?bno=${props.bno}&pageNo=${props.page.pager.pageNo}&hit=true`" style="text-decoration: none; color: black">
      <div style="margin: 0; padding: 0; overflow: hidden; height: 9rem">
        <img :src="battach" style="width: 15rem" />
      </div>
      <div
        style="
          background-color: lightgray;
          text-align: center;
          height: 3rem;
          width: 15rem;
          position: relative;
          font-family: 'Nanum Pen Script', cursive;
        "
      >
        <p style="margin: 0; padding-top: 0.2rem; font-size: 1.3rem">
          {{ title }}
          <span style="position: absolute; right: 0.5rem; color: white"
            ><i style="margin-right: 0.2rem; color: white" class="fa-solid fa-bone"></i>{{ hitCnt }}</span
          >
        </p>
        <p style="margin: 0; font-size: 0.8rem">{{ writer }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import apiBoard from "@/apis/board";

const props = defineProps(["title", "hitCnt", "writer", "bno", "page"]);

const battach = ref(null);

async function getImg() {
  const blob = await apiBoard.downloadBoardAttach(props.bno);
  if (blob != null) {
    battach.value = URL.createObjectURL(blob);
  }
}
getImg();
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
</style>
