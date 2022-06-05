<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<script setup>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
</script>
