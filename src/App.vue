<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <!-- Side Bar -->

    <Sidebar />

    <!-- Main Content -->
    <div class="bg-[#F5F5F5] w-full max-h-screen overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
