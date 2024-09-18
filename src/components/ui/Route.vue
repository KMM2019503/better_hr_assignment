<template>
  <RouterLink
    :to="url"
    class="group transition hover:text-green-400 w-full text-[14px]"
    exact-active-class="text-green-400"
  >
    {{ name }}
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
import { RouterLink } from "vue-router";
</script>
