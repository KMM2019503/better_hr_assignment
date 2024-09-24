<template>
  <div class="flex justify-between items-center pl-5 mt-5">
    <div class="flex justify-start items-center gap-3 w-full">
      <svg-icon
        type="mdi"
        :path="mdiArrowLeft"
        class="text-[18px] text-[#1ED292] hover:text-green-400 transition cursor-pointer"
      ></svg-icon>
      <h1 class="text-[16px] text-[#4A4A4A]">Employee Directory</h1>
      <div
        class="border-2 rounded-md px-2 py-1 flex items-center justify-center gap-2"
      >
        <label for="">
          <svg-icon
            type="mdi"
            :path="mdiMagnify"
            class="text-[18px] text-[#4A4A4A] hover:text-[#1ED292] transition cursor-pointer"
          ></svg-icon>
        </label>
        <input
          v-model="localSearchTerm"
          type="text"
          class="text-[#4A4A4A] rounded-lg block w-full outline-none text-lg"
          placeholder="Search..."
          v-on:focus="notifyInputField"
        />
      </div>
      <button
        class="group cursor-pointer rounded-lg"
        @click="deleteSelectedEmployee"
      >
        <svg-icon
          type="mdi"
          size="24"
          :path="mdiTrashCan"
          class="text-[#4A4A4A] hover:text-[#1ED292] transition"
        ></svg-icon>
      </button>
    </div>

    <div class="flex justify-end items-center w-full gap-1">
      <Button label="Create Employee" />
      <button>
        <svg-icon
          type="mdi"
          :path="mdiDotsVertical"
          class="text-[18px] text-[#4A4A4A] hover:text-[#1ED292] transition cursor-pointer"
        ></svg-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import Button from "@/components/ui/Button.vue";

import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  searchTerm: String,
  deleteSelectedEmployee: Function,
  mdiArrowLeft: String,
  mdiMagnify: String,
  mdiTrashCan: String,
  mdiDotsVertical: String,
});

const emit = defineEmits(["update:searchTerm"]);

const localSearchTerm = ref(props.searchTerm);

watch(localSearchTerm, (newValue) => {
  emit("update:searchTerm", newValue);
});

const notifyInputField = () => {
  toast("You can search name, email, department, location");
};
</script>
