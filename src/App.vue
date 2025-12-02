<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<style>
/* Los estilos globales están en styles.css */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
