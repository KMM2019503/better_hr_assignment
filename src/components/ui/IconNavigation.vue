<template>
  <RouterLink
    :to="url"
    class="flex justify-center items-center p-[10px] hover:bg-gray-100 group"
    exact-active-class="bg-white"
  >
    <svg-icon
      type="mdi"
      :path="iconPath"
      class="text-[24px] group-hover:text-green-400"
      :class="{ 'text-green-400': $route.path === url }"
    ></svg-icon>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  iconPath: {
    type: String,
    required: true,
  },
});
</script>
