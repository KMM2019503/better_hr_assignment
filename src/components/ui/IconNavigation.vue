<template>
  <RouterLink
    :to="url"
    class="flex justify-center items-center p-[10px] hover:bg-gray-100 group transition"
    :class="{ 'bg-white': isActive }"
  >
    <svg-icon
      type="mdi"
      :path="iconPath"
      class="text-[24px] group-hover:text-green-400 transition"
      :class="{ 'text-green-400': isActive }"
    ></svg-icon>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
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

const route = useRoute();
const isActive = computed(() => route.path.startsWith(props.url));
</script>
