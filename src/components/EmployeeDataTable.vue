<template>
  <div class="card px-4 py-3">
    <DataTable
      class="mx-2 overflow-x-visible"
      :selection="selectedEmployee"
      @update:selection="updateSelectedEmployee"
      dataKey="employeeCode"
      :value="paginatedData"
      :pt="{ headerrow: { class: 'bg-white' } }"
    >
      <Column
        selectionMode="multiple"
        headerStyle="width: 3rem"
        frozen
        :pt="{ headercell: { class: 'bg-white' } }"
      ></Column>

      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="{ minWidth: col.minWidth }"
        :class="col.class || ''"
        :frozen="col.frozen || false"
        :pt="{ headercell: { class: 'bg-white' } }"
      >
        <!-- Custom template for Profile column -->
        <template v-if="col.field === 'employee'" #body="slotProps">
          <div class="w-full flex gap-2 items-center">
            <div>
              <img
                src="/src/assets/images/profile.png"
                :alt="slotProps.data.employee"
                class="size-[22px] rounded-full"
              />
            </div>
            <p>{{ slotProps.data.employee }}</p>
          </div>
        </template>
        <!-- Custom template for department column -->
        <template v-if="col.field === 'department'" #body="slotProps">
          <div class="flex justify-between items-center gap-2 w-full">
            <span v-if="currentlyEditing !== slotProps.data.employeeCode">
              {{ slotProps.data.department }}
            </span>
            <select
              v-else
              v-model="slotProps.data.department"
              @change="updateDepartment(slotProps.data)"
              class="border-0 rounded outline-none"
            >
              <option
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.department"
                :selected="dept.department === slotProps.data.department"
                class="bg-white text-gray-800 w-[200px]"
              >
                {{ dept.department }}
              </option>
            </select>

            <!-- Edit button -->
            <button
              v-if="currentlyEditing !== slotProps.data.employeeCode"
              class="cursor-pointer"
              @click="startEditing(slotProps.data)"
            >
              <svg-icon
                type="mdi"
                size="18"
                :path="mdiPencil"
                class="text-green-300 hover:text-green-400 transition"
              />
            </button>

            <!-- Close button -->
            <button v-else class="cursor-pointer" @click="closeSelect">
              <svg-icon
                type="mdi"
                size="18"
                :path="mdiClose"
                class="text-green-300 hover:text-green-400 transition"
              />
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import SvgIcon from "@jamescoyle/vue-icon";

const props = defineProps({
  selectedEmployee: Array,
  paginatedData: Array,
  columns: Array,
  currentlyEditing: Number,
  updateDepartment: Function,
  startEditing: Function,
  closeSelect: Function,
  mdiPencil: String,
  mdiClose: String,
  departments: Array,
});

const emit = defineEmits(["update:selection"]);

const updateSelectedEmployee = (newSelection) => {
  emit("update:selection", newSelection);
};
</script>
