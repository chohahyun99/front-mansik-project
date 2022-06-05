<template>
  <div v-if="page != null" style="text-align: center">
    <div style="position: relative">
      <h2 style="display: inline-block; font-family: 'CookieRun-Regular'; margin-top:1.8rem;">앨범 게시판</h2>
      <button @click="createPost" style="position: absolute; right: 10rem; top: 1.5rem; height: 3rem; font-family: 'CookieRun-Regular'">
        글쓰기
      </button>
      <button style="position: absolute; right: 14rem; top: 1.5rem; height: 3rem; font-family: 'CookieRun-Regular'">검색</button>
    </div>
    <hr style="width: 80vw; margin-bottom: 1.5rem" />
    <!-- <div>
      <h4>댕댕 F4</h4>
      <div>
      </div>
    </div> -->
    <div style="">
      <ul style="display: flex; padding: 0; flex-wrap: wrap; width: 68rem; margin: auto">
        <li style="list-style: none; margin: 1rem" v-for="board in page.boards" :key="board.bno">
          <AlbumPost :bno="board.bno" :title="board.btitle" :hitCnt="board.bhitcount" :writer="board.mid" :page="page" />
        </li>
      </ul>
    </div>
    <div>
      <button @click="changePageNo(1)" class="pageBtn">처음</button>
      <button v-if="page.pager.groupNo > 1" @click="changePageNo(page.pager.startPageNo - 1)" class="pageBtn">이전</button>
      <button
        v-for="pageNo in range(page.pager.startPageNo, page.pager.endPageNo)"
        :key="pageNo"
        @click="changePageNo(pageNo)"
        class="pageBtn"
        :style="page.pager.pageNo == pageNo ? 'color: red' : 'color: black'"
      >
        {{ pageNo }}
      </button>
      <button v-if="page.pager.groupNo < page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo + 1)" class="pageBtn">다음</button>
      <button @click="changePageNo(page.pager.totalPageNo)" class="pageBtn">끝</button>
    </div>
  </div>
  <div v-if="page == null">
    <p>화면 조정중</p>
    <img src="@/assets/cuteOkk.jpg" height="200" />
    <button @click="goLogin">로그인하기</button>
  </div>
</template>

<script setup>
import AlbumPost from "./AlbumPost.vue";
import { ref, reactive, watch } from "vue";
import apiBoard from "@/apis/board";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const battach = ref(null);

//반응형 속성 선언
const page = ref(null);

//라우팅 시에 전달된 Query String에서 pageNo 읽기
let pageNo = route.query.pageNo;
if (pageNo === "undefined") {
  pageNo = 1;
}

//Rest API와 통신해서 페이지에 대한 정보(게시물 목록+페이저)를 page 속성에 저장
async function getBoardList(pageNo) {
  const result = await apiBoard.getBoardList(pageNo);
  if (result.result === "success") {
    page.value = result.data;
    //console.log(page.value);
  }
}

getBoardList(pageNo);

function range(start, end) {
  const numbers = [];
  for (var i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
}

function changePageNo(pageNo) {
  router.push(`/list?pageNo=${pageNo}`);
}

watch(route, (newUrl, oldUrl) => {
  if (newUrl.path === "/list") {
    if (newUrl.query.pageNo) {
      getBoardList(newUrl.query.pageNo);
    } else {
      getBoardList(1);
    }
  }
});

function goLogin() {
  router.push("/");
}

function createPost() {
  router.push("/createPost");
}
</script>

<style scoped>
@font-face {
  font-family: "CookieRun-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
.pageBtn {
  border: 0;
  outline: 0;
  background: white;
}
</style>
