<script setup>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";

import Sidebar from "./components/Sidebar.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<template>
  <div class="relative flex">
    <!-- Side Bar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="bg-[#F5F5F5] w-full max-h-screen overflow-hidden relative">
      <LoadingSpinner v-if="isLoading" />
      <RouterView v-else />
    </div>
  </div>
</template>
