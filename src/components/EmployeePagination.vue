<template>
  <div class="w-full flex justify-end items-center mr-5 gap-1">
    <p class="text-sm p-2 border rounded-md text-gray-500 mr-5">
      {{ currentPage }}/{{ totalPages }} page
    </p>

    <div class="flex justify-center items-center">
      <button
        class="cursor-pointer group p-2 border rounded-tl-md rounded-bl-md disabled:cursor-not-allowed flex items-center justify-center h-10 w-10"
        :disabled="currentPage <= 1"
        @click="previousPage"
      >
        <svg-icon
          type="mdi"
          size="18"
          :path="mdiChevronLeft"
          class="text-[#1ED292] group-hover:text-green-400 transition group-disabled:text-gray-500"
        ></svg-icon>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="cursor-pointer px-3 py-2 border text-[13px] flex items-center justify-center h-10 w-10"
        :class="{
          'bg-[#1ED292] text-white': currentPage === page,
          'text-gray-300 hover:text-gray-500': currentPage !== page,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        class="cursor-pointer group p-2 border rounded-tr-md rounded-br-md disabled:cursor-not-allowed flex items-center justify-center h-10 w-10"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        <svg-icon
          type="mdi"
          size="18"
          :path="mdiChevronRight"
          class="text-[#1ED292] group-hover:text-green-400 transition group-disabled:text-gray-500"
        ></svg-icon>
      </button>
    </div>

    <div class="flex justify-between items-center ml-5">
      <label for="" class="text-sm font-semibold text-gray-500">Go To</label>
      <input
        v-model.number="localGoToPage"
        type="number"
        min="1"
        :max="totalPages"
        class="w-10 border rounded-md px-2 py-1 ml-2 outline-none text-center"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  goToPage: Number,
  previousPage: Function,
  nextPage: Function,
  changePage: Function,
  mdiChevronLeft: String,
  mdiChevronRight: String,
});

const emit = defineEmits(["update:goToPage"]);

const localGoToPage = ref(props.goToPage);

watch(localGoToPage, (newValue) => {
  emit("update:goToPage", newValue);
});
</script>

<style scoped>
/* remove input number down up arrow */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
