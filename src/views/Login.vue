<template>
  <div style="margin: 5rem 0;">
    <div style="text-align: center">
      <i class="fa-solid fa-paw" style="font-size: 5em;"></i>
      <p style="font-family: 'Blaka', cursive; font-size: 3rem; margin-bottom:1rem; margin-top:0;">Login</p>
      <div
        style="display: flex; flex-direction: column; height: 20rem; width: 30rem; border: 0.1rem solid black; margin: auto; border-radius: 0.7rem; font-family: 'Indie Flower', cursive;"
      >
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>ID</label>
          <input type="text" style="width: 18rem; height: 1.5rem; margin: auto; font-family: 'Indie Flower', cursive;" v-model="user.id" />
        </div>
        <div style="display: flex; flex-direction: column; width: 20rem; margin: 1rem auto 0">
          <label>Password</label>
          <input type="password" style="width: 18rem; height: 1.5rem; margin: auto" v-model="user.password"/>
          <button class="login_btn" style="width: 8rem; border: 0; outline: 0; background-color: white; cursor: pointer; font-family: 'Indie Flower', cursive;">forgot password?</button>
          <button @click="goJoin" class="login_btn" style="width: 4.8rem; border: 0; outline: 0; background-color: white; cursor: pointer; font-family: 'Indie Flower', cursive; margin-top:1rem;">join us?</button>
        </div>
        <button style="width: 18.5rem; height: 5rem; margin: 1rem auto 0; font-family: 'Indie Flower', cursive; font-weight:bold; font-size: 2rem; padding: 0;" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import auth from "@/apis/auth";
import {useRouter} from "vue-router";

const router = useRouter();

const user = reactive({
  id: "user",
  password:"12345",
})

async function handleLogin(){
  const result = await auth.login(user);
  if(result === "success"){
    router.push("/list");
  } 
}

function goJoin(){
  router.push("/signUp");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Blaka&family=Indie+Flower&display=swap');
.login_btn:hover{
  color: coral;
}
</style>
