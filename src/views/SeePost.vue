<template>
  <div v-if="board != null">
    <div style="position: relative">
      <h2 style="margin-left:12rem; margin-top:1.8rem; display: inline-block; font-family: 'CookieRun-Regular'">Title. {{ board.btitle }}</h2>
      <span style="position: absolute; right: 12rem; top: 4rem; font-family: 'CookieRun-Regular'; font-size: 0.8rem;">writer: {{ board.mid }} | date : {{ new Date(board.bdate).toLocaleDateString() }} | views : {{ board.bhitcount }}</span>
    </div>
    <hr style="width: 80vw; margin-bottom: 1.5rem" />
    <div style="margin-left:12rem; margin-top:1.8rem; font-family: 'Nanum Pen Script', cursive; width:75vw;">
      <div style="display: flex; justify-content: space-between;">
        <p style="display: inline-block;">bno: {{ board.bno }}</p>
        <button @click="downloadBattach" style=" font-family: 'Nanum Pen Script', cursive; height:2rem; margin: auto 0;"><i class="fa-solid fa-paperclip" style="margin-right: 0.3rem;"></i>첨부파일({{board.battachoname != null ? '1' : '0'}})</button>
      </div>
      <div style="display: flex; position: relative;">
        <div style="position: relative;">
          <span style="position: absolute; top: 1rem;">bcontent</span>
          <p style="margin-left: 5rem; display: inline-block; background-color: lightgray; height: 20rem; width: 50vw; padding: 1rem; overflow-y:scroll;">{{ board.bcontent }}</p>
        </div>
        <div v-if="board.battachoname != null">
          <img :src="battach" width="300" style="margin-left : 1rem; margin-top:1rem;" />
        </div>
      </div>
    </div>
    <hr style="width: 80vw; margin-bottom: 1.5rem; margin-top: 2rem;" />
    <div style="text-align: center">
      <button style="font-family: 'Indie Flower', cursive; margin-right:1rem;" @click="goList">list</button>
      <button style="font-family: 'Indie Flower', cursive; margin-right:1rem;" @click="goUpdate">update</button>
      <button style="font-family: 'Indie Flower', cursive; margin-right:1rem;" @click="handleRemove">delete</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import apiBoard from "@/apis/board";
import { ref } from "vue";

//npm install js-file-download
import fileDownload from "js-file-download";

const route = useRoute();
const router = useRouter();

const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;
const board = ref(null);
const battach = ref(null);

async function getBoard() {
  //비동기
  apiBoard.readBoard(bno, hit).then((data) => {
    board.value = data;
  });

  //동기
  const blob = await apiBoard.downloadBoardAttach(bno);
  if (blob != null) {
    battach.value = URL.createObjectURL(blob);
  }
  console.log(battach);
}

getBoard();

async function downloadBattach() {
  const blob = await apiBoard.downloadBoardAttach(bno);
  if (blob != null) {
    fileDownload(blob, board.value.battachoname);
  }
}

async function handleRemove() {
  const result = await apiBoard.deleteBoard(bno);
  if (result === "success") {
    router.push(`/list?pageNo=${pageNo}`);
  }
}

function goList() {
  router.push(`/list?pageNo=${pageNo}`);
}
function goUpdate() {
  router.push(`/updatePost?bno=${route.query.bno}&pageNo=${route.query.pageNo}`);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Blaka&family=Indie+Flower&display=swap");
@font-face {
  font-family: "CookieRun-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
</style>
