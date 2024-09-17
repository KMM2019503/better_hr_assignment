<template>
  <div class="w-full h-screen flex justify-center items-center flex-col">
    <svg-icon
      type="mdi"
      :path="mdiAlertCircle"
      class="text-red-500"
      :size="70"
    ></svg-icon>
    <div class="text-center">
      <h1 class="text-3xl font-bold">Page Not Found</h1>
      <p class="text-xl font-bold">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAlertCircle } from "@mdi/js";
</script>
