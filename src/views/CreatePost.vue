<template>
  <form v-on:submit.prevent="handleAdd">
    <div style="margin: 5rem 0">
      <div style="text-align: center">
        <i class="fa-solid fa-paw" style="font-size: 5em"></i>
        <p style="font-family: 'Blaka', cursive; font-size: 3rem; margin-bottom: 1rem; margin-top: 0">Create</p>
        <div
          style="
            display: flex;
            flex-direction: column;
            height: 35rem;
            width: 40rem;
            border: 0.1rem solid black;
            margin: auto;
            border-radius: 0.7rem;
            font-family: 'Indie Flower', cursive;
          "
        >
          <div style="display: flex; width: 20rem; margin: 5rem auto 0">
            <label style="margin-right:3.34rem;">Title</label>
            <input type="text" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Indie Flower', cursive" v-model="board.btitle" />
          </div>
          <div style="display: flex; width: 20rem; margin: 1rem auto 0">
            <label style="margin-right:2rem;">Content</label>
            <!-- <input type="text" style="width: 18rem; height: 1.5rem; margin: auto" v-model="board.bcontent" /> -->
            <textarea style="width: 18rem; height: 7em; margin: auto; overflow-y:scroll; resize: none;" v-model="board.bcontent" ></textarea>
          </div>
          <div style="display: flex; width: 20rem; margin: 1rem auto 0">
            <label style="margin-right:3.13rem;">Post</label>
            <input type="file" style="width: 18rem; height: 2rem; margin: auto" ref="battach" />
          </div>
          <button type="submit" style="width: 18.5rem; height: 5rem; margin: 1rem auto 0; font-family: 'Indie Flower', cursive; font-weight:bold; font-size: 2rem; padding: 0;">Posting</button>
          <button type="button" v-on:click="handleCancel" style="width: 18.5rem; height: 5rem; margin: 1rem auto 0; font-family: 'Indie Flower', cursive; font-weight:bold; font-size: 2rem; padding: 0;">Cancle</button>
        
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import apiBoard from "@/apis/board";

const router = useRouter();

const board = reactive({
  btitle: "",
  bcontent: "",
});

const battach = ref(null);

async function handleAdd() {
  const multipartFormData = new FormData();
  multipartFormData.append("btitle", board.btitle);
  multipartFormData.append("bcontent", board.bcontent);
  multipartFormData.append("mid", "user");
  if (battach.value.files.length != 0) {
    multipartFormData.append("battach", battach.value.files[0]);
  }
  await apiBoard.createBoard(multipartFormData);
  router.push("/list");
}

function handleCancel() {
  router.push("/list");
}
</script>

<style scoped></style>
