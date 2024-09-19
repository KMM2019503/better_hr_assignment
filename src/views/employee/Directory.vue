<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center gap-3 w-full">
        <svg-icon
          type="mdi"
          :path="mdiArrowLeft"
          class="text-[18px] text-green-300 hover:text-green-400 transition cursor-pointer"
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
            ></svg-icon>
          </label>
          <input
            v-model="searchTerm"
            type="text"
            class="text-gray-900 rounded-lg block w-full outline-none text-lg"
            placeholder="Search..."
          />
        </div>
        <button
          class="group cursor-pointer p-2 border rounded-lg"
          @click="deleteSelectedEmployee"
        >
          <svg-icon
            type="mdi"
            size="18"
            :path="mdiTrashCan"
            class="text-gray-700 disabled:text-gray-400 group-hover:text-green-400 transition"
          ></svg-icon>
        </button>
      </div>

      <div class="flex justify-end items-center w-full gap-1">
        <Button label="Create Employee" />
        <button>
          <svg-icon
            type="mdi"
            :path="mdiDotsVertical"
            class="text-[18px] text-green-300 hover:text-green-400 transition cursor-pointer"
          ></svg-icon>
        </button>
      </div>
    </div>
    <div class="card px-4 py-3">
      <div class="card px-4 py-3">
        <DataTable
          class="mx-2 overflow-x-visible"
          v-model:selection="selectedProduct"
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
    </div>

    <div class="w-full flex justify-end items-center mr-5 gap-1">
      <p class="text-sm p-2 border rounded-lg text-gray-500">
        {{ currentPage }}/{{ totalPages }} page
      </p>

      <button
        class="cursor-pointer p-2 border rounded-lg"
        :disabled="currentPage <= 1"
        @click="previousPage"
      >
        <svg-icon
          type="mdi"
          size="18"
          :path="mdiChevronLeft"
          class="text-green-300 hover:text-green-400 transition"
        ></svg-icon>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="cursor-pointer px-3 py-2 border rounded-lg text-[18px]"
        :class="{
          'bg-green-300 text-white': currentPage === page,
          'text-gray-300 hover:text-gray-500': currentPage !== page,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        class="cursor-pointer p-2 border rounded-lg"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        <svg-icon
          type="mdi"
          size="18"
          :path="mdiChevronRight"
          class="text-green-300 hover:text-green-400 transition"
        ></svg-icon>
      </button>

      <div class="flex justify-between items-center ml-5">
        <label for="" class="text-sm font-semibold text-gray-500">Go To</label>
        <input
          v-model.number="goToPage"
          type="number"
          min="1"
          :max="totalPages"
          class="w-10 border rounded-lg px-2 py-1 ml-2 outline-none text-center"
          @change="goToPageHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiArrowLeft,
  mdiDotsVertical,
  mdiMagnify,
  mdiChevronLeft,
  mdiChevronRight,
  mdiTrashCan,
  mdiPencil,
  mdiClose,
} from "@mdi/js";
import Button from "@/components/ui/Button.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { employees, departments } from "@/constant/employees";

const data = ref([...employees]);
const selectedProduct = ref();
const searchTerm = ref("");
const currentPage = ref(1);
const rowsPerPage = 11;
const goToPage = ref(1);
const currentlyEditing = ref(null);

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
  { field: "department", header: "Department", minWidth: "200px" },
  { field: "employeeCode", header: "#Code", minWidth: "100px" },
  { field: "position", header: "Position", minWidth: "200px" },
  { field: "customTags", header: "Custom Tags", minWidth: "200px" },
  { field: "NRC", header: "NRC", minWidth: "300px" },
  { field: "manager", header: "Manager", minWidth: "200px" },
  { field: "managerPosition", header: "Manager Position", minWidth: "200px" },
  { field: "joinnedDate", header: "Joinned Date", minWidth: "200px" },
  { field: "terminateDate", header: "Terminate Date", minWidth: "200px" },
]);

// Handle row editing
const startEditing = (employee) => {
  currentlyEditing.value = employee.employeeCode;
};

const closeSelect = () => {
  if (currentlyEditing.value) {
    currentlyEditing.value = null;
  }
};
// Handle department update
const updateDepartment = (employee) => {
  if (departments.some((dept) => dept.department === employee.department)) {
    currentlyEditing.value = null;
  } else {
    alert("Invalid department");
  }
};
// Search and pagination logic
const filteredData = computed(() => {
  if (!searchTerm.value) return data.value;
  return data.value.filter((employee) => {
    const search = searchTerm.value.toLowerCase();
    return (
      employee.employee.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.location.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    );
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / rowsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredData.value.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToPageHandler = () => {
  if (goToPage.value >= 1 && goToPage.value <= totalPages.value) {
    currentPage.value = goToPage.value;
  }
};

// Handle delete function
const deleteSelectedEmployee = () => {
  if (selectedProduct.value && selectedProduct.value.length) {
    data.value = data.value.filter(
      (employee) => !selectedProduct.value.includes(employee)
    );
    selectedProduct.value = [];
  }
};
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
