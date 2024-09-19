<template>
  <button
    class="bg-[#1ED292] border px-2 py-1 rounded-md text-white hover:bg-green-400 h-[40px] w-40"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
});
</script>
