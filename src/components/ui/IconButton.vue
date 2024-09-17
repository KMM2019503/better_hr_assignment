<template>
  <button
    @click="onClick"
    class="group w-full flex items-center justify-center hover:bg-zinc-100 p-[10px] rounded-md"
  >
    <svg-icon
      type="mdi"
      :path="iconPath"
      class="group-hover:text-green-400"
      :size="size"
    ></svg-icon>
  </button>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { computed } from "vue";

// Define props for the component
const props = defineProps({
  iconPath: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "24",
  },
  onClick: {
    type: Function,
    default: () => {},
  },
});
</script>
