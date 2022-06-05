<template>
  <div style="margin: 5rem 0">
    <div style="text-align: center">
      <i class="fa-solid fa-paw" style="font-size: 5em"></i>
      <p style="font-family: 'Blaka', cursive; font-size: 3rem; margin-bottom: 1rem; margin-top: 0">SignUp</p>
      <div
        style="
          display: flex;
          flex-direction: column;
          height: 25rem;
          width: 30rem;
          border: 0.1rem solid black;
          margin: auto;
          border-radius: 0.7rem;
          font-family: 'Indie Flower', cursive;
        "
      >
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>ID</label>
          <input type="text" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Nanum Pen Script', cursive; font-size:1.2rem;" v-model="user.id" />
        </div>
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>Password</label>
          <input type="password" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Nanum Pen Script', cursive; font-size:1.2rem;" v-model="user.password" />
        </div>
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>Name</label>
          <input type="text" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Nanum Pen Script', cursive; font-size:1.2rem;" v-model="user.name" />
        </div>
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>Email</label>
          <input type="email" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Nanum Pen Script', cursive; font-size:1.2rem;" v-model="user.email" />
        </div>
        <button
          style="
            width: 18.5rem;
            height: 5rem;
            margin: 1rem auto 0;
            font-family: 'Indie Flower', cursive;
            font-weight: bold;
            font-size: 2rem;
            padding: 0;
          "
          v-on:click="handleJoin"
        >
          Join
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import auth from "@/apis/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  id: "",
  name: "",
  password: "",
  role: "ROLE_USER",
  email: "",
});

async function handleJoin() {
  const result = await auth.join(user);
  if (result === "success") {
    // alertDialogMessage.value="회원가입 성공";
    router.push("/");
  } else if (result === "duplicated") {
    router.push("/signUp");
    //alertDialogMessage.value="회원가입 실패: 아이디 중복";
  } else if (result === "fail") {
    router.push("/signUp");
    //alertDialogMessage.value="회원가입 실패: 서버측 오류";
  } else {
    router.push("/signUp");
    //alertDialogMessage.value="회원가입 실패: 네트워크 오류";
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Blaka&family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

</style>
