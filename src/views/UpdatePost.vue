<template>
  <form v-if="board" v-on:submit.prevent="handleUpdate">
    <div style="margin: 5rem 0">
      <div style="text-align: center">
        <i class="fa-solid fa-paw" style="font-size: 5em"></i>
        <p style="font-family: 'Blaka', cursive; font-size: 3rem; margin-bottom: 1rem; margin-top: 0">Update</p>
        <div
          style="
            display: flex;
            flex-direction: column;
            height: 34rem;
            width: 45rem;
            border: 0.1rem solid black;
            margin: auto;
            border-radius: 0.7rem;
            font-family: 'Indie Flower', cursive;
            position: relative;
          "
        >
          <div style="display: flex; width: 20rem; margin: 3.5rem 0 0 0; position: absolute; left:5rem;">
            <label style="margin-right: 3.34rem">Title</label>
            <input type="text" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Indie Flower', cursive" v-model="board.btitle" />
          </div>
          <div style="display: flex; width: 20rem; margin: 1rem 0 0 0; position: absolute;  top: 7rem; left:5rem;">
            <label style="margin-right: 2rem">Content</label>
            <!-- <input type="text" style="width: 18rem; height: 1.5rem; margin: auto" v-model="board.bcontent" /> -->
            <textarea style="width: 18rem; height: 7em; margin: auto; overflow-y: scroll; resize: none" v-model="board.bcontent"></textarea>
          </div>
          <div style="display: flex; width: 20rem; margin: 1rem 0 0 0; position: absolute; top: 16rem; left:5rem;">
            <label style="margin-right: 3.13rem">Post</label>
            <input type="file" ref="newBattach" @change="previewImg" style="width: 18rem; height: 2rem; margin: auto" />
          </div>
          <div style="position: absolute; right: 5rem; top: 3.5rem; overflow: hidden; height: 15rem;">
            <img :src="battach" width="200" />
          </div>
          <button
            type="submit"
            style="
              width: 18.5rem;
              height: 5rem;
              margin: 1rem auto 0;
              font-family: 'Indie Flower', cursive;
              font-weight: bold;
              font-size: 2rem;
              padding: 0;
              position: absolute;
  bottom: 8rem;
  left:14rem;
            "
          >
            Update
          </button>
          <button
            type="button"
            v-on:click="handleCancel"
            style="
              width: 18.5rem;
              height: 5rem;
              margin: 1rem auto 0;
              font-family: 'Indie Flower', cursive;
              font-weight: bold;
              font-size: 2rem;
              padding: 0;
               position: absolute;
               bottom:2rem;
               left:14rem;
            "
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import apiBoard from "@/apis/board";

const route = useRoute();
const router = useRouter();
const board = ref(null);
const bno = route.query.bno;
const pageNo = route.query.pageNo;
const newBattach = ref(null);
const battach = ref(null);

async function getBoard() {
  const dbBoard = await apiBoard.readBoard(bno, false);
  board.value = dbBoard;

  const blob = await apiBoard.downloadBoardAttach(bno);
  if (blob != null) {
    battach.value = URL.createObjectURL(blob);
  }
}

getBoard();

async function handleUpdate() {
  const multipartFormData = new FormData();
  multipartFormData.append("btitle", board.value.btitle);
  multipartFormData.append("bcontent", board.value.bcontent);
  multipartFormData.append("bno", bno);
  if (newBattach.value.files.length != 0) {
    multipartFormData.append("battach", newBattach.value.files[0]);
  }
  await apiBoard.updateBoard(multipartFormData);
  router.push(`/seePost?bno=${bno}&pageNo=${pageNo}&hit=false`);
}

function handleCancel() {
  router.push(`/seePost?bno=${bno}&pageNo=${pageNo}&hit=false`);
}

function previewImg() {
  if (newBattach.value.files.length != 0) {
    battach.value = URL.createObjectURL(newBattach.value.files[0]);
  } else {
    battach.value = null;
  }
}
</script>

<style scoped></style>
