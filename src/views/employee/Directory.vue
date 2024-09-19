<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center gap-3 w-full">
        <svg-icon
          type="mdi"
          :path="mdiArrowLeft"
          class="text-[18px] text-green-300 hover:text-green-400 transition cursor-pointer"
          :class="{ 'text-green-400': isActive }"
        ></svg-icon>
        <h1 class="text-[16px]">Employee Directory</h1>
        <div
          class="border-2 rounded-md px-2 py-1 flex items-center justify-center gap-2"
        >
          <label for="">
            <svg-icon
              type="mdi"
              :path="mdiMagnify"
              class="text-[18px] text-green-300 hover:text-green-400 transition cursor-pointer"
              :class="{ 'text-green-400': isActive }"
            ></svg-icon>
          </label>
          <input
            v-model="searchTerm"
            type="text"
            class="text-gray-900 rounded-lg block w-full outline-none text-lg"
            placeholder="Search..."
          />
        </div>
      </div>

      <div class="flex justify-end items-center w-full gap-1">
        <!-- Employee Create Button  -->
        <Button label="Create Employee" />

        <!-- 3dot icon button -->
        <button>
          <svg-icon
            type="mdi"
            :path="mdiDotsVertical"
            class="text-[18px] text-green-300 hover:text-green-400 transition cursor-pointer"
            :class="{ 'text-green-400': isActive }"
          ></svg-icon>
        </button>
      </div>
    </div>
    <div class="card px-4 py-3">
      <!-- Data Table -->
      <DataTable
        class="mx-2 overflow-x-visible"
        v-model:selection="selectedProduct"
        dataKey="employeeCode"
        :value="filteredData"
        paginator
        :rows="11"
        :rowsPerPageOptions="[11]"
        paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink JumpToPageInput"
        currentPageReportTemplate="{currentPage} / {totalPages} pages"
        :pt="{ headerrow: { class: 'bg-white' } }"
      >
        <Column
          selectionMode="multiple"
          headerStyle="width: 3rem"
          frozen
          :pt="{ headercell: { class: 'bg-white' } }"
        ></Column>

        <!-- Loop through columns array -->
        <Column
          v-for="col in columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :style="{ minWidth: col.minWidth }"
          :class="col.class || ''"
          :frozen="col.frozen || false"
          :pt="{ headercell: { class: 'bg-white' } }"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

import SvgIcon from "@jamescoyle/vue-icon";

import { mdiArrowLeft, mdiDotsVertical, mdiMagnify } from "@mdi/js";

import Button from "@/components/ui/Button.vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import employees from "@/constant/employees";

const data = ref([...employees]);
const selectedProduct = ref();
const searchTerm = ref("");

const columns = ref([
  {
    field: "employee",
    header: "Employee Name",
    minWidth: "200px",
    frozen: true,
    class: "shadow-2xl",
  },
  { field: "location", header: "Location", minWidth: "200px" },
  { field: "email", header: "Email", minWidth: "200px" },
  { field: "phone", header: "Phone", minWidth: "200px" },
  { field: "department", header: "Department", minWidth: "100px" },
  { field: "employeeCode", header: "#Code", minWidth: "100px" },
  { field: "position", header: "Position", minWidth: "200px" },
  { field: "customTags", header: "Custom Tags", minWidth: "200px" },
  { field: "NRC", header: "NRC", minWidth: "300px" },
  { field: "manager", header: "Manager", minWidth: "200px" },
  { field: "managerPosition", header: "Manager Position", minWidth: "200px" },
  { field: "joinnedDate", header: "Joinned Date", minWidth: "200px" },
  { field: "terminateDate", header: "Terminate Date", minWidth: "200px" },
]);

const filteredData = computed(() => {
  if (!searchTerm.value) return data.value;
  return data.value.filter((employee) => {
    const search = searchTerm.value.toLowerCase();
    return (
      employee.employee.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.location.toLowerCase().includes(search)
    );
  });
});

watch(
  selectedProduct,
  (newVal) => {
    console.log("Selected Product object changed:", newVal);
  },
  { deep: true }
);

const metaKey = ref(true);
</script>
